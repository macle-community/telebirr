import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import adImage from '../../assets/images/home_ad_fayda.png'

export interface HomeAdModalProps {
  visible: boolean
  onClose: () => void
  onAdClick?: () => void
}

export default function HomeAdModal({
  visible,
  onClose,
  onAdClick
}: HomeAdModalProps) {
  const [doNotPopupAgain, setDoNotPopupAgain] = useState(false)

  if (!visible) return null

  const handleClose = (e?: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }
    if (doNotPopupAgain) {
      try {
        Taro.setStorageSync('telebirr_dismiss_home_ad', true)
      } catch (err) {
        console.error(err)
      }
    }
    onClose()
  }

  const handleCardClick = (e?: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }
    if (onAdClick) {
      onAdClick()
    } else {
      Taro.showToast({
        title: 'Linking Fayda ID...',
        icon: 'none'
      })
    }
  }

  const handleCheckboxToggle = (e?: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }
    setDoNotPopupAgain((prev) => !prev)
  }

  return (
    <View
      onClick={handleClose}
      className="flex flex-col items-center justify-between py-10 px-6 select-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.62)',
        boxSizing: 'border-box'
      }}
    >
      {/* Top spacer to align ad card vertically as in reference */}
      <View className="flex-1 pointer-events-none" />

      {/* 1. Promotional Ad Card */}
      <View
        onClick={handleCardClick}
        className="relative w-[320px] max-w-[90vw] overflow-hidden rounded-2xl active:opacity-95 transition-transform cursor-pointer"
        style={{
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)'
        }}
      >
        <Image
          src={adImage}
          mode="widthFix"
          style={{ width: '100%', display: 'block', borderRadius: '16px' }}
        />
      </View>

      {/* 2. Circular Close Button below Ad Card */}
      <View
        onClick={handleClose}
        className="mt-5 w-11 h-11 rounded-full border-2 border-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
        style={{
          border: '2px solid #ffffff',
          borderRadius: '50%',
          width: '42px',
          height: '42px',
          backgroundColor: 'transparent'
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: '20px', lineHeight: '1', fontWeight: 300 }}>✕</Text>
      </View>

      <View className="flex-1 pointer-events-none" />

      {/* 3. "do not popup again" Checkbox Row positioned at bottom */}
      <View
        onClick={handleCheckboxToggle}
        className="mb-8 flex flex-row items-center justify-center cursor-pointer select-none py-2 px-4"
      >
        <View
          className="w-4 h-4 rounded flex items-center justify-center mr-2.5"
          style={{
            backgroundColor: doNotPopupAgain ? '#76bc21' : '#ffffff',
            border: doNotPopupAgain ? '1px solid #76bc21' : '1px solid #ffffff',
            borderRadius: '4px'
          }}
        >
          {doNotPopupAgain && (
            <Text style={{ color: '#ffffff', fontSize: '11px', fontWeight: 'bold', lineHeight: '1' }}>
              ✓
            </Text>
          )}
        </View>
        <Text className="text-white text-[13px] font-normal tracking-wide drop-shadow">
          do not popup again
        </Text>
      </View>
    </View>
  )
}
