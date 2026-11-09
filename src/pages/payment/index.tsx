import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import Header from '../../components/Header'
import TabBar from '../../components/TabBar'
import PaymentView from '../../components/views/PaymentView'
import './index.css'

export default function PaymentPage() {
  const [language, setLanguage] = useState<'English' | 'አማርኛ'>('English')

  return (
    <View className="min-h-screen bg-gray-50 flex flex-col relative select-none">
      <Header
        activeTab="payment"
        language={language}
        onLanguageToggle={() => {}}
        onSearchClick={() => Taro.showToast({ title: 'Search billers...', icon: 'none' })}
        onNotificationClick={() => {}}
        onMenuClick={() => {}}
      />
      <View className="flex-1 payment-scroll-container">
        <PaymentView
          onBillerSelect={(name) =>
            Taro.showToast({ title: `Selected: ${name}`, icon: 'none' })
          }
        />
      </View>
      <TabBar activeTab="payment" />
    </View>
  )
}

