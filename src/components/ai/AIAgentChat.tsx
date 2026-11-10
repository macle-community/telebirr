import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Input, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

import aiAgentAvatar from '../../assets/images/ai_agent_avatar.png'
import MarkdownView from '../common/MarkdownView'
import AirtimeCard from '../../packageAirtime/skills/buyAirtime/components/airtime-card'
import PackageCard from '../../packageAirtime/skills/buyAirtime/components/package-card'
import OrderReceiptCard from '../../packageAirtime/skills/buyAirtime/components/order-receipt-card'
import { AirtimeOrder, PaymentResult, AirtimePackage } from '../../packageAirtime/skills/buyAirtime/types'
import { createAirtimeOrder } from '../../packageAirtime/skills/buyAirtime/apis/createAirtimeOrder'
import { payAirtimeOrder } from '../../packageAirtime/skills/buyAirtime/apis/payAirtimeOrder'

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  isVoice?: boolean
  voiceDuration?: number
  cardType?: 'airtime' | 'package' | 'receipt'
  cardData?: any
  sources?: string[]
  toolsCalled?: string[]
  modelUsed?: string
  clientHandoff?: any
  audioBase64?: string
  language?: string
}

export interface AIAgentChatProps {
  onClose?: () => void
  isModal?: boolean
}

// Quick suggestions for one-tap agent queries
const QUICK_SUGGESTIONS = [
  { label: '⚡ Order 100 ETB Airtime', query: 'Create an order to recharge 100 ETB airtime for 0905410217' },
  { label: '📱 Airtime Options', query: 'I want to recharge airtime' },
  { label: '🌐 Internet Packages', query: 'Show me available data packages' },
  { label: '💰 Check My Balance', query: 'What is my current balance?' },
  { label: '💸 Send Money', query: 'How do I send money?' },
  { label: '🧾 Pay Electric Bill', query: 'How can I pay my EEU electricity bill?' }
]

// Fallback voice recognition queries when simulated
const SIMULATED_VOICE_QUERIES = [
  'I want to recharge 100 ETB airtime to 0905410217',
  'የ 100 ብር ካርድ መሙላት እፈልጋለሁ',
  'Show me monthly internet data packages',
  'What is my current telebirr balance?',
  'ቀሪ ሂሳቤን ንገረኝ',
  'How do I transfer money to another telebirr user?'
]

