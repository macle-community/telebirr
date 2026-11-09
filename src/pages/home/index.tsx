import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import Header from '../../components/Header'
import TabBar from '../../components/TabBar'
import HomeView from '../../components/views/HomeView'
import './index.css'

export default function HomePage() {
  const [language, setLanguage] = useState<'English' | 'አማርኛ'>('English')

  const handleLanguageToggle = () => {
    const nextLang = language === 'English' ? 'አማርኛ' : 'English'
    setLanguage(nextLang)
    Taro.showToast({ title: `Language: ${nextLang}`, icon: 'none' })
  }

  const handleNavigateHistory = () => {
    Taro.navigateTo({ url: '/pages/transaction-history/index' })
  }

  const handleQuickAction = (title: string) => {
    Taro.showToast({ title, icon: 'none' })
  }

  return (
    <View className="h-screen bg-gray-50 flex flex-col relative select-none overflow-hidden">
      <Header
        activeTab="home"
        language={language}
        onLanguageToggle={handleLanguageToggle}
        onSearchClick={() => Taro.showToast({ title: 'Search telebirr', icon: 'none' })}
        onNotificationClick={() => Taro.showToast({ title: 'Notifications', icon: 'none' })}
        onMenuClick={() => {}}
      />
      <View className="flex-1 overflow-hidden relative">
        <HomeView
          onNavigateHistory={handleNavigateHistory}
          onScanQR={() => Taro.showToast({ title: 'Scan QR Code', icon: 'none' })}
          onQuickAction={handleQuickAction}
        />
      </View>
      <TabBar activeTab="home" />
    </View>
  )
}

