import React from 'react'
import { View, Text } from '@tarojs/components'

export interface NeedsBannerProps {
  text?: string
  className?: string
}

export default function NeedsBanner({
  text = 'ONE APP FOR ALL YOUR NEEDS!',
  className = 'w-full px-2 pt-0 flex justify-center z-10'
}: NeedsBannerProps) {
  return (
    <View className={className}>
      <View
        className="w-full py-1.5 rounded-t-xl flex items-center justify-center shadow-xs"
        style={{ backgroundColor: '#f9a825' }}
      >
        <Text className="text-white font-bold text-xs tracking-wider uppercase">
          {text}
        </Text>
      </View>
    </View>
  )
}
