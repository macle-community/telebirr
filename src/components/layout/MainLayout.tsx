import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'

import Header from '../Header'
import TabBar, { TabType } from '../TabBar'
import HomeView from '../views/HomeView'
import PaymentView from '../views/PaymentView'
import AppsView from '../views/AppsView'
import EngageView from '../views/EngageView'
import AccountView from '../views/AccountView'
import HomeAdModal from '../home/HomeAdModal'

export interface MainLayoutProps {
  initialTab?: TabType
}

const TAB_INDEX_MAP: Record<TabType, number> = {
  home: 0,
  payment: 1,
  apps: 2,
  engage: 3,
  account: 4
}

export default function MainLayout({ initialTab = 'home' }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const [language, setLanguage] = useState<'English' | 'አማርኛ'>('English')
  const [showHomeAd, setShowHomeAd] = useState(() => {
    try {
      return Taro.getStorageSync('telebirr_dismiss_home_ad') !== true
    } catch {
      return true
    }
  })

  useLoad((options: any) => {
    if (options && options.tab) {
      const validTabs: TabType[] = ['home', 'payment', 'apps', 'engage', 'account']
      if (validTabs.includes(options.tab)) {
        setActiveTab(options.tab as TabType)
      }
    }
  })

  const tabIndex = TAB_INDEX_MAP[activeTab] ?? 0

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

  const handleSearchClick = () => {
    Taro.showToast({ title: `Search in ${activeTab}`, icon: 'none' })
  }

  const handleNotificationClick = () => {
    Taro.showToast({ title: 'Notifications', icon: 'none' })
  }

  const handleMenuClick = () => {
    Taro.showToast({ title: 'telebirr Engage Menu', icon: 'none' })
  }

  return (
    <View className="h-screen bg-gray-50 flex flex-col relative select-none overflow-hidden">
      {/* 1. Top Header */}
      <Header
        activeTab={activeTab}
        language={language}
        onLanguageToggle={handleLanguageToggle}
        onSearchClick={handleSearchClick}
        onNotificationClick={handleNotificationClick}
        onMenuClick={handleMenuClick}
      />

      {/* 2. Smooth Sliding Body Container */}
      <View className="flex-1 w-full overflow-hidden relative">
        <View
          className="h-full flex flex-row will-change-transform"
          style={{
            width: '500%',
            transform: `translate3d(-${tabIndex * 20}%, 0, 0)`,
            transition: 'transform 320ms cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        >
          {/* Pane 0: Home */}
          <View
            style={{ width: '20%', height: '100%', flexShrink: 0 }}
            className="h-full relative overflow-hidden"
          >
            <HomeView
              onNavigateHistory={handleNavigateHistory}
              onScanQR={() => Taro.showToast({ title: 'Scan QR Code', icon: 'none' })}
              onQuickAction={handleQuickAction}
            />
          </View>

          {/* Pane 1: Payment */}
          <View
            style={{ width: '20%', height: '100%', flexShrink: 0 }}
            className="h-full overflow-y-auto payment-scroll-container"
          >
            <PaymentView onBillerSelect={(name) => handleQuickAction(`Pay ${name}`)} />
          </View>

          {/* Pane 2: Apps */}
          <View
            style={{ width: '20%', height: '100%', flexShrink: 0 }}
            className="h-full overflow-y-auto apps-scroll-container"
          >
            <AppsView onAppSelect={(name) => handleQuickAction(`Mini Program: ${name}`)} />
          </View>

          {/* Pane 3: Engage */}
          <View
            style={{ width: '20%', height: '100%', flexShrink: 0 }}
            className="h-full overflow-y-auto engage-scroll-container"
          >
            <EngageView
              onStartEngaging={() =>
                Taro.showToast({ title: 'Starting telebirr Engage...', icon: 'none' })
              }
            />
          </View>

          {/* Pane 4: Account */}
          <View
            style={{ width: '20%', height: '100%', flexShrink: 0 }}
            className="h-full relative overflow-hidden"
          >
            <AccountView
              language={language}
              onLanguageToggle={handleLanguageToggle}
              onItemClick={(item) => handleQuickAction(item)}
              onShowQR={() => Taro.showToast({ title: 'My QR Code', icon: 'none' })}
            />
          </View>
        </View>
      </View>

      {/* 3. Bottom TabBar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 4. Promotional Home Ad Modal Overlay */}
      {activeTab === 'home' && (
        <HomeAdModal
          visible={showHomeAd}
          onClose={() => setShowHomeAd(false)}
          onAdClick={() => {
            Taro.showToast({ title: 'Linking Fayda ID...', icon: 'none' })
          }}
        />
      )}
    </View>
  )
}

