import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import AIAgentChat from '../../components/ai/AIAgentChat'

export default function AIAgentPage() {
  const handleBack = () => {
    Taro.navigateBack({
      fail: () => {
        Taro.reLaunch({ url: '/pages/home/index' })
      }
    })
  }

  return (
    <View className="w-full h-screen bg-[#f5f7f9] overflow-hidden">
      <AIAgentChat onClose={handleBack} isModal={false} />
    </View>
  )
}
