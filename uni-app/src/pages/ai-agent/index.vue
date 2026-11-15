<template>
  <view class="agent-page">
    <view class="agent-header">
      <text class="agent-back" @click="goBack">‹</text>
      <image src="/static/images/ai_agent_avatar.png" mode="aspectFill" />
      <view class="agent-heading"><text>Telebirr AI Agent</text><text>Here to help</text></view>
      <text class="clear-chat" @click="clearChat">↻</text>
      <text class="close-chat" @click="goBack">×</text>
    </view>

    <scroll-view class="chat-scroll" scroll-y :scroll-into-view="scrollAnchor">
      <view v-for="message in messages" :id="message.id" :key="message.id" class="message" :class="message.sender">
        <view class="bubble">{{ message.text }}</view>
        <text class="message-time">{{ message.timestamp }}</text>
        <view v-if="message.cardType === 'airtime'" class="action-card">
          <view class="card-title-row"><text>Airtime Recharge Options</text><text>Wallet: {{ walletBalance.toFixed(2) }} ETB</text></view>
          <text class="card-recipient">Recipient　+251 905410217</text>
          <view class="chat-amounts">
            <text v-for="amount in denominations" :key="amount" :class="{ chosen: selectedAmount === amount }" @click="selectedAmount = amount">{{ amount }} ETB</text>
          </view>
          <button class="card-button" @click="openAirtime">Continue to recharge {{ selectedAmount }} ETB</button>
        </view>
        <view v-if="message.cardType === 'package'" class="action-card">
          <view class="card-title-row"><text>Recommended Packages</text><text>Ethio Telecom 4G</text></view>
          <view v-for="pkg in packages" :key="pkg.id" class="chat-package" @click="selectedPackageId = pkg.id">
            <view><text>{{ pkg.name }}</text><text>{{ pkg.validity }} · {{ pkg.tag }}</text></view>
            <text>{{ pkg.price }} ETB</text>
          </view>
          <button class="card-button" @click="openPackage">Continue to packages</button>
        </view>
        <view v-if="message.cardType === 'receipt'" class="action-card receipt-card">
          <text class="receipt-success">✓ Payment successful</text>
          <text>{{ message.cardData?.amount || 0 }} ETB · {{ message.cardData?.transactionId || 'Transaction complete' }}</text>
          <text>Wallet balance: {{ walletBalance.toFixed(2) }} ETB</text>
          <text class="receipt-link" @click="navigate('/pages/transaction-history/index')">View transaction history ›</text>
        </view>
      </view>
      <view v-if="isThinking" class="thinking">Assistant is typing…</view>
      <view :id="scrollAnchor" class="scroll-anchor" />
    </scroll-view>

    <view v-if="messages.length === 1" class="quick-suggestions">
      <text v-for="suggestion in suggestions" :key="suggestion.label" @click="sendMessage(suggestion.query)">{{ suggestion.label }}</text>
    </view>
    <view class="agent-composer">
      <text class="voice-button" :class="{ recording: isRecording }" @click="toggleRecording">{{ isRecording ? '■' : '🎙' }}</text>
      <input v-model="inputText" placeholder="Ask your telebirr assistant..." confirm-type="send" @confirm="sendMessage()" />
      <text class="send-message" @click="sendMessage()">➤</text>
    </view>
  </view>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
import {
  DEFAULT_DENOMINATIONS,
  DEFAULT_PACKAGES,
  WALLET_BALANCE
} from '../../services/buyAirtime.js'

