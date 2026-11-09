import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { IconArrowLeft } from '../../components/Icons'
import txIcon from '../../assets/images/tx_icon.png'
import txDownloadIcon from '../../assets/images/tx_icon_download.png'
import txFilterIcon from '../../assets/images/tx_icon_filter.png'
import './index.css'

interface TransactionItem {
  id: string
  title: string
  dateTime: string
  amount: number
  currency: string
  type: 'transfer' | 'cashin'
  refNo: string
}

export default function TransactionHistory() {
  const [activeTab, setActiveTab] = useState<'main' | 'reward'>('main')
  const [selectedTx, setSelectedTx] = useState<TransactionItem | null>(null)

  // Back Navigation
  const handleBack = () => {
    try {
      Taro.navigateBack()
    } catch (e) {
      Taro.redirectTo({ url: '/pages/index/index' })
    }
  }

  // Monthly groups matching transaction_history.jpg exactly
  const novemberTransactions: TransactionItem[] = [
    {
      id: 'tx_1',
      title: 'Transfer Money',
      dateTime: '06-11-2026 20:55',
      amount: -30.00,
      currency: 'ETB',
      type: 'transfer',
      refNo: 'MP261106.2055.A98214'
    },
    {
      id: 'tx_2',
      title: 'Cash In',
      dateTime: '06-11-2026 20:54',
      amount: 1000.00,
      currency: 'ETB',
      type: 'cashin',
      refNo: 'MP261106.2054.C44109'
    },
    {
      id: 'tx_3',
      title: 'Transfer Money',
      dateTime: '05-11-2026 20:50',
      amount: -40.00,
      currency: 'ETB',
      type: 'transfer',
      refNo: 'MP261105.2050.T51820'
    },
    {
      id: 'tx_4',
      title: 'Transfer Money',
      dateTime: '04-11-2026 19:35',
      amount: -30.00,
      currency: 'ETB',
      type: 'transfer',
      refNo: 'MP261104.1935.M19402'
    }
  ]

  const octoberTransactions: TransactionItem[] = [
    {
      id: 'tx_5',
      title: 'Transfer Money',
      dateTime: '31-10-2026 10:15',
      amount: -30.00,
      currency: 'ETB',
      type: 'transfer',
      refNo: 'MP261031.1015.K77319'
    },
    {
      id: 'tx_6',
      title: 'Transfer Money',
      dateTime: '30-10-2026 19:20',
      amount: -40.00,
      currency: 'ETB',
      type: 'transfer',
      refNo: 'MP261030.1920.L90218'
    },
    {
      id: 'tx_7',
      title: 'Transfer Money',
      dateTime: '30-10-2026 19:17',
      amount: -30.00,
      currency: 'ETB',
      type: 'transfer',
      refNo: 'MP261030.1917.Q33810'
    }
  ]

  // Stats calculation
  const payTotal = -369.70
  const incomeTotal = 1000.00
  const grandTotal = 630.30

  return (
    <View className="min-h-screen bg-gray-50 flex flex-col select-none">
      {/* 1. Android Status Bar */}
      <View className="w-full flex flex-row items-center justify-between px-4 pt-1 h-6 bg-white text-xs text-gray-900">
        <View className="flex flex-row items-center space-x-1.5">
          <Text className="font-semibold text-[11px]">11:09</Text>
          <Text className="text-[10px]">🔔</Text>
          <Text className="text-[10px]">⚠️</Text>
        </View>
        <View className="flex flex-row items-center space-x-2 text-[10px]">
          <Text>📶 4G</Text>
          <Text>📶</Text>
          <Text className="font-medium">19% 🔋</Text>
        </View>
      </View>

      {/* 2. Top Navigation Bar with Back Arrow & Title & Capsule */}
      <View className="w-full h-12 bg-white px-3 flex flex-row items-center justify-between border-b border-gray-100">
        <View className="flex flex-row items-center space-x-2">
          <View onClick={handleBack} className="p-1 cursor-pointer active:opacity-60">
            <IconArrowLeft size={22} color="#111827" />
          </View>
          <Text className="text-gray-900 font-bold text-lg tracking-tight">
            Transaction History
          </Text>
        </View>

        {/* Mini Program Capsule Controls */}
        <View className="flex flex-row items-center border border-gray-300 rounded-full px-2.5 py-1 bg-white space-x-2.5">
          <Text className="text-gray-700 text-xs font-bold leading-none">•••</Text>
          <View className="w-[1px] h-3 bg-gray-200" />
          <View className="w-3.5 h-3.5 rounded-full border border-gray-700 flex items-center justify-center">
            <View className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          </View>
        </View>
      </View>

      {/* 3. Filter Tabs (Main vs Reward) & Action Icons */}
      <View className="w-full px-4 py-3 flex flex-row items-center justify-between">
        {/* Left Segmented Filter Pills */}
        <View className="flex flex-row items-center space-x-2">
          {/* Main Tab */}
          <View
            onClick={() => setActiveTab('main')}
            className={`px-5 py-1.5 rounded-full cursor-pointer text-sm font-semibold transition-colors ${
              activeTab === 'main'
                ? 'text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
            style={{
              backgroundColor: activeTab === 'main' ? '#76bc21' : '#ffffff'
            }}
          >
            <Text className={activeTab === 'main' ? 'text-white font-semibold' : 'text-gray-500 font-medium'}>
              Main
            </Text>
          </View>

          {/* Reward Tab */}
          <View
            onClick={() => setActiveTab('reward')}
            className={`px-5 py-1.5 rounded-full cursor-pointer text-sm font-semibold transition-colors ${
              activeTab === 'reward'
                ? 'text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
            style={{
              backgroundColor: activeTab === 'reward' ? '#76bc21' : '#ffffff'
            }}
          >
            <Text className={activeTab === 'reward' ? 'text-white font-semibold' : 'text-gray-500 font-medium'}>
              Reward
            </Text>
          </View>
        </View>

        {/* Right Download & Filter Icons */}
        <View className="flex flex-row items-center space-x-2">
          <View
            onClick={() => Taro.showToast({ title: 'Downloading Statement...', icon: 'none' })}
            className="w-9 h-9 flex items-center justify-center cursor-pointer active:opacity-70"
          >
            <Image
              src={txDownloadIcon}
              mode="aspectFit"
              style={{ width: '28px', height: '28px' }}
            />
          </View>
          <View
            onClick={() => Taro.showToast({ title: 'Filter Transactions', icon: 'none' })}
            className="w-9 h-9 flex items-center justify-center cursor-pointer active:opacity-70"
          >
            <Image
              src={txFilterIcon}
              mode="aspectFit"
              style={{ width: '28px', height: '28px' }}
            />
          </View>
        </View>
      </View>

      {/* 4. Green Summary Banner Card */}
      <View className="w-full px-4 mb-3">
        <View
          className="w-full rounded-xl py-3 px-4 flex flex-row items-center justify-between shadow-sm"
          style={{ backgroundColor: '#76bc21' }}
        >
          {/* Pay */}
          <View className="flex flex-col items-start flex-1">
            <Text className="text-white/90 text-xs font-medium">Pay (ETB)</Text>
            <Text className="text-white font-bold text-base mt-0.5">
              {payTotal.toFixed(2)}
            </Text>
          </View>

          {/* Income */}
          <View className="flex flex-col items-center flex-1">
            <Text className="text-white/90 text-xs font-medium">Income (ETB)</Text>
            <Text className="text-white font-bold text-base mt-0.5">
              {incomeTotal.toFixed(2)}
            </Text>
          </View>

          {/* Total */}
          <View className="flex flex-col items-end flex-1">
            <Text className="text-white/90 text-xs font-medium">Total (ETB)</Text>
            <Text className="text-white font-bold text-base mt-0.5">
              {grandTotal.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* 5. Grouped Transaction List */}
      <View className="w-full px-4 space-y-4 pb-12">
        {/* November Group */}
        <View className="w-full bg-white rounded-2xl overflow-hidden telebirr-card-shadow">
          {/* Group Header */}
          <View className="px-4 py-2.5 bg-emerald-50/70 border-b border-emerald-100/50">
            <Text className="text-gray-900 font-bold text-sm">November</Text>
          </View>

          {/* Records */}
          <View className="divide-y divide-gray-100">
            {novemberTransactions.map((tx) => (
              <View
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="px-4 py-3 flex flex-row items-center justify-between cursor-pointer active:bg-gray-50"
              >
                {/* Left: Icon + Title + DateTime */}
                <View className="flex flex-row items-center space-x-3">
                  <View className="w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                      src={txIcon}
                      mode="aspectFit"
                      style={{ width: '38px', height: '38px' }}
                    />
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-gray-900 font-semibold text-sm">
                      {tx.title}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-0.5">
                      {tx.dateTime}
                    </Text>
                  </View>
                </View>

                {/* Right: Amount & Currency */}
                <View className="flex flex-col items-end">
                  <Text className="text-gray-900 font-bold text-base">
                    {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(2)}
                  </Text>
                  <Text className="text-gray-400 text-[11px] font-medium uppercase mt-0.5">
                    {tx.currency}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* October Group */}
        <View className="w-full bg-white rounded-2xl overflow-hidden telebirr-card-shadow">
          {/* Group Header */}
          <View className="px-4 py-2.5 bg-emerald-50/70 border-b border-emerald-100/50">
            <Text className="text-gray-900 font-bold text-sm">October</Text>
          </View>

          {/* Records */}
          <View className="divide-y divide-gray-100">
            {octoberTransactions.map((tx) => (
              <View
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="px-4 py-3 flex flex-row items-center justify-between cursor-pointer active:bg-gray-50"
              >
                {/* Left: Icon + Title + DateTime */}
                <View className="flex flex-row items-center space-x-3">
                  <View className="w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                      src={txIcon}
                      mode="aspectFit"
                      style={{ width: '38px', height: '38px' }}
                    />
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-gray-900 font-semibold text-sm">
                      {tx.title}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-0.5">
                      {tx.dateTime}
                    </Text>
                  </View>
                </View>

                {/* Right: Amount & Currency */}
                <View className="flex flex-col items-end">
                  <Text className="text-gray-900 font-bold text-base">
                    {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(2)}
                  </Text>
                  <Text className="text-gray-400 text-[11px] font-medium uppercase mt-0.5">
                    {tx.currency}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 6. Authentic telebirr Receipt Detail Modal */}
      {selectedTx && (
        <View className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <View className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl tx-receipt-modal flex flex-col items-center">
            {/* Header Icon */}
            <View className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
              <Text className="text-2xl">✓</Text>
            </View>

            <Text className="text-gray-900 font-bold text-xl mb-1">
              {selectedTx.title}
            </Text>
            <Text className="text-emerald-600 font-semibold text-xs tracking-wider uppercase mb-4">
              Transaction Successful
            </Text>

            {/* Amount */}
            <Text className="text-gray-900 font-extrabold text-3xl mb-6">
              {selectedTx.amount > 0 ? `+${selectedTx.amount.toFixed(2)}` : selectedTx.amount.toFixed(2)} {selectedTx.currency}
            </Text>

            {/* Details Table */}
            <View className="w-full border-t border-b border-gray-100 py-3 space-y-2 mb-6 text-sm">
              <View className="flex flex-row justify-between">
                <Text className="text-gray-400">Reference No</Text>
                <Text className="text-gray-800 font-mono font-medium">{selectedTx.refNo}</Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-gray-400">Date & Time</Text>
                <Text className="text-gray-800 font-medium">{selectedTx.dateTime}</Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-gray-400">Payment Mode</Text>
                <Text className="text-gray-800 font-medium">telebirr Wallet</Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-gray-400">Fee</Text>
                <Text className="text-emerald-600 font-bold">0.00 ETB</Text>
              </View>
            </View>

            {/* Close Button */}
            <View
              onClick={() => setSelectedTx(null)}
              className="w-full py-3 rounded-full flex items-center justify-center cursor-pointer shadow-sm active:opacity-90"
              style={{ backgroundColor: '#76bc21' }}
            >
              <Text className="text-white font-bold text-base">Done</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
