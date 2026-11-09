import React, { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'

import Header from '../../components/Header'
import TabBar, { TabType } from '../../components/TabBar'
import HomeView from '../../components/views/HomeView'
import PaymentView from '../../components/views/PaymentView'
import AppsView from '../../components/views/AppsView'
import EngageView from '../../components/views/EngageView'
import AccountView from '../../components/views/AccountView'
import { IconScanQR } from '../../components/Icons'
import './index.css'

export default function IndexPage() {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [language, setLanguage] = useState<'English' | 'አማርኛ'>('English')

  useLoad((options: any) => {
    if (options && options.tab) {
      const validTabs: TabType[] = ['home', 'payment', 'apps', 'engage', 'account']
      if (validTabs.includes(options.tab)) {
        setActiveTab(options.tab as TabType)
      }
    }
  })

  // Modals state
  const [showQRModal, setShowQRModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sendMoneyModal, setSendMoneyModal] = useState<{ open: boolean; recipient: string; amount: string }>({
    open: false,
    recipient: '',
    amount: ''
  })

  // Language toggle
  const handleLanguageToggle = () => {
    const nextLang = language === 'English' ? 'አማርኛ' : 'English'
    setLanguage(nextLang)
    Taro.showToast({
      title: `Language changed to ${nextLang}`,
      icon: 'success'
    })
  }

  // Navigate to Transaction History page
  const handleNavigateHistory = () => {
    Taro.navigateTo({
      url: '/pages/transaction-history/index'
    })
  }

  // Quick Action Handler
  const handleQuickAction = (title: string) => {
    if (title === 'Send Money') {
      setSendMoneyModal({ open: true, recipient: '', amount: '' })
      return
    }

    Taro.showModal({
      title: title,
      content: `Opening ${title} on telebirr platform...`,
      showCancel: false,
      confirmText: 'OK',
      confirmColor: '#76bc21'
    })
  }

  // Send Money execution
  const executeSendMoney = () => {
    if (!sendMoneyModal.recipient || !sendMoneyModal.amount) {
      Taro.showToast({ title: 'Please enter phone & amount', icon: 'none' })
      return
    }

    Taro.showLoading({ title: 'Processing Transfer...' })
    setTimeout(() => {
      Taro.hideLoading()
      setSendMoneyModal({ open: false, recipient: '', amount: '' })
      Taro.showToast({
        title: `Transferred ${sendMoneyModal.amount} ETB to ${sendMoneyModal.recipient}!`,
        icon: 'success',
        duration: 2500
      })
    }, 800)
  }

  return (
    <View className="min-h-screen bg-gray-50 flex flex-col relative select-none">
      {/* 1. Top Header (Adapts to Active Tab) */}
      <Header
        activeTab={activeTab}
        language={language}
        onLanguageToggle={handleLanguageToggle}
        onSearchClick={() => setShowSearchModal(true)}
        onNotificationClick={() => {
          Taro.showToast({ title: 'No new notifications', icon: 'none' })
        }}
        onMenuClick={() => {
          Taro.showToast({ title: 'telebirr Engage Menu', icon: 'none' })
        }}
      />

      {/* 2. Scrollable Body Views */}
      <View className="flex-1 telebirr-scroll-container">
        {activeTab === 'home' && (
          <HomeView
            onNavigateHistory={handleNavigateHistory}
            onScanQR={() => setShowQRModal(true)}
            onQuickAction={handleQuickAction}
          />
        )}

        {activeTab === 'payment' && (
          <PaymentView
            onBillerSelect={(biller) => handleQuickAction(`Pay ${biller}`)}
          />
        )}

        {activeTab === 'apps' && (
          <AppsView
            onAppSelect={(appName) => handleQuickAction(`Mini Program: ${appName}`)}
          />
        )}

        {activeTab === 'engage' && (
          <EngageView
            onStartEngaging={() => {
              Taro.showToast({ title: 'Starting telebirr Engage...', icon: 'none' })
            }}
          />
        )}

        {activeTab === 'account' && (
          <AccountView
            language={language}
            onLanguageToggle={handleLanguageToggle}
            onItemClick={(item) => handleQuickAction(item)}
            onShowQR={() => setShowQRModal(true)}
          />
        )}
      </View>

      {/* 3. Bottom Signature Tab Bar with Active Notch & Dot */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 4. QR Scanner Simulator Modal */}
      {showQRModal && (
        <View className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <View className="w-full max-w-sm bg-white rounded-3xl p-6 flex flex-col items-center">
            <View className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <IconScanQR size={32} color="#76bc21" />
            </View>
            <Text className="text-gray-900 font-bold text-lg mb-1">
              telebirr QR Scanner
            </Text>
            <Text className="text-gray-500 text-xs text-center mb-6">
              Align telebirr merchant QR code or personal receiver code within frame
            </Text>

            {/* Simulated viewfinder */}
            <View className="w-48 h-48 border-2 border-dashed border-emerald-500 rounded-2xl flex items-center justify-center bg-gray-50 mb-6 relative">
              <View className="w-36 h-[2px] bg-emerald-500 animate-pulse" />
              <Text className="absolute bottom-3 text-gray-400 text-[10px]">
                Ready to scan...
              </Text>
            </View>

            <View
              onClick={() => setShowQRModal(false)}
              className="w-full py-3 rounded-full flex items-center justify-center cursor-pointer shadow-sm active:opacity-90"
              style={{ backgroundColor: '#76bc21' }}
            >
              <Text className="text-white font-bold text-sm">Close</Text>
            </View>
          </View>
        </View>
      )}

      {/* 5. Send Money Modal */}
      {sendMoneyModal.open && (
        <View className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <View className="w-full max-w-sm bg-white rounded-3xl p-6 flex flex-col">
            <Text className="text-gray-900 font-bold text-lg mb-1">
              Send Money via telebirr
            </Text>
            <Text className="text-gray-500 text-xs mb-4">
              Available Balance: 993.37 ETB
            </Text>

            {/* Recipient Input */}
            <View className="mb-3">
              <Text className="text-gray-700 text-xs font-semibold mb-1 block">
                Receiver Phone Number
              </Text>
              <Input
                type="number"
                value={sendMoneyModal.recipient}
                onInput={(e) =>
                  setSendMoneyModal((prev) => ({ ...prev, recipient: e.detail.value }))
                }
                placeholder="09... / +251..."
                className="w-full px-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-800"
              />
            </View>

            {/* Amount Input */}
            <View className="mb-6">
              <Text className="text-gray-700 text-xs font-semibold mb-1 block">
                Amount (ETB)
              </Text>
              <Input
                type="digit"
                value={sendMoneyModal.amount}
                onInput={(e) =>
                  setSendMoneyModal((prev) => ({ ...prev, amount: e.detail.value }))
                }
                placeholder="0.00"
                className="w-full px-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-800"
              />
            </View>

            {/* Action Buttons */}
            <View className="flex flex-row space-x-2">
              <View
                onClick={() => setSendMoneyModal({ open: false, recipient: '', amount: '' })}
                className="flex-1 py-3 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              >
                <Text className="text-gray-700 font-bold text-sm">Cancel</Text>
              </View>
              <View
                onClick={executeSendMoney}
                className="flex-1 py-3 rounded-full flex items-center justify-center cursor-pointer shadow-sm active:opacity-90"
                style={{ backgroundColor: '#76bc21' }}
              >
                <Text className="text-white font-bold text-sm">Send</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 6. Search Dialog Modal */}
      {showSearchModal && (
        <View className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-12">
          <View className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl flex flex-col">
            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-gray-900 font-bold text-base">Search telebirr</Text>
              <Text
                onClick={() => setShowSearchModal(false)}
                className="text-gray-400 font-bold text-sm p-1 cursor-pointer"
              >
                ✕
              </Text>
            </View>
            <Input
              type="text"
              value={searchQuery}
              onInput={(e) => setSearchQuery(e.detail.value)}
              placeholder="Search services, billers, or mini programs..."
              className="w-full px-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-800 mb-4"
            />
            <View className="flex flex-col space-y-2">
              <Text className="text-gray-400 text-xs font-semibold uppercase">Popular Searches</Text>
              {['Send Money', 'Pay Ethio telecom Bill', 'Electric Utility', 'Ethiopian Airlines', 'Fayda ID'].map((s, idx) => (
                <View
                  key={idx}
                  onClick={() => {
                    setShowSearchModal(false)
                    handleQuickAction(s)
                  }}
                  className="py-2 px-3 bg-gray-50 rounded-lg text-sm text-gray-700 cursor-pointer active:bg-emerald-50"
                >
                  <Text>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
