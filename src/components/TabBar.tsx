import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import tabHome from '../assets/images/tabbar_home.png'
import tabPay from '../assets/images/tabbar_pay.png'
import tabApps from '../assets/images/tabbar_apps.png'
import tabEngage from '../assets/images/tabbar_engage.png'
import tabAccount from '../assets/images/tabbar_account.png'

export type TabType = 'home' | 'payment' | 'apps' | 'engage' | 'account'

interface TabBarProps {
  activeTab: TabType
  onTabChange?: (tab: TabType) => void
}

const TAB_IMAGES: Record<TabType, string> = {
  home: tabHome,
  payment: tabPay,
  apps: tabApps,
  engage: tabEngage,
  account: tabAccount
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs: TabType[] = ['home', 'payment', 'apps', 'engage', 'account']

  const handleTabClick = (tab: TabType) => {
    if (tab === activeTab) return
    if (onTabChange) {
      onTabChange(tab)
    } else {
      try {
        Taro.redirectTo({ url: `/pages/${tab}/index` })
      } catch (e) {
        Taro.navigateTo({ url: `/pages/${tab}/index` })
      }
    }
  }

  return (
    <View className="fixed bottom-0 left-0 right-0 z-50 select-none" style={{ backgroundColor: '#8dc73f' }}>
      <View className="relative w-full" style={{ height: '62px' }}>
        {/* Background Image of Tab Bar with Active Notch & Dot */}
        <Image
          src={TAB_IMAGES[activeTab]}
          mode="aspectFill"
          className="w-full h-full block"
          style={{ width: '100%', height: '62px' }}
        />

        {/* 5 Clickable Touch Targets */}
        <View className="absolute inset-0 flex flex-row">
          {tabs.map((tab) => (
            <View
              key={tab}
              className="flex-1 h-full cursor-pointer"
              onClick={() => handleTabClick(tab)}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
