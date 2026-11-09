import React, { useState } from 'react'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'

import bannerFayda from '../../assets/images/banner_fayda.png'
import iconScan from '../../assets/images/icon_scan_qr_input.png'
import iconContacts from '../../assets/images/icon_contacts_input.png'
import iconTrash from '../../assets/images/icon_trash_recent.png'

import avatarAbebe from '../../assets/images/avatar_abebe.png'
import avatarYared from '../../assets/images/avatar_yared.png'
import avatarYellow from '../../assets/images/avatar_yellow_user.png'

interface RecentContact {
  id: string
  name: string
  phone: string
  avatar: string
  isPhoto?: boolean
}

const INITIAL_RECENTS: RecentContact[] = [
  { id: '1', name: 'Abebe', phone: '+251 911 234 567', avatar: avatarAbebe, isPhoto: true },
  { id: '2', name: 'Mekonen', phone: '+251 912 345 678', avatar: avatarYellow },
  { id: '3', name: 'Yared', phone: '+251 913 456 789', avatar: avatarYared, isPhoto: true },
  { id: '4', name: 'Fseha', phone: '+251 914 567 890', avatar: avatarYellow },
  { id: '5', name: 'tesfay', phone: '+251 915 678 901', avatar: avatarYellow },
  { id: '6', name: 'Kidanu', phone: '+251 916 789 012', avatar: avatarYellow },
  { id: '7', name: 'ALEM', phone: '+251 917 890 123', avatar: avatarYellow }
]

