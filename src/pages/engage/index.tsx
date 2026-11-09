import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import Header from '../../components/Header'
import TabBar from '../../components/TabBar'
import EngageView from '../../components/views/EngageView'
import './index.css'

export default function EngagePage() {
  return (
    <View className="min-h-screen bg-gray-50 flex flex-col relative select-none">
      <Header
        activeTab="engage"
        language="English"
        onLanguageToggle={() => {}}
        onSearchClick={() => Taro.showToast({ title: 'Search Engage...', icon: 'none' })}
        onNotificationClick={() => {}}
        onMenuClick={() => Taro.showToast({ title: 'Engage Menu', icon: 'none' })}
      />
      <View className="flex-1 engage-scroll-container">
        <EngageView
          onStartEngaging={() =>
            Taro.showToast({ title: 'Starting telebirr Engage...', icon: 'none' })
          }
        />
      </View>
      <TabBar activeTab="engage" />
    </View>
  )
}

