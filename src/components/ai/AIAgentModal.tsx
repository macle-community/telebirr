import React from 'react'
import { View } from '@tarojs/components'
import AIAgentChat from './AIAgentChat'

export interface AIAgentModalProps {
  visible: boolean
  onClose: () => void
}

export default function AIAgentModal({ visible, onClose }: AIAgentModalProps) {
  if (!visible) return null

  return (
    <View className="fixed inset-0 z-50 flex flex-col justify-end select-none">
      {/* 1. Backdrop */}
      <View
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* 2. Sliding Drawer Content Sheet */}
      <View
        className="relative w-full max-w-[500px] mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden z-10 transition-transform duration-300 transform translate-y-0"
        style={{
          height: '92vh',
          maxHeight: '760px',
          boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Grab Handle */}
        <View className="w-full pt-2 pb-1 bg-white flex items-center justify-center cursor-pointer">
          <View className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </View>

        {/* Full Chat & Voice Interface */}
        <View className="flex-1 w-full overflow-hidden">
          <AIAgentChat onClose={onClose} isModal />
        </View>
      </View>
    </View>
  )
}