export default function SendMoneyIndividualPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedContact, setSelectedContact] = useState<RecentContact | null>(null)
  const [recents, setRecents] = useState<RecentContact[]>(INITIAL_RECENTS)
  const [showTransferSheet, setShowTransferSheet] = useState(false)
  const [transferAmount, setTransferAmount] = useState('50')
  const [remark, setRemark] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)

  const isFormValid = phoneNumber.trim().length >= 9

  const handleBack = () => {
    Taro.navigateBack({
      fail: () => {
        Taro.redirectTo({ url: '/pages/home/index' })
      }
    })
  }

  const handleSelectContact = (contact: RecentContact) => {
    setSelectedContact(contact)
    // Extract raw digits after +251
    const raw = contact.phone.replace('+251', '').replace(/\s+/g, '')
    setPhoneNumber(raw)
  }

  const handleClearRecents = () => {
    Taro.showModal({
      title: 'Clear Recents',
      content: 'Are you sure you want to clear your recent contacts?',
      success: (res) => {
        if (res.confirm) {
          setRecents([])
        }
      }
    })
  }

  const handleNextClick = () => {
    if (!isFormValid) return
    setShowTransferSheet(true)
  }

  const handleExecuteTransfer = () => {
    setIsTransferring(true)
    setTimeout(() => {
      setIsTransferring(false)
      setShowTransferSheet(false)
      Taro.showToast({
        title: 'Transfer Sent!',
        icon: 'success'
      })
      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/transaction-history/index' })
      }, 1000)
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
        <View className="flex items-center gap-3">
          <View
            onClick={handleBack}
            className="w-8 h-8 flex items-center justify-center -ml-1 text-gray-800 active:bg-gray-100 rounded-full cursor-pointer text-xl font-bold"
          >
            ←
          </View>
          <Text className="text-base font-bold text-gray-900 tracking-tight">Send Money to Individual</Text>
        </View>

        {/* Capsule controls */}
        <View className="flex items-center bg-gray-100/90 rounded-full px-2.5 py-1 border border-gray-200">
          <Text className="text-gray-600 text-xs tracking-widest font-mono mr-2">•••</Text>
          <View className="w-px h-3 bg-gray-300 mr-2" />
          <Text onClick={handleBack} className="text-gray-600 text-xs font-semibold cursor-pointer">⦻</Text>
        </View>
      </View>

      <ScrollView scrollY className="flex-1 px-4 pt-3">
        {/* Banner */}
        <View className="relative w-full rounded-2xl overflow-hidden shadow-xs mb-2 bg-[#0d4f6c]">
          <Image
            src={bannerFayda}
            mode="widthFix"
            className="w-full block"
          />
        </View>

        {/* Slider Indicator */}
        <View className="flex items-center justify-center gap-1.5 mb-3.5">
          <View className="w-4 h-1.5 bg-[#76bc21] rounded-full" />
          <View className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        </View>

        {/* Mobile Number Card */}
        <View className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 mb-5">
          <Text className="text-sm text-gray-700 font-medium mb-3 block">Please Enter Mobile Number</Text>

          {/* Input Box */}
          <View className="border-2 border-[#76bc21] rounded-xl px-3.5 py-2.5 flex items-center justify-between mb-4 bg-white">
            <View className="flex items-center flex-1 mr-2">
              <Text className="text-base font-bold text-gray-900 mr-2 select-none">+251</Text>
              <Input
                type="number"
                maxlength={9}
                value={phoneNumber}
                onInput={(e: any) => {
                  setPhoneNumber(e.detail ? e.detail.value : e.target.value)
                  setSelectedContact(null)
                }}
                placeholder="9..."
                className="flex-1 text-base font-semibold text-gray-900 bg-transparent outline-none"
              />
            </View>

            {/* Icons: Scanner + Contacts */}
            <View className="flex items-center gap-2.5">
              <View 
                onClick={() => {
                  Taro.showToast({ title: 'Opening scanner...', icon: 'none' })
                }}
                className="w-7 h-7 flex items-center justify-center cursor-pointer active:scale-95"
              >
                <Image src={iconScan} className="w-5 h-5 object-contain" />
              </View>
              <View 
                onClick={() => {
                  if (recents.length > 0) handleSelectContact(recents[0])
                }}
                className="w-7 h-7 flex items-center justify-center cursor-pointer active:scale-95"
              >
                <Image src={iconContacts} className="w-5 h-5 object-contain" />
              </View>
            </View>
          </View>

          {/* Next Button */}
          <View
            onClick={handleNextClick}
            className={`w-full py-3.5 rounded-xl text-center font-bold text-base transition shadow-2xs ${
              isFormValid
                ? 'bg-[#0084ff] text-white cursor-pointer active:brightness-95'
                : 'bg-[#cfe4f9] text-white cursor-not-allowed'
            }`}
          >
            Next
          </View>
        </View>

        {/* Recent Section */}
        <View className="mb-6">
          <View className="flex items-center justify-between mb-2.5 px-1">
            <Text className="text-sm font-bold text-gray-800">Recent</Text>
            {recents.length > 0 && (
              <View 
                onClick={handleClearRecents}
                className="w-6 h-6 flex items-center justify-center cursor-pointer active:opacity-70"
              >
                <Image src={iconTrash} className="w-4 h-4 object-contain" />
              </View>
            )}
          </View>

          {recents.length === 0 ? (
            <View className="bg-white rounded-2xl p-6 text-center text-gray-400 text-sm border border-gray-100">
              No recent transactions
            </View>
          ) : (
            <View className="bg-white rounded-2xl shadow-xs border border-gray-100 divide-y divide-gray-100 overflow-hidden">
              {recents.map(contact => (
                <View
                  key={contact.id}
                  onClick={() => handleSelectContact(contact)}
                  className="px-4 py-3.5 flex items-center justify-between cursor-pointer active:bg-gray-50 transition"
                >
                  <View className="flex items-center gap-3">
                    <Image
                      src={contact.avatar}
                      className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200"
                    />
                    <View>
                      <Text className="text-sm font-bold text-gray-900 block">{contact.name}</Text>
                      <Text className="text-xs text-gray-500 font-mono">{contact.phone}</Text>
                    </View>
                  </View>

                  <Text className="text-gray-300 text-base font-bold">›</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Transfer Amount Bottom Sheet */}
      {showTransferSheet && (
        <View className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
          <View className="w-full bg-white rounded-t-3xl p-5 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <View className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <Text className="text-base font-bold text-gray-900">Transfer Details</Text>
              <Text onClick={() => setShowTransferSheet(false)} className="text-gray-400 text-lg cursor-pointer px-2">✕</Text>
            </View>

            {/* Recipient summary */}
            <View className="bg-[#f4f6f8] rounded-xl p-3 flex items-center gap-3 mb-4">
              <View className="w-10 h-10 rounded-full bg-[#76bc21]/20 flex items-center justify-center font-bold text-[#5ea315]">
                {selectedContact ? selectedContact.name[0] : '👤'}
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900">
                  {selectedContact ? selectedContact.name : `+251 ${phoneNumber}`}
                </Text>
                <Text className="text-xs text-gray-500 font-mono">
                  +251 {phoneNumber}
                </Text>
              </View>
            </View>

            {/* Amount Input */}
            <View className="mb-4">
              <Text className="text-xs text-gray-600 font-semibold mb-1.5 block">Transfer Amount (ETB)</Text>
              <View className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                <Input
                  type="number"
                  value={transferAmount}
                  onInput={(e: any) => setTransferAmount(e.detail ? e.detail.value : e.target.value)}
                  placeholder="0.00"
                  className="text-2xl font-bold text-gray-900 flex-1 bg-transparent outline-none"
                />
                <Text className="text-sm font-bold text-gray-500">ETB</Text>
              </View>

              {/* Quick amounts */}
              <View className="flex gap-2 mt-2.5">
                {['25', '50', '100', '250', '500'].map(amt => (
                  <View
                    key={amt}
                    onClick={() => setTransferAmount(amt)}
                    className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg border cursor-pointer transition ${
                      transferAmount === amt
                        ? 'border-[#76bc21] bg-[#76bc21]/10 text-[#5ea315]'
                        : 'border-gray-200 text-gray-600 bg-white'
                    }`}
                  >
                    {amt}
                  </View>
                ))}
              </View>
            </View>

            {/* Remark */}
            <View className="mb-5">
              <Text className="text-xs text-gray-600 font-semibold mb-1.5 block">Remark (Optional)</Text>
              <Input
                type="text"
                value={remark}
                onInput={(e: any) => setRemark(e.detail ? e.detail.value : e.target.value)}
                placeholder="e.g. Lunch, Coffee, Gift"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 bg-white outline-none"
              />
            </View>

            {/* CTA */}
            <View className="flex gap-3">
              <View
                onClick={() => setShowTransferSheet(false)}
                className="flex-1 py-3 text-center rounded-xl bg-gray-100 text-gray-700 font-semibold cursor-pointer"
              >
                Cancel
              </View>
              <View
                onClick={handleExecuteTransfer}
                className="flex-1 py-3 text-center rounded-xl bg-[#0084ff] text-white font-bold cursor-pointer active:brightness-95 flex items-center justify-center shadow-xs"
              >
                {isTransferring ? 'Sending...' : `Send ${transferAmount} ETB`}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