const welcome = 'Selam Natnael! 👋 I am your Telebirr AI assistant. I can help you recharge airtime with up to 35% bonus, buy data bundles, check your balance, or make instant payments. What would you like to do today?'
const messages = ref([{ id: 'welcome', sender: 'assistant', text: welcome, timestamp: now() }])
const inputText = ref('')
const isThinking = ref(false)
const isRecording = ref(false)
const walletBalance = ref(WALLET_BALANCE)
const selectedAmount = ref(100)
const selectedPackageId = ref('p1')
const scrollAnchor = ref('message-end-0')
const denominations = DEFAULT_DENOMINATIONS.map((item) => item.amount)
const packages = DEFAULT_PACKAGES
const suggestions = [
  { label: '⚡ Order 100 ETB Airtime', query: 'Create an order to recharge 100 ETB airtime for 0905410217' },
  { label: '📱 Airtime Options', query: 'Show airtime options' },
  { label: '🌐 Internet Packages', query: 'Show me available data packages' },
  { label: '💰 Check My Balance', query: 'What is my current balance?' },
  { label: '💸 Send Money', query: 'How do I send money?' }
]
let recorder

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
function goBack() {
  uni.navigateBack({ fail: () => uni.reLaunch({ url: '/pages/home/index' }) })
}
function navigate(url) {
  uni.navigateTo({ url })
}
function appendMessage(message) {
  messages.value.push(message)
  nextTick(() => { scrollAnchor.value = `message-end-${messages.value.length}` })
}
function detectCard(query, data) {
  const component = data?.ui_components?.[0]?.component_path || ''
  if (component.includes('airtime-card')) return 'airtime'
  if (component.includes('package-card')) return 'package'
  if (component.includes('order-receipt-card')) return 'receipt'
  const lower = query.toLowerCase()
  if (['airtime', 'recharge', 'top up', 'topup', 'bonus'].some((word) => lower.includes(word))) return 'airtime'
  if (['package', 'data', 'bundle', 'internet', 'gb'].some((word) => lower.includes(word))) return 'package'
  return ''
}
function fallbackAnswer(query) {
  const lower = query.toLowerCase()
  if (['airtime', 'recharge', 'top up', 'topup', 'bonus'].some((word) => lower.includes(word))) {
    return 'Here are the available airtime recharge options for +251 905410217. Enjoy +30% extra on 100 ETB and +35% extra on 250 ETB!'
  }
  if (['package', 'data', 'bundle', 'internet', 'gb'].some((word) => lower.includes(word))) {
    return 'Here are Ethio Telecom recommended data and voice packages. Select a package to continue.'
  }
  if (['balance', 'how much', 'wallet', 'account'].some((word) => lower.includes(word))) {
    return `Your current telebirr wallet balance is ${walletBalance.value.toFixed(2)} ETB.`
  }
  if (['send', 'transfer', 'abebe'].some((word) => lower.includes(word))) {
    return 'I can help you send money. Open the Send Money service from Home to start a transfer.'
  }
  if (['bill', 'electric', 'water', 'traffic'].some((word) => lower.includes(word))) {
    return 'You can find utility and government billers in the Payment tab.'
  }
  return `I understand you are asking about: "${query}". I can help with airtime, data packages, balances, and transfers.`
}
function sendMessage(value) {
  const text = String(value === undefined ? inputText.value : value).trim()
  if (!text || isThinking.value) return
  inputText.value = ''
  appendMessage({ id: `user-${Date.now()}`, sender: 'user', text, timestamp: now() })
  isThinking.value = true
  uni.request({
    url: 'http://localhost:8000/chat',
    method: 'POST',
    timeout: 10000,
    header: { 'Content-Type': 'application/json' },
    data: { question: text, thread_id: 'telebirr_uniapp', user_id: 'selam_natnael' },
    success: (response) => {
      const data = response.data || {}
      const answer = typeof data.answer === 'string' ? data.answer : fallbackAnswer(text)
      const cardType = detectCard(text, data)
      if (data.client_handoff?.action === 'wx.navigateTo' && typeof data.client_handoff.page_path === 'string') {
        const path = data.client_handoff.page_path
        if (path.startsWith('/')) uni.navigateTo({ url: path })
      }
      appendMessage({ id: `assistant-${Date.now()}`, sender: 'assistant', text: answer, timestamp: now(), cardType })
      isThinking.value = false
    },
    fail: (error) => {
      console.warn('AI backend request failed; using local assistant response.', error)
      appendMessage({ id: `assistant-${Date.now()}`, sender: 'assistant', text: fallbackAnswer(text), timestamp: now(), cardType: detectCard(text) })
      isThinking.value = false
    }
  })
}
function openAirtime() {
  navigate(`/packageAirtime/pages/index?amount=${selectedAmount.value}&recipientPhone=%2B251%20905410217&recipientType=self`)
}
function openPackage() {
  navigate(`/packageAirtime/pages/index?tab=package&packageId=${selectedPackageId.value}`)
}
function clearChat() {
  uni.showModal({
    title: 'Clear Conversation',
    content: 'Are you sure you want to reset the chat?',
    confirmColor: '#76bc21',
    success: (result) => {
      if (!result.confirm) return
      messages.value = [{ id: `welcome-${Date.now()}`, sender: 'assistant', text: 'Selam Natnael! 👋 How can I help you today?', timestamp: now() }]
      uni.showToast({ title: 'Chat cleared', icon: 'none' })
    }
  })
}
function toggleRecording() {
  if (isRecording.value) {
    recorder?.stop()
    isRecording.value = false
    return
  }
  if (!recorder) {
    recorder = uni.getRecorderManager()
    recorder.onStop((result) => {
      uni.uploadFile({
        url: 'http://localhost:8000/voice/chat',
        filePath: result.tempFilePath,
        name: 'audio_file',
        formData: { thread_id: 'telebirr_uniapp', user_id: 'selam_natnael', voice: 'auto', return_audio: 'false' },
        success: (response) => {
          try {
            const data = JSON.parse(response.data)
            const transcript = data.transcription || 'Voice message'
            appendMessage({ id: `voice-${Date.now()}`, sender: 'user', text: transcript, timestamp: now() })
            appendMessage({ id: `assistant-${Date.now()}`, sender: 'assistant', text: data.answer || fallbackAnswer(transcript), timestamp: now(), cardType: detectCard(transcript, data) })
          } catch (error) {
            console.error('Unable to parse voice assistant response.', error)
            uni.showToast({ title: 'Could not read voice response', icon: 'none' })
          }
        },
        fail: (error) => {
          console.error('Voice assistant upload failed.', error)
          uni.showToast({ title: 'Voice service unavailable', icon: 'none' })
        }
      })
    })
    recorder.onError((error) => {
      console.error('Voice recording failed.', error)
      isRecording.value = false
      uni.showToast({ title: 'Unable to record audio', icon: 'none' })
    })
  }
  recorder.start({ duration: 60000, format: 'mp3' })
  isRecording.value = true
}
onUnload(() => {
  if (isRecording.value) recorder?.stop()
})
</script>

