import React, { useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import engageHero from '../../assets/images/engage_hero.png'
import userAvatar from '../../assets/images/home_user_avatar.png'

interface EngageViewProps {
  onStartEngaging: () => void
}

export default function EngageView({ onStartEngaging }: EngageViewProps) {
  const [inChatMode, setInChatMode] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; isMoney?: boolean }>>([
    { sender: 'Abebe Bikila', text: 'Selam Natnael, did you receive the transfer?', time: '10:45 AM' },
    { sender: 'me', text: 'Yes, received 1000 ETB via telebirr! Thanks! 🙏', time: '10:46 AM' },
    { sender: 'Abebe Bikila', text: 'Great! telebirr is super fast! ⚡', time: '10:48 AM' }
  ])
  const [inputMsg, setInputMsg] = useState('')

  const friends = [
    { name: 'Abebe Bikila', phone: '+251911223344', status: 'Online', lastMsg: 'telebirr is super fast! ⚡' },
    { name: 'Tirunesh Dibaba', phone: '+251922334455', status: 'Active 2h ago', lastMsg: 'Sent 50 ETB gift package' },
    { name: 'Haile Gebrselassie', phone: '+251933445566', status: 'Offline', lastMsg: 'Lunch bill split' },
    { name: 'Derartu Tulu', phone: '+251944556677', status: 'Online', lastMsg: 'Let us meet at Bole' }
  ]

  const handleSend = () => {
    if (!inputMsg.trim()) return
    setMessages((prev) => [
      ...prev,
      { sender: 'me', text: inputMsg.trim(), time: '11:08 AM' }
    ])
    setInputMsg('')
  }

  const handleSendMoneyInChat = () => {
    Taro.showModal({
      title: 'Send Money in Engage',
      content: 'Send 50.00 ETB to Abebe Bikila?',
      confirmColor: '#76bc21',
      success: (res) => {
        if (res.confirm) {
          setMessages((prev) => [
            ...prev,
            { sender: 'me', text: '💸 Sent 50.00 ETB via telebirr', time: '11:09 AM', isMoney: true }
          ])
          Taro.showToast({ title: 'Transfer Successful!', icon: 'success' })
        }
      }
    })
  }

  if (inChatMode) {
    return (
      <View className="w-full flex flex-col h-[calc(100vh-140px)] pb-24 bg-gray-50">
        {/* Top Friend Bar */}
        <View className="w-full px-4 py-2.5 bg-white border-b border-gray-100 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center space-x-2">
            <Text
              onClick={() => setInChatMode(false)}
              className="text-base text-gray-700 font-bold pr-2 cursor-pointer"
            >
              ←
            </Text>
            <View className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              AB
            </View>
            <View className="flex flex-col">
              <Text className="text-gray-900 font-semibold text-sm">Abebe Bikila</Text>
              <Text className="text-emerald-600 text-[10px]">Online</Text>
            </View>
          </View>
          <View
            onClick={handleSendMoneyInChat}
            className="px-3 py-1 bg-emerald-600 rounded-full flex flex-row items-center space-x-1 cursor-pointer shadow-sm active:opacity-90"
          >
            <Text className="text-white text-xs font-semibold">💸 Send Money</Text>
          </View>
        </View>

        {/* Message Thread */}
        <View className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((m, idx) => {
            const isMe = m.sender === 'me'
            return (
              <View
                key={idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <View
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl ${
                    isMe
                      ? m.isMoney
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-gray-800 border border-gray-100 shadow-sm'
                  }`}
                >
                  <Text className="text-sm">{m.text}</Text>
                </View>
                <Text className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</Text>
              </View>
            )
          })}
        </View>

        {/* Input Bar */}
        <View className="p-3 bg-white border-t border-gray-100 flex flex-row items-center space-x-2">
          <Input
            value={inputMsg}
            onInput={(e) => setInputMsg(e.detail.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm text-gray-800"
          />
          <View
            onClick={handleSend}
            className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold cursor-pointer shadow-sm"
          >
            ➤
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-between px-6 pt-10 pb-28">
      {/* 1. Center Hero Image & Text matching engage.jpg */}
      <View className="flex flex-col items-center justify-center my-auto">
        {/* Engage Logo Illustration */}
        <View className="w-40 h-40 flex items-center justify-center mb-5">
          <Image
            src={engageHero}
            mode="aspectFit"
            style={{ width: '150px', height: '150px' }}
          />
        </View>

        {/* Heading */}
        <Text className="text-gray-900 font-bold text-[17px] text-center mb-2.5 tracking-tight">
          Welcome to telebirr Engage
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-400 text-xs text-center leading-relaxed max-w-[260px]">
          Engage with your friends and family and experience the power of telebirr!!
        </Text>
      </View>

      {/* 2. Start Engaging Button */}
      <View className="w-full flex items-center justify-center mt-auto">
        <View
          onClick={() => {
            setInChatMode(true)
            onStartEngaging()
          }}
          className="w-full max-w-[280px] py-2.5 rounded-lg flex items-center justify-center shadow active:opacity-90 cursor-pointer"
          style={{ backgroundColor: '#76bc21' }}
        >
          <Text className="text-white font-semibold text-sm tracking-wide">
            Start Engaging
          </Text>
        </View>
      </View>
    </View>
  )
}