export default function AIAgentChat({ onClose, isModal = true }: AIAgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Selam Natnael! 👋 I am your Telebirr AI assistant. I can help you recharge airtime with up to 35% bonus, buy data bundles, check your balance, or make instant payments. What would you like to do today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [isVoiceInputMode, setIsVoiceInputMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [isVoiceReplyEnabled, setIsVoiceReplyEnabled] = useState(true)
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null)
  const [walletBalance, setWalletBalance] = useState(855.08)
  const [threadId] = useState(() => 'telebirr_user_' + Math.random().toString(36).substring(2, 9))

  const scrollViewRef = useRef<any>(null)
  const recordingTimerRef = useRef<any>(null)
  const speechRecognitionRef = useRef<any>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<any>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const isSendingRef = useRef(false)

  // Auto scroll to bottom when messages change
  const scrollToBottom = () => {
    setTimeout(() => {
      // In Taro / Web, scroll container to bottom
      const el = document.getElementById('ai-chat-scroll-anchor')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      if (typeof document !== 'undefined') {
        const scrollViews = document.querySelectorAll('.overflow-y-auto, taro-scroll-view-core, [scroll-y="true"]')
        scrollViews.forEach(sv => {
          sv.scrollTop = sv.scrollHeight
        })
      }
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  // Stop any ongoing speech playback on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current = null
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [])

  // Web Speech API fallback
  const speakFallback = (text: string, msgId: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[*_#`~👋📱🌐💰💸🧾✓⚡]/g, '').trim()
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.02
    utterance.pitch = 1.05
    utterance.onstart = () => setSpeakingMessageId(msgId)
    utterance.onend = () => setSpeakingMessageId(null)
    utterance.onerror = () => setSpeakingMessageId(null)
    window.speechSynthesis.speak(utterance)
  }

  // Play audio source with neural TTS or base64 MP3
  const playAudioSrc = (src: string, msgId: string, fallbackText?: string) => {
    if (typeof window === 'undefined') return

    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }

    if (speakingMessageId === msgId) {
      setSpeakingMessageId(null)
      return
    }

    try {
      const audio = new Audio(src)
      currentAudioRef.current = audio
      setSpeakingMessageId(msgId)

      audio.onended = () => {
        setSpeakingMessageId(null)
        currentAudioRef.current = null
      }
      audio.onerror = () => {
        setSpeakingMessageId(null)
        currentAudioRef.current = null
        if (fallbackText) speakFallback(fallbackText, msgId)
      }
      audio.play().catch(err => {
        console.warn('Audio play error, falling back to speech synthesis:', err)
        if (fallbackText) speakFallback(fallbackText, msgId)
      })
    } catch {
      if (fallbackText) speakFallback(fallbackText, msgId)
    }
  }

  // Neural Voice Output (supports English & Amharic)
  const speakText = (text: string, msgId: string, audioBase64?: string) => {
    if (speakingMessageId === msgId) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current = null
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setSpeakingMessageId(null)
      return
    }

    // 1. If base64 audio already provided by backend
    if (audioBase64) {
      playAudioSrc(`data:audio/mpeg;base64,${audioBase64}`, msgId, text)
      return
    }

    // 2. Fetch high-quality neural TTS from /voice/tts (auto detects English / Amharic)
    const cleanText = text.replace(/[*_#`~👋📱🌐💰💸🧾✓⚡]/g, '').trim()
    const ttsUrl = `http://localhost:8000/voice/tts?text=${encodeURIComponent(cleanText)}&voice=auto`
    playAudioSrc(ttsUrl, msgId, cleanText)
  }

  // Handle debounced sending to prevent duplicate submissions on Enter / click
  const handleSend = (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim()
    if (!text || isSendingRef.current || isThinking) {
      return
    }

    isSendingRef.current = true
    setInputText('')

    // Reset lock after debounce or completion
    setTimeout(() => {
      isSendingRef.current = false
    }, 700)

    processUserQuery(text)
  }

  // Handle incoming AI response generation & skill execution
  const processUserQuery = async (queryText: string, isVoice = false, voiceDuration?: number) => {
    const trimmed = queryText.trim()
    if (!trimmed || isThinking) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsgId = 'u_' + Date.now()

    // Append user message
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: trimmed,
      timestamp: now,
      isVoice,
      voiceDuration
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsThinking(true)
    isSendingRef.current = true

    // 1. Try real AI Agent backend on http://localhost:8000/chat
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: queryText,
          thread_id: threadId,
          user_id: 'selam_natnael'
        })
      })

      if (response.ok) {
        const data = await response.json()
        let cardType: 'airtime' | 'package' | 'receipt' | undefined
        let cardData: any = undefined

        const tools: string[] = data.tools_called || []
        const calls: any[] = data.tool_calls || []

        // 1. Handle WeChat AI Mode UI Components & Handoff Directives
        if (data.ui_components && data.ui_components.length > 0) {
          const ui = data.ui_components[0]
          if (ui.component_path.includes('airtime-card')) {
            cardType = 'airtime'
            cardData = { balance: walletBalance, defaultPhone: '+251 905410217', ...ui.data }
          } else if (ui.component_path.includes('package-card')) {
            cardType = 'package'
            cardData = ui.data
          } else if (ui.component_path.includes('order-receipt-card')) {
            cardType = 'receipt'
            cardData = ui.data
            if (ui.data?.newBalance !== undefined) {
              setWalletBalance(Number(ui.data.newBalance))
            } else if (ui.data?.remainingBalance !== undefined) {
              setWalletBalance(Number(ui.data.remainingBalance))
            }
          }
        } else if (tools.includes('payAirtimeOrder')) {
          cardType = 'receipt'
          const payCall = calls.find(c => c.tool === 'payAirtimeOrder')
          const matchAmount = data.answer.match(/Amount:\*\* ([\d.]+) ETB/)
          const charged = matchAmount ? parseFloat(matchAmount[1]) : 100
          const matchBal = data.answer.match(/telebirr Balance:\*\* ([\d.]+) ETB/)
          const newBal = matchBal ? parseFloat(matchBal[1]) : Math.max(0, walletBalance - charged)
          setWalletBalance(newBal)

          cardData = {
            success: true,
            transactionId:
              data.answer.match(/Transaction ID:\*\* `([^`]+)`/)?.[1] ||
              'TXN-' + Date.now().toString(16).toUpperCase(),
            orderId: payCall?.args?.orderId || 'ORD-' + Date.now(),
            amount: charged,
            recipientPhone: '+251 905410217',
            remainingBalance: newBal,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        } else if (tools.includes('createAirtimeOrder') || tools.includes('queryAirtimeOptions')) {
          const createCall = calls.find(c => c.tool === 'createAirtimeOrder')
          cardType = 'airtime'
          cardData = {
            balance: walletBalance,
            defaultPhone: createCall?.args?.recipientPhone || '+251 905410217'
          }
        } else if (tools.includes('queryPackages')) {
          cardType = 'package'
          cardData = {}
        } else {
          // If keywords match, show visual aid card
          const lower = queryText.toLowerCase()
          if (
            lower.includes('airtime') ||
            lower.includes('recharge') ||
            lower.includes('top up') ||
            lower.includes('topup')
          ) {
            cardType = 'airtime'
            cardData = { balance: walletBalance, defaultPhone: '+251 905410217' }
          } else if (
            lower.includes('package') ||
            lower.includes('data') ||
            lower.includes('bundle') ||
            lower.includes('internet')
          ) {
            cardType = 'package'
            cardData = {}
          }
        }

        // Handle Client Handoff (e.g. navigation or native actions)
        if (data.client_handoff && data.client_handoff.action === 'wx.navigateTo' && data.client_handoff.page_path) {
          Taro.navigateTo({ url: data.client_handoff.page_path })
        }

        const botMsgId = 'b_' + Date.now()
        const botMsg: ChatMessage = {
          id: botMsgId,
          sender: 'assistant',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType,
          cardData,
          sources: data.sources,
          toolsCalled: data.tools_called,
          modelUsed: data.model_used,
          clientHandoff: data.client_handoff
        }

        setMessages(prev => [...prev, botMsg])
        setIsThinking(false)
    isSendingRef.current = false
        isSendingRef.current = false

        if (isVoiceReplyEnabled) {
          speakText(data.answer, botMsgId)
        }
        return
      }
    } catch (err) {
      console.warn('Real AI Agent backend not responding, fallback to local reasoning:', err)
    }

    // 2. Local Fallback if backend is unreachable
    setTimeout(async () => {
      const lower = queryText.toLowerCase()
      let replyText = ''
      let cardType: 'airtime' | 'package' | 'receipt' | undefined
      let cardData: any = undefined

      if (
        lower.includes('airtime') ||
        lower.includes('recharge') ||
        lower.includes('top up') ||
        lower.includes('topup') ||
        lower.includes('credit') ||
        lower.includes('bonus')
      ) {
        replyText =
          'Here are the available airtime recharge options for +251 905410217. Enjoy special bonuses: +30% extra on 100 ETB and +35% extra on 250 ETB!'
        cardType = 'airtime'
        cardData = {
          balance: walletBalance,
          defaultPhone: '+251 905410217'
        }
      } else if (
        lower.includes('package') ||
        lower.includes('data') ||
        lower.includes('bundle') ||
        lower.includes('internet') ||
        lower.includes('gb')
      ) {
        replyText =
          'Here are Ethio Telecom recommended 4G data and voice packages. Tap any package to view details or activate immediately:'
        cardType = 'package'
        cardData = {}
      } else if (
        lower.includes('balance') ||
        lower.includes('how much') ||
        lower.includes('wallet') ||
        lower.includes('account')
      ) {
        replyText = `Your current Telebirr account summary:\n• Telebirr Wallet: ${walletBalance.toFixed(
          2
        )} ETB\n• Endekise (Overdraft): 120.00 ETB\n• Reward Points: 45.00 ETB\n\nAll services are active and ready.`
      } else if (lower.includes('send') || lower.includes('transfer') || lower.includes('abebe')) {
        replyText =
          'I can help you send money instantly with zero fees! You can transfer to mobile numbers, bank accounts, or pay merchants directly. Would you like me to open the Send Money transfer screen?'
      } else if (
        lower.includes('bill') ||
        lower.includes('electric') ||
        lower.includes('water') ||
        lower.includes('traffic')
      ) {
        replyText =
          'Telebirr supports seamless bill payments for Ethiopian Electric Utility (EEU), AAWSA Water, Traffic Penalty Payments, and more. Select "Payment" in the bottom menu or ask me for a specific biller.'
      } else {
        replyText = `I understand you are asking about: "${queryText}". I can help you recharge airtime, buy internet packages, check balances, or transfer money. What would you like to explore?`
      }

      const botMsgId = 'b_' + Date.now()
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType,
        cardData,
        modelUsed: 'local-fallback'
      }

      setMessages(prev => [...prev, botMsg])
      setIsThinking(false)
    isSendingRef.current = false
      isSendingRef.current = false

      if (isVoiceReplyEnabled) {
        speakText(replyText, botMsgId)
      }
    }, 600)
  }

  // Handle Airtime direct recharge from card
  const handleCardRecharge = async (amount: number) => {
    setIsThinking(true)
    try {
      const orderRes = await createAirtimeOrder({
        amount,
        recipientPhone: '+251 905410217'
      })

      if (orderRes.success && orderRes.order) {
        const payRes = await payAirtimeOrder({
          orderId: orderRes.order.orderId
        })

        if (payRes.success && payRes.payment) {
          const newBal = payRes.payment.remainingBalance ?? walletBalance - amount
          setWalletBalance(newBal)

          const replyText = `🎉 Success! Your recharge of ${amount} ETB has been processed for +251 905410217. Your bonus airtime has been credited instantly.`
          const botMsgId = 'b_receipt_' + Date.now()

          const botMsg: ChatMessage = {
            id: botMsgId,
            sender: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            cardType: 'receipt',
            cardData: payRes.payment
          }

          setMessages(prev => [...prev, botMsg])
          if (isVoiceReplyEnabled) {
            speakText(replyText, botMsgId)
          }
        }
      }
    } catch {
      Taro.showToast({ title: 'Recharge failed. Please try again.', icon: 'none' })
    } finally {
      setIsThinking(false)
    isSendingRef.current = false
    }
  }

  // Handle full end-to-end voice chat via /voice/chat
  const handleSendVoiceAudio = async (audioBlob: Blob, duration: number) => {
    setIsThinking(true)
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const tempUserMsgId = 'u_' + Date.now()

    try {
      const formData = new FormData()
      formData.append('audio_file', audioBlob, 'recording.mp3')
      formData.append('thread_id', threadId)
      formData.append('user_id', 'selam_natnael')
      formData.append('voice', 'auto')
      formData.append('return_audio', 'true')

      const response = await fetch('http://localhost:8000/voice/chat', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        const userTranscript = data.transcription || 'Voice message'

        // 1. User message bubble
        const userMsg: ChatMessage = {
          id: tempUserMsgId,
          sender: 'user',
          text: userTranscript,
          timestamp: now,
          isVoice: true,
          voiceDuration: duration,
          language: data.language
        }

        // 2. Extract Mini Program UI card components
        let cardType: 'airtime' | 'package' | 'receipt' | undefined
        let cardData: any = undefined

        if (data.ui_components && data.ui_components.length > 0) {
          const ui = data.ui_components[0]
          if (ui.component_path.includes('airtime-card')) {
            cardType = 'airtime'
            cardData = { balance: walletBalance, defaultPhone: '+251 905410217', ...ui.data }
          } else if (ui.component_path.includes('package-card')) {
            cardType = 'package'
            cardData = ui.data
          } else if (ui.component_path.includes('order-receipt-card')) {
            cardType = 'receipt'
            cardData = ui.data
            if (ui.data?.newBalance !== undefined) {
              setWalletBalance(Number(ui.data.newBalance))
            } else if (ui.data?.remainingBalance !== undefined) {
              setWalletBalance(Number(ui.data.remainingBalance))
            }
          }
        }

        // 3. Client Handoff
        if (data.client_handoff && data.client_handoff.action === 'wx.navigateTo' && data.client_handoff.page_path) {
          Taro.navigateTo({ url: data.client_handoff.page_path })
        }

        // 4. Assistant message bubble
        const botMsgId = 'b_' + Date.now()
        const botMsg: ChatMessage = {
          id: botMsgId,
          sender: 'assistant',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType,
          cardData,
          sources: data.sources,
          toolsCalled: data.tools_called,
          modelUsed: data.model_used,
          clientHandoff: data.client_handoff,
          audioBase64: data.audio_base64,
          language: data.language
        }

        setMessages(prev => [...prev, userMsg, botMsg])
        setIsThinking(false)
    isSendingRef.current = false
        isSendingRef.current = false

        if (isVoiceReplyEnabled) {
          if (data.audio_base64) {
            playAudioSrc(
              `data:${data.audio_mime_type || 'audio/mpeg'};base64,${data.audio_base64}`,
              botMsgId,
              data.answer
            )
          } else {
            speakText(data.answer, botMsgId)
          }
        }
        return
      }
    } catch (err) {
      console.warn('Voice chat backend error, falling back:', err)
    }

    setIsThinking(false)
    isSendingRef.current = false
  }

  // Handle Voice Recording (Speech-to-Text & /voice/chat)
  const startVoiceRecording = async () => {
    setIsRecording(true)
    setRecordingSeconds(0)

    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds(s => s + 1)
    }, 1000)

    // Check for real mic in browser / webview
    if (
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        audioChunksRef.current = []

        recorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data)
          }
        }

        recorder.start(100)
        mediaRecorderRef.current = recorder
        return
      } catch (err) {
        console.warn('Microphone permission not granted or in simulator:', err)
      }
    }

    // Fallback simulation in simulator environments
    simulateVoiceRecording()
  }

  const simulateVoiceRecording = () => {
    setTimeout(() => {
      if (isRecording) {
        const randomQuery =
          SIMULATED_VOICE_QUERIES[
            Math.floor(Math.random() * SIMULATED_VOICE_QUERIES.length)
          ]
        stopVoiceRecording(randomQuery)
      }
    }, 2400)
  }

  const stopVoiceRecording = async (simulatedQuery?: string) => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current)
      recordingTimerRef.current = null
    }

    const duration = Math.max(1, recordingSeconds)
    setIsRecording(false)
    setRecordingSeconds(0)

    // If real mediaRecorder was active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      const recorder = mediaRecorderRef.current
      recorder.onstop = async () => {
        const mimeType = recorder.mimeType || 'audio/webm'
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })
        audioChunksRef.current = []
        try {
          recorder.stream?.getTracks().forEach((track: any) => track.stop())
        } catch {
          // ignore
        }
        await handleSendVoiceAudio(audioBlob, duration)
      }
      recorder.stop()
      mediaRecorderRef.current = null
      return
    }

    // In simulator environments: synthesize query via /voice/tts and send real audio to /voice/chat
    const query =
      simulatedQuery ||
      SIMULATED_VOICE_QUERIES[
        Math.floor(Math.random() * SIMULATED_VOICE_QUERIES.length)
      ]

    try {
      const ttsRes = await fetch(
        `http://localhost:8000/voice/tts?text=${encodeURIComponent(query)}&voice=auto`
      )
      if (ttsRes.ok) {
        const buffer = await ttsRes.arrayBuffer()
        const audioBlob = new Blob([buffer], { type: 'audio/mpeg' })
        await handleSendVoiceAudio(audioBlob, duration)
        return
      }
    } catch {
      // ignore
    }

    processUserQuery(query, true, duration)
  }

  const handleClearChat = () => {
    Taro.showModal({
      title: 'Clear Conversation',
      content: 'Are you sure you want to reset the chat?',
      confirmColor: '#76bc21',
      success: res => {
        if (res.confirm) {
          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel()
          }
          setMessages([
            {
              id: 'welcome_' + Date.now(),
              sender: 'assistant',
              text: 'Selam Natnael! 👋 I am your Telebirr AI assistant. How can I help you today?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ])
          Taro.showToast({ title: 'Chat cleared', icon: 'none' })
        }
      }
    })
  }

  return (
    <View className="w-full h-full flex flex-col bg-[#f5f7f9] select-none relative overflow-hidden">
      {/* 1. Header Bar */}
      <View
        className="w-full px-4 pt-3 pb-3 flex flex-row items-center justify-between bg-white border-b border-gray-200 z-30 shadow-xs"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #fafdff 100%)'
        }}
      >
        {/* Left: Back / Minimize button & Avatar Info */}
        <View className="flex flex-row items-center space-x-2.5">
          {onClose && (
            <View
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer active:bg-gray-200 mr-1"
            >
              <Text className="text-gray-700 font-bold text-sm">✕</Text>
            </View>
          )}

          <View
            className="relative rounded-full bg-[#76bc21] border-2 border-white shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              maxWidth: '40px',
              maxHeight: '40px',
              flexShrink: 0
            }}
          >
            <Image
              src={aiAgentAvatar}
              className="w-full h-full object-cover"
              style={{
                width: '40px',
                height: '40px',
                minWidth: '40px',
                minHeight: '40px',
                maxWidth: '40px',
                maxHeight: '40px',
                display: 'block'
              }}
              mode="aspectFill"
            />
            {/* Green Online Dot */}
            <View className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
          </View>

          <View className="flex flex-col">
            <View className="flex flex-row items-center space-x-1.5">
              <Text className="text-sm font-extrabold text-gray-900 tracking-tight">
                Telebirr AI Agent
              </Text>
              <View className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                <Text className="text-[9px] font-bold text-[#5ea315]">AI Mode</Text>
              </View>
            </View>
            <Text className="text-[10px] text-gray-500 font-medium">
              WeChat Mini Program AI Runtime • Online
            </Text>
          </View>
        </View>

        {/* Right: Voice Toggle & Clear Chat */}
        <View className="flex flex-row items-center space-x-1.5">
          {/* TTS Voice Narration Toggle */}
          <View
            onClick={() => {
              const next = !isVoiceReplyEnabled
              setIsVoiceReplyEnabled(next)
              if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel()
                setSpeakingMessageId(null)
              }
              Taro.showToast({
                title: next ? 'Voice replies enabled 🔊' : 'Voice replies muted 🔇',
                icon: 'none'
              })
            }}
            className={`px-2 py-1 rounded-full flex flex-row items-center space-x-1 border cursor-pointer active:opacity-75 ${
              isVoiceReplyEnabled
                ? 'bg-emerald-50 border-emerald-200 text-[#5ea315]'
                : 'bg-gray-100 border-gray-200 text-gray-400'
            }`}
          >
            <Text className="text-xs">{isVoiceReplyEnabled ? '🔊' : '🔇'}</Text>
            <Text className="text-[10px] font-bold">
              {isVoiceReplyEnabled ? 'Voice ON' : 'Muted'}
            </Text>
          </View>

          {/* Clear Chat */}
          <View
            onClick={handleClearChat}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer active:bg-gray-200"
          >
            <Text className="text-xs text-gray-600">🗑️</Text>
          </View>
        </View>
      </View>

      {/* 2. Chat Message Stream */}
      <ScrollView
        scrollY
        className="flex-1 w-full px-3 pt-3 pb-24 overflow-y-auto"
        style={{ boxSizing: 'border-box' }}
      >
        <View className="flex flex-col space-y-3 pb-4">
          {messages.map(msg => {
            const isUser = msg.sender === 'user'
            const isSpeaking = speakingMessageId === msg.id

            return (
              <View
                key={msg.id}
                className={`flex flex-row w-full items-start ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <View
                    className="rounded-full bg-[#76bc21] border border-white shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0 mr-2 mt-1 self-start"
                    style={{
                      width: '32px',
                      height: '32px',
                      minWidth: '32px',
                      minHeight: '32px',
                      maxWidth: '32px',
                      maxHeight: '32px',
                      flexShrink: 0,
                      alignSelf: 'flex-start'
                    }}
                  >
                    <Image
                      src={aiAgentAvatar}
                      className="w-full h-full object-cover"
                      style={{
                        width: '32px',
                        height: '32px',
                        minWidth: '32px',
                        minHeight: '32px',
                        maxWidth: '32px',
                        maxHeight: '32px',
                        display: 'block'
                      }}
                      mode="aspectFill"
                    />
                  </View>
                )}

                {/* Message Bubble Container */}
                <View className="flex flex-col max-w-[85%]">
                  <View
                    className={`p-3 rounded-2xl shadow-xs relative ${
                      isUser
                        ? 'bg-[#76bc21] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}
                  >
                    {/* Voice Note Bubble Header if spoken */}
                    {msg.isVoice && (
                      <View className="flex flex-row items-center justify-between pb-1 mb-1 border-b border-white/20">
                        <View className="flex flex-row items-center space-x-1.5">
                          <Text className="text-xs">🎙️</Text>
                          <Text className="text-[10px] font-bold text-white/90">
                            Voice message ({msg.voiceDuration ?? 2}s)
                          </Text>
                        </View>
                        {msg.language && (
                          <Text className="text-[8.5px] font-bold text-white/90 bg-white/20 px-1.5 py-0.2 rounded-full">
                            {msg.language === 'am' ? '🇪🇹 አማርኛ' : '🌐 EN'}
                          </Text>
                        )}
                      </View>
                    )}

                    {/* Message Text with Markdown Formatting */}
                    <MarkdownView
                      content={msg.text}
                      isUser={isUser}
                    />

                    {/* Tools Invoked Indicator */}
                    {msg.toolsCalled && msg.toolsCalled.length > 0 && (
                      <View className="flex flex-row flex-wrap items-center gap-1 mt-2">
                        {msg.toolsCalled.map(tool => (
                          <View
                            key={tool}
                            className="bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex flex-row items-center space-x-1"
                          >
                            <Text className="text-[9px] font-bold text-[#2d882d]">
                              ⚡ {tool}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Sources & Citations */}
                    {msg.sources && msg.sources.length > 0 && (
                      <View className="mt-2 pt-2 border-t border-gray-100 flex flex-col space-y-1">
                        <Text className="text-[10px] font-bold text-gray-500">
                          📚 Sources & Citations:
                        </Text>
                        <View className="flex flex-wrap gap-1">
                          {msg.sources.map((src, i) => (
                            <View
                              key={i}
                              className="bg-gray-100 px-2 py-0.5 rounded text-[9px] text-gray-700 font-mono"
                            >
                              {src}
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Skill Visual Card Rendering (MCP UI Binding) */}
                    {msg.cardType === 'airtime' && (
                      <View className="mt-2.5">
                        <AirtimeCard
                          data={{
                            balance: walletBalance,
                            defaultPhone: msg.cardData?.defaultPhone || '+251 905410217',
                            ...msg.cardData
                          }}
                          onSelectAmount={amount => {
                            processUserQuery(
                              `I want to recharge ${amount} ETB airtime for ${
                                msg.cardData?.defaultPhone || '+251 905410217'
                              }`
                            )
                          }}
                        />
                      </View>
                    )}

                    {msg.cardType === 'package' && (
                      <View className="mt-2.5">
                        <PackageCard
                          data={msg.cardData}
                          onSelectPackage={(pkg: AirtimePackage) => {
                            processUserQuery(
                              `I want to subscribe to package ${pkg.id} (${pkg.name})`
                            )
                          }}
                        />
                      </View>
                    )}

                    {msg.cardType === 'receipt' && msg.cardData && (
                      <View className="mt-2.5">
                        <OrderReceiptCard
                          data={msg.cardData}
                          onConfirmPay={() => {
                            const orderId =
                              msg.cardData?.orderId || msg.clientHandoff?.params?.orderId
                            if (orderId) {
                              processUserQuery(
                                `Yes, proceed with payment for order ${orderId}`
                              )
                            } else {
                              handleCardRecharge(msg.cardData?.amount || 100)
                            }
                          }}
                        />
                      </View>
                    )}

                    {/* WeChat AI Mode Client Handoff Directive Card */}
                    {msg.clientHandoff && (
                      <View className="mt-2.5 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200 flex flex-col space-y-1.5">
                        <View className="flex flex-row items-center justify-between">
                          <View className="flex flex-row items-center space-x-1">
                            <Text className="text-xs">⚡</Text>
                            <Text className="text-[10px] font-bold text-emerald-800">
                              Client Handoff: {msg.clientHandoff.action}
                            </Text>
                          </View>
                          <Text className="text-[9px] text-emerald-700 font-mono">
                            {msg.clientHandoff.page_path || 'Direct Action'}
                          </Text>
                        </View>
                        <View className="flex flex-row gap-2 pt-1">
                          {msg.clientHandoff.page_path && (
                            <View
                              onClick={() => {
                                const p = msg.clientHandoff.page_path
                                const params = msg.clientHandoff.params || {}
                                const query = Object.entries(params)
                                  .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
                                  .join('&')
                                Taro.navigateTo({ url: query ? `${p}?${query}` : p })
                              }}
                              className="flex-1 py-1.5 rounded-lg bg-white border border-emerald-300 flex items-center justify-center cursor-pointer active:bg-emerald-100 shadow-xs"
                            >
                              <Text className="text-[11px] font-bold text-emerald-700">
                                🚀 Open Native Page
                              </Text>
                            </View>
                          )}
                          {msg.clientHandoff.action === 'wx.requestPayment' &&
                            msg.clientHandoff.params?.orderId && (
                              <View
                                onClick={() => {
                                  processUserQuery(
                                    `Yes, proceed with payment for order ${msg.clientHandoff.params.orderId}`
                                  )
                                }}
                                className="flex-1 py-1.5 rounded-lg bg-[#76bc21] flex items-center justify-center cursor-pointer active:opacity-90 shadow-xs"
                              >
                                <Text className="text-[11px] font-bold text-white">
                                  💳 Pay via Agent
                                </Text>
                              </View>
                            )}
                        </View>
                      </View>
                    )}

                    {/* Bubble Footer: Timestamp, Language & TTS Speaker */}
                    <View className="flex flex-row items-center justify-between mt-1 pt-1">
                      <View className="flex flex-row items-center space-x-1.5">
                        <Text
                          className={`text-[9.5px] ${
                            isUser ? 'text-white/70' : 'text-gray-400'
                          }`}
                        >
                          {msg.timestamp} {msg.modelUsed ? `• ${msg.modelUsed}` : ''}
                        </Text>
                        {!isUser && msg.language && (
                          <View className="bg-emerald-50 border border-emerald-200/80 px-1 rounded flex flex-row items-center">
                            <Text className="text-[8.5px] font-bold text-[#2d882d]">
                              {msg.language === 'am' ? '🇪🇹 አማርኛ' : '🌐 EN'}
                            </Text>
                          </View>
                        )}
                      </View>

                      {!isUser && (
                        <View
                          onClick={() => speakText(msg.text, msg.id, msg.audioBase64)}
                          className={`flex flex-row items-center space-x-1 px-1.5 py-0.5 rounded cursor-pointer transition active:scale-95 ${
                            isSpeaking ? 'bg-emerald-100 text-[#5ea315]' : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Text className="text-xs">{isSpeaking ? '🔊' : '🔈'}</Text>
                          <Text className="text-[10px] font-semibold">
                            {isSpeaking ? 'Speaking...' : 'Listen'}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )
          })}

          {/* Thinking / Processing Indicator */}
          {isThinking && (
            <View className="flex flex-row items-center space-x-2 pl-2 py-1">
              <View
                className="rounded-full bg-[#76bc21] border border-white shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  maxWidth: '28px',
                  maxHeight: '28px',
                  flexShrink: 0
                }}
              >
                <Image
                  src={aiAgentAvatar}
                  className="w-full h-full object-cover"
                  style={{
                    width: '28px',
                    height: '28px',
                    minWidth: '28px',
                    minHeight: '28px',
                    maxWidth: '28px',
                    maxHeight: '28px',
                    display: 'block'
                  }}
                  mode="aspectFill"
                />
              </View>
              <View className="bg-white px-3.5 py-2 rounded-2xl rounded-tl-none border border-gray-100 shadow-xs flex flex-row items-center space-x-1.5">
                <View className="w-1.5 h-1.5 bg-[#76bc21] rounded-full animate-bounce" />
                <View
                  className="w-1.5 h-1.5 bg-[#76bc21] rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <View
                  className="w-1.5 h-1.5 bg-[#76bc21] rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
                <Text className="text-[11px] text-gray-500 font-medium ml-1">
                  Telebirr AI is thinking...
                </Text>
              </View>
            </View>
          )}

          {/* Quick Suggestions Chips (Rendered if few messages) */}
          {messages.length <= 3 && (
            <View className="pt-2">
              <Text className="text-xs font-bold text-gray-500 mb-2 px-1">
                Suggested Actions:
              </Text>
              <View className="flex flex-row flex-wrap gap-1.5">
                {QUICK_SUGGESTIONS.map(sug => (
                  <View
                    key={sug.label}
                    onClick={() => handleSend(sug.query)}
                    className="bg-white border border-[#d2f0a8] px-3 py-1.5 rounded-full shadow-xs cursor-pointer active:scale-95 transition"
                  >
                    <Text className="text-xs font-semibold text-[#2b881f]">
                      {sug.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View id="ai-chat-scroll-anchor" className="h-2" />
        </View>
      </ScrollView>

      {/* 3. Bottom Voice & Text Input Dock */}
      <View className="w-full bg-white border-t border-gray-200 px-3 pt-2.5 pb-6 z-30 shadow-md">
        {isVoiceInputMode ? (
          /* Voice Recording Mode */
          <View className="w-full flex flex-col items-center justify-center py-2">
            {/* Waveform Visualizer & Status */}
            {isRecording ? (
              <View className="flex flex-col items-center mb-3">
                {/* Dynamic Waveform Bars */}
                <View className="flex flex-row items-center space-x-1.5 h-8 mb-2">
                  {[12, 24, 16, 28, 20, 14, 26, 18].map((h, i) => (
                    <View
                      key={i}
                      className="w-1 bg-[#76bc21] rounded-full"
                      style={{
                        height: `${h}px`,
                        animation: `voice-wave-bar 0.8s ease-in-out infinite alternate`,
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </View>
                <Text className="text-xs font-bold text-[#76bc21]">
                  Listening... ({recordingSeconds}s)
                </Text>
                <Text className="text-[10px] text-gray-400 mt-0.5">
                  Speak clearly in English or Amharic
                </Text>
              </View>
            ) : (
              <View className="flex flex-col items-center mb-2">
                <Text className="text-xs font-semibold text-gray-600">
                  Tap microphone to speak to Telebirr AI
                </Text>
                <Text className="text-[10px] text-gray-400 mt-0.5">
                  e.g. &quot;Recharge 100 birr&quot; or &quot;Check my balance&quot;
                </Text>
              </View>
            )}

            {/* Mic Action Controls */}
            <View className="w-full flex flex-row items-center justify-between px-6">
              {/* Switch back to Keyboard */}
              <View
                onClick={() => {
                  if (isRecording) stopVoiceRecording()
                  setIsVoiceInputMode(false)
                }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer active:bg-gray-200"
              >
                <Text className="text-base">⌨️</Text>
              </View>

              {/* Big Pulsing Mic Button */}
              <View
                onClick={() => {
                  if (isRecording) {
                    stopVoiceRecording()
                  } else {
                    startVoiceRecording()
                  }
                }}
                className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white animate-voice-ripple'
                    : 'bg-[#76bc21] text-white hover:bg-[#68a81d]'
                }`}
                style={{
                  boxShadow: isRecording
                    ? '0 0 20px rgba(239, 68, 68, 0.5)'
                    : '0 4px 18px rgba(118, 188, 33, 0.45)'
                }}
              >
                <Text className="text-2xl">{isRecording ? '⏹' : '🎙️'}</Text>
              </View>

              {/* Cancel Button if recording, otherwise Quick Sample */}
              {isRecording ? (
                <View
                  onClick={() => {
                    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current)
                    setIsRecording(false)
                    setRecordingSeconds(0)
                    Taro.showToast({ title: 'Recording cancelled', icon: 'none' })
                  }}
                  className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center cursor-pointer active:bg-red-100"
                >
                  <Text className="text-sm font-bold text-red-500">✕</Text>
                </View>
              ) : (
                <View
                  onClick={() => {
                    const sample =
                      SIMULATED_VOICE_QUERIES[
                        Math.floor(Math.random() * SIMULATED_VOICE_QUERIES.length)
                      ]
                    processUserQuery(sample, true, 2)
                  }}
                  className="px-2.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <Text className="text-[10px] font-bold text-[#5ea315]">Sample ⚡</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          /* Text Input Mode */
          <View className="flex flex-row items-center space-x-2">
            {/* Switch to Voice Button */}
            <View
              onClick={() => setIsVoiceInputMode(true)}
              className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center cursor-pointer active:bg-emerald-100 flex-shrink-0"
              title="Voice Input"
            >
              <Text className="text-lg">🎙️</Text>
            </View>

            {/* Text Input Box */}
            <View className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 flex flex-row items-center border border-gray-200 focus-within:border-[#76bc21] focus-within:bg-white transition">
              <Input
                type="text"
                confirmType="send"
                value={inputText}
                onInput={e => setInputText(e.detail.value)}
                onConfirm={(e: any) => {
                  const val = e?.detail?.value ?? inputText
                  handleSend(val)
                }}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' || e.keyCode === 13) {
                    if (e.preventDefault) e.preventDefault()
                    if (e.stopPropagation) e.stopPropagation()
                    handleSend(inputText)
                  }
                }}
                placeholder="Ask Telebirr AI (e.g. 'Recharge 100 birr')..."
                className="w-full text-xs text-gray-800 bg-transparent outline-none"
              />
              {inputText.trim().length > 0 && (
                <View
                  onClick={() => setInputText('')}
                  className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer mr-1"
                >
                  <Text className="text-[10px] text-white">✕</Text>
                </View>
              )}
            </View>

            {/* Send Button */}
            <View
              onClick={() => handleSend(inputText)}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition flex-shrink-0 ${
                inputText.trim().length > 0 && !isThinking
                  ? 'bg-[#76bc21] text-white shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                  fill="currentColor"
                />
              </svg>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
