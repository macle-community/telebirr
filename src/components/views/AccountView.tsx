import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IconChevronRight } from '../Icons'

import accAvatar from '../../assets/images/acc_avatar.png'
import accQrChevron from '../../assets/images/acc_qr_chevron.png'

import accFayda from '../../assets/images/acc_fayda.png'
import accPin from '../../assets/images/acc_pin.png'
import accLang from '../../assets/images/acc_lang.png'
import accSecurity from '../../assets/images/acc_security.png'
import accBiometric from '../../assets/images/acc_biometric.png'
import accFaq from '../../assets/images/acc_faq.png'
import accFeedback from '../../assets/images/acc_feedback.png'
import accContact from '../../assets/images/acc_contact.png'
import accAbout from '../../assets/images/acc_about.png'
import accShare from '../../assets/images/acc_share.png'
import accCoupon from '../../assets/images/acc_coupon.png'
import accBillshare from '../../assets/images/acc_billshare.png'
import accVerifypay from '../../assets/images/acc_verifypay.png'
import accWifi from '../../assets/images/acc_wifi.png'

interface AccountViewProps {
  language: string
  onLanguageToggle: () => void
  onItemClick: (title: string) => void
  onShowQR: () => void
}

export default function AccountView({
  language,
  onLanguageToggle,
  onItemClick,
  onShowQR
}: AccountViewProps) {
  const accountRows = [
    { id: 'fayda', title: 'Verify/Upgrade with Fayda (NID)', icon: accFayda },
    { id: 'pin', title: 'Change PIN', icon: accPin },
    {
      id: 'language',
      title: 'Change Language',
      icon: accLang,
      value: language,
      customClick: onLanguageToggle
    },
    { id: 'security', title: 'Security Question', icon: accSecurity },
    { id: 'biometric', title: 'Biometric Authentication', icon: accBiometric },
    { id: 'faq', title: 'FAQ', icon: accFaq },
    { id: 'feedback', title: 'Feedback', icon: accFeedback },
    { id: 'contact', title: 'Contact Us', icon: accContact },
    { id: 'about', title: 'About', icon: accAbout },
    { id: 'share', title: 'Share', icon: accShare },
    { id: 'coupon', title: 'My Coupon', icon: accCoupon },
    { id: 'billshare', title: 'Bill Share History', icon: accBillshare },
    { id: 'verifypay', title: 'Verify Payment', icon: accVerifypay },
    { id: 'wifi', title: 'Access on Wi-FI', icon: accWifi }
  ]

  return (
    <View className="w-full px-3 py-3 pb-24 space-y-3">
      {/* 1. User Profile Card */}
      <View className="w-full bg-white rounded-2xl p-4 flex flex-row items-center justify-between telebirr-card-shadow">
        {/* Left: Avatar + Details */}
        <View className="flex flex-row items-center space-x-3">
          <View className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-emerald-100">
            <Image
              src={accAvatar}
              mode="aspectFill"
              style={{ width: '56px', height: '56px' }}
            />
          </View>

          <View className="flex flex-col">
            <Text className="text-gray-900 font-bold text-lg tracking-tight">
              Natnael
            </Text>
            <View className="flex flex-row items-center space-x-2 mt-1">
              {/* Level 3 Badge */}
              <View
                className="px-2 py-0.5 rounded"
                style={{ backgroundColor: '#f59e0b' }}
              >
                <Text className="text-white font-bold text-xs">
                  Level 3
                </Text>
              </View>
              {/* Phone Number */}
              <Text className="text-gray-700 text-sm font-semibold">
                +251905410217
              </Text>
            </View>
          </View>
        </View>

        {/* Right: QR Code icon + Chevron */}
        <View
          onClick={onShowQR}
          className="cursor-pointer active:opacity-70 flex items-center justify-center"
        >
          <Image
            src={accQrChevron}
            mode="aspectFit"
            style={{ width: '60px', height: '32px' }}
          />
        </View>
      </View>

      {/* 2. Menu List Card with Dividers */}
      <View className="w-full bg-white rounded-2xl overflow-hidden telebirr-card-shadow divide-y divide-gray-100">
        {accountRows.map((row) => (
          <View
            key={row.id}
            onClick={() => {
              if (row.customClick) {
                row.customClick()
              } else {
                onItemClick(row.title)
              }
            }}
            className="w-full px-4 py-3.5 flex flex-row items-center justify-between cursor-pointer active:bg-gray-50"
          >
            {/* Left: Icon + Title */}
            <View className="flex flex-row items-center space-x-3.5">
              <View className="w-6 h-6 flex items-center justify-center">
                <Image
                  src={row.icon}
                  mode="aspectFit"
                  style={{ width: '22px', height: '22px' }}
                />
              </View>
              <Text className="text-gray-800 text-base font-semibold">
                {row.title}
              </Text>
            </View>

            {/* Right: Optional value + Chevron */}
            <View className="flex flex-row items-center space-x-1.5">
              {row.value && (
                <Text className="text-gray-400 text-sm font-medium mr-0.5">
                  {row.value}
                </Text>
              )}
              <Text className="text-gray-400 font-bold text-base">›</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
