import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import aiAgentAvatar from '../../assets/images/ai_agent_avatar.png'

export interface AIAgentButtonProps {
  onClick: () => void
  bottom?: string
  right?: string
  className?: string
}

export default function AIAgentButton({
  onClick,
  bottom = '76px',
  right = '12px',
  className = ''
}: AIAgentButtonProps) {
  return (
    <View
      onClick={onClick}
      className={`absolute z-40 cursor-pointer active:scale-95 transition-transform duration-150 select-none animate-ai-float ${className}`}
      style={{ bottom, right }}
    >
      <View className="relative flex flex-row items-center">
        {/* Left Pill Capsule */}
        <View
          className="flex flex-row items-center bg-white/95 backdrop-blur-md pl-3.5 pr-12 py-2 rounded-full border border-[#d2f0a8] shadow-lg"
          style={{
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(118, 188, 33, 0.16)'
          }}
        >
          {/* Sparkles Icon */}
          <View className="mr-2 flex items-center justify-center -mt-0.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Primary Large Sparkle */}
              <path
                d="M10 2C10 6.418 6.418 10 2 10C6.418 10 10 13.582 10 18C10 13.582 13.582 10 18 10C13.582 10 10 6.418 10 2Z"
                fill="#ffb703"
              />
              {/* Secondary Small Sparkle */}
              <path
                d="M18 14C18 16.209 16.209 18 14 18C16.209 18 18 19.791 18 22C18 19.791 19.791 18 22 18C19.791 18 18 16.209 18 14Z"
                fill="#ffc83b"
              />
            </svg>
          </View>

          {/* Texts */}
          <View className="flex flex-col pr-1">
            <Text className="text-[14.5px] font-black text-[#228a1c] tracking-tight leading-tight">
              AI Agent
            </Text>
            <Text className="text-[10px] text-gray-500 font-semibold tracking-tight leading-tight mt-0.5">
              Your Telebirr assistant
            </Text>
          </View>
        </View>

        {/* Right Circular Avatar Button */}
        <View className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* 3 Radiating Rays on Top-Right */}
          <View className="absolute -top-3.5 -right-2.5 pointer-events-none animate-ai-rays">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Inner ray */}
              <path
                d="M4 18C4 13 8 7 13 5"
                stroke="#76bc21"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Middle ray */}
              <path
                d="M8 21C8 14 13 8 19 6"
                stroke="#76bc21"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Outer spark */}
              <circle cx="21" cy="4" r="1.5" fill="#76bc21" />
            </svg>
          </View>

          {/* Green Glowing Circle Avatar */}
          <View
            className="w-13 h-13 rounded-full border-2 border-white bg-gradient-to-br from-[#76bc21] to-[#388e3c] flex items-center justify-center overflow-hidden"
            style={{
              width: '52px',
              height: '52px',
              boxShadow: '0 4px 14px rgba(118, 188, 33, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12)'
            }}
          >
            <Image
              src={aiAgentAvatar}
              className="w-full h-full object-cover"
              mode="aspectFill"
            />
          </View>
        </View>
      </View>
    </View>
  )
}
