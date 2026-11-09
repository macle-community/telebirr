import React, { useState } from 'react'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

import bannerAirtime from '../../assets/images/banner_airtime_micro.png'

interface Denomination {
  amount: number
  badge?: string
  sub?: string
  highlight?: boolean
}

const DENOMINATIONS: Denomination[] = [
  { amount: 5 },
  { amount: 10 },
  { amount: 15 },
  { amount: 25 },
  { amount: 50 },
  { amount: 100, badge: '+30%', sub: 'Frequency 1', highlight: true },
  { amount: 250, badge: '+35%', sub: 'Frequency 1', highlight: true },
  { amount: 500 },
  { amount: 1000 }
]

const PACKAGES = [
  { id: 'p1', name: 'Daily 100MB + 10 Mins', validity: '24 Hours', price: 15, tag: 'Popular' },
  { id: 'p2', name: 'Weekly 1GB Data', validity: '7 Days', price: 75, tag: 'Best Value' },
  { id: 'p3', name: 'Monthly 5GB + 200 Mins', validity: '30 Days', price: 350, tag: 'Recommended' },
  { id: 'p4', name: 'Unlimited Night Internet', validity: '00:00 - 06:00', price: 25, tag: 'Night' }
]

export default function AirtimePackagePage() {
  const [recipientType, setRecipientType] = useState<'self' | 'other'>('self')
  const [phoneNumber, setPhoneNumber] = useState('+251 905410217')
  const [activeTab, setActiveTab] = useState<'airtime' | 'package'>('airtime')
  const [selectedAmount, setSelectedAmount] = useState<number>(100)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [selectedPkgId, setSelectedPkgId] = useState<string>('p1')
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSelectDenomination = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e: any) => {
    const val = e.detail ? e.detail.value : e.target.value
    setCustomAmount(val)
    if (val) {
      setSelectedAmount(Number(val) || 0)
    }
  }

  const handleBack = () => {
    Taro.navigateBack({
      fail: () => {
        Taro.redirectTo({ url: '/pages/home/index' })
      }
    })
  }

  const handleConfirmPay = () => {
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setShowConfirm(false)
      Taro.showToast({
        title: 'Recharge Successful!',
        icon: 'success'
      })
    }, 1200)
  }

  return (
    <View className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans pb-10">
      {/* Status Bar */}
      <View className="h-6 bg-white w-full flex items-center justify-between px-4 text-[11px] font-semibold text-gray-800 select-none">
        <Text>11:39</Text>
        <View className="flex items-center gap-1.5">
          <Text className="text-[10px]">4G</Text>
          <Text>73%</Text>
        </View>
      </View>

      {/* Navigation Header */}
      <View className="h-12 bg-white px-4 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <View className="flex items-center gap-2">
          <View 
            onClick={handleBack} 
            className="w-8 h-8 flex items-center justify-center -ml-1 text-gray-700 active:bg-gray-100 rounded-full cursor-pointer"
          >
            <MauiIcon name="arrowleft" size="18px" color="#111827" />
          </View>
          <Text className="text-[15px] font-semibold text-gray-900 tracking-tight">Airtime/Package</Text>
        </View>

        {/* Capsule controls */}
        <View className="flex items-center bg-gray-100/90 rounded-full px-2.5 py-1 border border-gray-200">
          <Text className="text-gray-600 text-xs tracking-widest font-mono mr-2">•••</Text>
          <View className="w-px h-3 bg-gray-300 mr-2" />
          <Text onClick={handleBack} className="text-gray-600 text-xs font-semibold cursor-pointer">⦻</Text>
        </View>
      </View>

      <ScrollView scrollY className="flex-1 w-full px-4 pt-3" style={{ boxSizing: 'border-box' }}>
        {/* Promo Banner */}
        <View className="relative w-full rounded-2xl overflow-hidden shadow-xs mb-2 bg-[#1b3a1a]">
          <Image
            src={bannerAirtime}
            mode="widthFix"
            className="w-full block"
          />
        </View>

        {/* Slider Indicator */}
        <View className="flex items-center justify-center gap-1.5 mb-4">
          <View className="w-4 h-1.5 bg-[#76bc21] rounded-full" />
          <View className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        </View>

        {/* Recipient Selection */}
        <View className="flex flex-row items-center justify-between mb-3">
          <View className="flex flex-row items-center gap-2">
            <View
              onClick={() => {
                setRecipientType('self')
                setPhoneNumber('+251 905410217')
              }}
              className={`px-4 py-1 rounded-md text-xs font-medium cursor-pointer transition ${
                recipientType === 'self'
                  ? 'bg-[#76bc21] text-white shadow-2xs'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              Self
            </View>
            <View
              onClick={() => {
                setRecipientType('other')
                setPhoneNumber('+251 9')
              }}
              className={`px-4 py-1 rounded-md text-xs font-medium cursor-pointer transition ${
                recipientType === 'other'
                  ? 'bg-[#76bc21] text-white shadow-2xs'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              Other
            </View>
          </View>

          {/* Contact Book Icon */}
          <View 
            onClick={() => {
              setRecipientType('other')
              setPhoneNumber('+251 911234567')
            }}
            className="w-8 h-7 bg-white border border-gray-200 rounded-md flex items-center justify-center cursor-pointer active:bg-gray-50 shadow-2xs"
          >
            <MauiIcon name="add" size="18px" color="#76bc21" />
          </View>
        </View>

        {/* Recipient Phone Field */}
        <View className="mb-3.5">
          {recipientType === 'self' ? (
            <View className="border-b border-[#8dc73f]/60 pb-1.5">
              <Text className="text-lg font-bold tracking-normal text-gray-900">{phoneNumber}</Text>
            </View>
          ) : (
            <View className="border-b border-[#76bc21] pb-1 flex items-center">
              <Input
                type="text"
                value={phoneNumber}
                onInput={(e: any) => setPhoneNumber(e.detail ? e.detail.value : e.target.value)}
                placeholder="Enter 9 digits"
                className="w-full text-lg font-bold tracking-normal text-gray-900 bg-transparent outline-none"
              />
            </View>
          )}
        </View>

        {/* Segmented Control: Airtime vs Package */}
        <View className="bg-[#e4edd2] p-0.5 rounded-lg flex flex-row mb-3.5">
          <View
            onClick={() => setActiveTab('airtime')}
            className={`flex-1 py-1.5 text-center text-xs font-medium rounded-md cursor-pointer transition ${
              activeTab === 'airtime'
                ? 'bg-[#76bc21] text-white shadow-2xs'
                : 'text-gray-700'
            }`}
          >
            Airtime
          </View>
          <View
            onClick={() => setActiveTab('package')}
            className={`flex-1 py-1.5 text-center text-xs font-medium rounded-md cursor-pointer transition ${
              activeTab === 'package'
                ? 'bg-[#76bc21] text-white shadow-2xs'
                : 'text-gray-700'
            }`}
          >
            Package
          </View>
        </View>

        {/* Airtime Denominations */}
        {activeTab === 'airtime' ? (
          <View>
            <Text className="text-xs font-medium text-gray-900 mb-2 block">Select Denomination</Text>

            <View className="grid grid-cols-3 gap-2 mb-4">
              {DENOMINATIONS.map(d => {
                const isSelected = selectedAmount === d.amount && !customAmount
                return (
                  <View
                    key={d.amount}
                    onClick={() => handleSelectDenomination(d.amount)}
                    className={`relative bg-white rounded-lg py-2 px-1 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[56px] ${
                      isSelected
                        ? 'border-2 border-[#f59e0b] shadow-2xs'
                        : d.highlight
                        ? 'border border-[#f59e0b]'
                        : 'border border-gray-200'
                    }`}
                  >
                    {/* Top badge if any */}
                    {d.badge && (
                      <View className="absolute -top-1.5 left-0.5 bg-[#f59e0b] text-white text-[9px] font-medium px-1.5 py-0.2 rounded-full shadow-2xs">
                        {d.badge}
                      </View>
                    )}

                    <View className="flex items-baseline justify-center">
                      <Text className="text-base font-bold text-gray-900 mr-0.5">{d.amount}</Text>
                      <Text className="text-[10px] text-gray-700 font-normal">(ETB)</Text>
                    </View>

                    {d.sub && (
                      <Text className="text-[9px] text-gray-400 font-normal mt-0.5">{d.sub}</Text>
                    )}
                  </View>
                )
              })}
            </View>

            {/* Other Amount */}
            <View className="mb-6">
              <Text className="text-xs font-medium text-gray-900 mb-2 block">Other Amount</Text>
              <View className="bg-white rounded-lg border border-gray-200 px-3 py-2 flex flex-row items-center justify-between">
                <Input
                  type="number"
                  value={customAmount}
                  onInput={handleCustomAmountChange}
                  placeholder="Enter Amount"
                  className="flex-1 text-xs text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                />
                <Text className="text-xs font-normal text-gray-700 ml-2">ETB</Text>
              </View>
            </View>
          </View>
        ) : (
          /* Package Options */
          <View className="space-y-2 mb-6">
            <Text className="text-xs font-medium text-gray-900 mb-2 block">Select Package</Text>
            {PACKAGES.map(pkg => (
              <View
                key={pkg.id}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                  selectedPkgId === pkg.id
                    ? 'border-[#76bc21] bg-emerald-50/40 shadow-2xs'
                    : 'bg-white border-gray-200'
                }`}
              >
                <View>
                  <View className="flex items-center gap-1.5">
                    <Text className="text-xs font-semibold text-gray-900">{pkg.name}</Text>
                    <Text className="bg-[#76bc21]/15 text-[#5ea315] text-[9px] font-medium px-1 py-0.2 rounded">
                      {pkg.tag}
                    </Text>
                  </View>
                  <Text className="text-[10px] text-gray-500 mt-0.5">Validity: {pkg.validity}</Text>
                </View>
                <View className="text-right">
                  <Text className="text-sm font-bold text-[#76bc21]">{pkg.price}</Text>
                  <Text className="text-[9px] text-gray-500 block">ETB</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Next Button */}
        <View className="mt-4 mb-8">
          <View
            onClick={() => setShowConfirm(true)}
            className="w-full bg-[#b8db92] hover:bg-[#a2cb76] active:brightness-95 text-white font-medium py-2.5 rounded-xl text-center text-sm cursor-pointer transition flex items-center justify-center shadow-2xs"
          >
            Next
          </View>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      {showConfirm && (
        <View className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
          <View className="w-full bg-white rounded-t-3xl p-5 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <View className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <Text className="text-base font-bold text-gray-900">Confirm Airtime Recharge</Text>
              <Text onClick={() => setShowConfirm(false)} className="text-gray-400 text-lg cursor-pointer px-2">✕</Text>
            </View>

            <View className="bg-gray-50 rounded-2xl p-4 space-y-2 mb-4 border border-gray-100">
              <View className="flex justify-between items-center text-sm py-1">
                <Text className="text-gray-500">Service</Text>
                <Text className="font-semibold text-gray-900">
                  {activeTab === 'airtime' ? 'Airtime Top-Up' : 'Data/Voice Package'}
                </Text>
              </View>
              <View className="flex justify-between items-center text-sm py-1 border-t border-gray-100">
                <Text className="text-gray-500">Phone Number</Text>
                <Text className="font-mono font-bold text-gray-900">{phoneNumber}</Text>
              </View>
              <View className="flex justify-between items-center text-sm py-1 border-t border-gray-100">
                <Text className="text-gray-500">Payment Account</Text>
                <Text className="font-semibold text-gray-900">telebirr (855.08 ETB)</Text>
              </View>
              <View className="flex justify-between items-center text-sm py-1 border-t border-gray-100">
                <Text className="text-gray-500">Total Amount</Text>
                <Text className="text-lg font-bold text-[#76bc21]">
                  {activeTab === 'airtime' ? `${selectedAmount}.00 ETB` : `${PACKAGES.find(p => p.id === selectedPkgId)?.price}.00 ETB`}
                </Text>
              </View>
            </View>

            <View className="flex gap-3">
              <View
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 text-center rounded-xl bg-gray-100 text-gray-700 font-semibold cursor-pointer"
              >
                Cancel
              </View>
              <View
                onClick={handleConfirmPay}
                className="flex-1 py-3 text-center rounded-xl bg-[#76bc21] text-white font-bold cursor-pointer active:brightness-95 flex items-center justify-center shadow-xs"
              >
                {isSuccess ? 'Processing...' : 'Confirm & Pay'}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

