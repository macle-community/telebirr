import { useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

export default function IndexPage() {
  const [count, setCount] = useState(0)

  return (
    <View className="page">
      <Text className="eyebrow">MACLE + TARO</Text>
      <Text className="title">Hello, Telebirr</Text>
      <Text className="description">
        Your first React page is running. Change the message, rebuild, and
        explore the generated output.
      </Text>
      <View className="counter">
        <Text>Button taps: {count}</Text>
      </View>
      <Button
        className="primary-button"
        onClick={() => setCount((current) => current + 1)}
      >
        Try an event
      </Button>
      <Button
        className="secondary-button"
        onClick={() => Taro.showToast({ title: 'Taro API called', icon: 'none' })}
      >
        Show a toast
      </Button>
    </View>
  )
}
