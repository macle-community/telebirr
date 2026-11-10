import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AirtimeDenomination } from '../../types'
import { DEFAULT_DENOMINATIONS } from '../../apis/queryAirtimeOptions'

export interface AirtimeCardProps {
  data?: {
    denominations?: AirtimeDenomination[]
    balance?: number
    defaultPhone?: string
  }
  onSelectAmount?: (amount: number) => void
}

export default function AirtimeCard({ data, onSelectAmount }: AirtimeCardProps) {
  const denominations = data?.denominations || DEFAULT_DENOMINATIONS
  const balance = data?.balance ?? 855.08
  const phone = data?.defaultPhone || '+251 905410217'

  const [selectedAmount, setSelectedAmount] = useState<number>(100)

  const handleSelect = (amount: number) => {
    setSelectedAmount(amount)
    if (onSelectAmount) {
      onSelectAmount(amount)
    }
  }

  const handleProceed = () => {
    Taro.navigateTo({
      url: `/packageAirtime/pages/index?amount=${selectedAmount}&phone=${encodeURIComponent(phone)}`
    })
  }

  return (
    <View className="w-full bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm my-2">
      {/* Header Info */}
      <View className="flex flex-row items-center justify-between pb-2.5 border-b border-gray-100 mb-3">
        <View className="flex flex-col">
          <Text className="text-xs text-gray-500 font-medium">Recipient</Text>
          <Text className="text-sm font-bold text-gray-900 tracking-tight">{phone}</Text>
        </View>
        <View className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <Text className="text-[10px] font-semibold text-[#5ea315]">
            Wallet: {balance.toFixed(2)} ETB
          </Text>
        </View>
      </View>

      {/* Denominations Grid */}
      <Text className="text-xs font-semibold text-gray-800 mb-2">Select Airtime Amount</Text>
      <View className="grid grid-cols-3 gap-2 mb-3">
        {denominations.map(d => {
          const isSelected = selectedAmount === d.amount
          return (
            <View
              key={d.amount}
              onClick={() => handleSelect(d.amount)}
              className={`relative bg-gray-50 rounded-xl py-2 px-1 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[52px] ${
                isSelected
                  ? 'border-2 border-[#76bc21] bg-emerald-50/50 shadow-xs'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              {d.badge && (
                <View className="absolute -top-1.5 left-1 bg-[#f59e0b] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                  {d.badge}
                </View>
              )}
              <View className="flex items-baseline justify-center">
                <Text className="text-sm font-extrabold text-gray-900 mr-0.5">{d.amount}</Text>
                <Text className="text-[9px] text-gray-600 font-normal">ETB</Text>
              </View>
              {d.bonusAmount && (
                <Text className="text-[8px] text-[#5ea315] font-semibold">
                  +{d.bonusAmount} ETB Extra
                </Text>
              )}
            </View>
          )
        })}
      </View>

      {/* One-Tap Action */}
      <View
        onClick={handleProceed}
        className="w-full bg-[#76bc21] active:opacity-90 py-2.5 rounded-xl flex items-center justify-center cursor-pointer shadow-xs"
      >
        <Text className="text-white text-xs font-bold tracking-wide">
          Recharge {selectedAmount}.00 ETB Now
        </Text>
      </View>
    </View>
  )
}

