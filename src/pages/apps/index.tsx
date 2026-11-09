import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import Header from '../../components/Header'
import TabBar from '../../components/TabBar'
import AppsView from '../../components/views/AppsView'
import './index.css'

export default function AppsPage() {
  return (
    <View className="min-h-screen bg-gray-50 flex flex-col relative select-none">
      <Header
        activeTab="apps"
        language="English"
        onLanguageToggle={() => {}}
        onSearchClick={() => Taro.showToast({ title: 'Search apps...', icon: 'none' })}
        onNotificationClick={() => {}}
        onMenuClick={() => {}}
      />
      <View className="flex-1 apps-scroll-container">
        <AppsView
          onAppSelect={(name) =>
            Taro.showToast({ title: `Opening ${name}...`, icon: 'none' })
          }
        />
      </View>
      <TabBar activeTab="apps" />
    </View>
  )
}