<style scoped>
.agent-page { display:flex; height:100vh; flex-direction:column; background:#f5f7f9; }
.agent-header { display:flex; height:58px; flex:0 0 58px; align-items:center; padding:0 12px; background:#fff; border-bottom:1px solid #eaecf0; }
.agent-back { margin-right:8px; color:#475467; font-size:28px; }
.agent-header image { width:36px; height:36px; margin-right:8px; border-radius:50%; }
.agent-heading { display:flex; flex:1; flex-direction:column; font-size:13px; font-weight:700; }
.agent-heading text:last-child { margin-top:3px; color:#12b76a; font-size:9px; font-weight:400; }
.clear-chat,.close-chat { margin-left:12px; color:#667085; font-size:20px; }
.chat-scroll { flex:1; min-height:0; padding:12px; }
.message { display:flex; flex-direction:column; align-items:flex-start; margin-bottom:13px; }
.message.user { align-items:flex-end; }
.bubble { max-width:85%; padding:10px 12px; border-radius:15px; background:#fff; color:#344054; font-size:13px; line-height:19px; box-shadow:0 2px 6px rgba(0,0,0,.04); white-space:pre-wrap; }
.message.user .bubble { background:#76bc21; color:#fff; }
.message-time { margin:4px 4px 0; color:#98a2b3; font-size:9px; }
.thinking { margin:6px 0 14px; color:#98a2b3; font-size:11px; }
.scroll-anchor { height:1px; }
.action-card { width:100%; margin-top:8px; padding:12px; border:1px solid #eaecf0; border-radius:14px; background:#fff; }
.card-title-row { display:flex; justify-content:space-between; gap:8px; margin-bottom:10px; font-size:11px; font-weight:700; }
.card-title-row text:last-child { color:#5ea315; font-size:9px; font-weight:600; }
.card-recipient { display:block; margin-bottom:9px; color:#667085; font-size:10px; }
.chat-amounts { display:flex; flex-wrap:wrap; gap:6px; }
.chat-amounts text { padding:6px 8px; border:1px solid #eaecf0; border-radius:8px; background:#f9fafb; font-size:9px; }
.chat-amounts text.chosen { border-color:#76bc21; background:#f2f9e9; color:#5ea315; }
.card-button { width:100%; margin:11px 0 0; border:0; border-radius:9px; background:#76bc21; color:#fff; font-size:11px; }
.chat-package { display:flex; align-items:center; justify-content:space-between; padding:9px 0; border-top:1px solid #f2f4f7; }
.chat-package view { display:flex; flex-direction:column; gap:4px; font-size:10px; font-weight:600; }
.chat-package view text:last-child { color:#667085; font-size:9px; font-weight:400; }
.chat-package > text { color:#5ea315; font-size:11px; font-weight:700; }
.receipt-card { display:flex; flex-direction:column; gap:7px; color:#667085; font-size:10px; }
.receipt-success { color:#039855; font-size:12px; font-weight:700; }
.receipt-link { color:#0084ff; }
.quick-suggestions { display:flex; flex-wrap:wrap; gap:7px; padding:0 12px 10px; }
.quick-suggestions text { padding:7px 9px; border:1px solid #e4edd2; border-radius:16px; background:#fff; color:#475467; font-size:9px; }
.agent-composer { display:flex; align-items:center; gap:8px; padding:9px 12px calc(9px + env(safe-area-inset-bottom)); border-top:1px solid #eaecf0; background:#fff; }
.agent-composer input { flex:1; height:38px; padding:0 12px; border-radius:20px; background:#f2f4f7; font-size:11px; }
.voice-button,.send-message { display:flex; width:34px; height:34px; align-items:center; justify-content:center; border-radius:50%; color:#76bc21; font-size:17px; }
.voice-button.recording { background:#fef3f2; color:#d92d20; }
.send-message { background:#76bc21; color:#fff; }
</style>
