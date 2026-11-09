import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import Header from '../../components/Header'
import TabBar from '../../components/TabBar'
import AccountView from '../../components/views/AccountView'
import './index.css'

export default function AccountPage() {
  const [language, setLanguage] = useState<'English' | 'አማርኛ'>('English')

  const handleLanguageToggle = () => {
    const nextLang = language === 'English' ? 'አማርኛ' : 'English'
    setLanguage(nextLang)
    Taro.showToast({ title: `Language: ${nextLang}`, icon: 'none' })
  }

  return (
    <View className="min-h-screen bg-gray-50 flex flex-col relative select-none">
      <Header
        activeTab="account"
        language={language}
        onLanguageToggle={handleLanguageToggle}
        onSearchClick={() => Taro.showToast({ title: 'Search Account...', icon: 'none' })}
        onNotificationClick={() => {}}
        onMenuClick={() => {}}
      />
      <View className="flex-1 account-scroll-container">
        <AccountView
          language={language}
          onLanguageToggle={handleLanguageToggle}
          onItemClick={(item) => Taro.showToast({ title: item, icon: 'none' })}
          onShowQR={() => Taro.showToast({ title: 'My QR Code', icon: 'none' })}
        />
      </View>
      <TabBar activeTab="account" />
    </View>
  )
}

