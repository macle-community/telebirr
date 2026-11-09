import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'

import avatarGoldUser from '../../assets/images/avatar_gold_user.png'
import fingerprintGreen from '../../assets/images/fingerprint_green.png'
import iconArrowBack from '../../assets/images/icon_arrow_back.png'

export default function LoginFingerPage() {
  const router = useRouter()
  const rawMobile = router.params.mobile || '905410217'
  const maskedMobile = `+251****${rawMobile.slice(-2)}`

  const [isVerifying, setIsVerifying] = useState(false)
  const [showToast, setShowToast] = useState(true)

  const handleFingerprintAuth = () => {
    if (isVerifying) return
    setIsVerifying(true)
    Taro.showToast({
      title: 'Verifying fingerprint...',
      icon: 'loading',
      duration: 700
    })

    setTimeout(() => {
      Taro.showToast({
        title: 'Login Successful',
        icon: 'success',
        duration: 700
      })
      setTimeout(() => {
        Taro.reLaunch({ url: '/pages/home/index' })
      }, 600)
    }, 700)
  }

  const handleBack = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  return (
    <View
      className="w-full min-h-screen flex flex-col justify-between relative overflow-hidden select-none"
      style={{ backgroundColor: '#999999' }}
    >
      {/* 1. Header Safe Area with Back Arrow */}
      <View className="w-full pt-8 px-4 flex flex-row items-center">
        <View
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center cursor-pointer active:opacity-60"
        >
          <Image
            src={iconArrowBack}
            mode="aspectFit"
            style={{ width: '22px', height: '22px' }}
          />
        </View>
      </View>

      {/* 2. Central Content Area */}
      <View className="w-full flex-1 flex flex-col items-center justify-center -mt-6 px-6">
        {/* Mustard Gold Avatar Circle with User Silhouette */}
        <View className="w-[74px] h-[74px] flex items-center justify-center">
          <Image
            src={avatarGoldUser}
            mode="aspectFit"
            style={{ width: '74px', height: '74px' }}
          />
        </View>

        {/* Masked Mobile Number */}
        <Text className="text-gray-900 text-[18px] font-semibold mt-3 tracking-tight">
          {maskedMobile}
        </Text>

        {/* Green Fingerprint Sensor Button */}
        <View
          onClick={handleFingerprintAuth}
          className="flex flex-col items-center mt-7 cursor-pointer active:scale-95 transition-transform"
        >
          <View
            className="w-[62px] h-[62px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#e4ece0' }}
          >
            <Image
              src={fingerprintGreen}
              mode="aspectFit"
              style={{ width: '34px', height: '34px' }}
            />
          </View>
          <Text
            className="text-[14px] font-medium mt-2"
            style={{ color: '#5b823e' }}
          >
            Login With Fingerprint
          </Text>
        </View>

        {/* Center White Card with Rotating Green Dot Spinner */}
        <View
          onClick={handleFingerprintAuth}
          className="w-[136px] h-[136px] bg-white rounded-2xl shadow-xl flex items-center justify-center mt-6 cursor-pointer active:scale-95 transition-transform"
          style={{
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
          }}
        >
          <View className="relative w-10 h-10 animate-spin">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <View
                key={deg}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: '#76bc21',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${deg}deg) translate(0, -13px)`,
                  opacity: 0.2 + (i / 8) * 0.8
                }}
              />
            ))}
          </View>
        </View>

        {/* Toast: Can't take screenshots due to security policy */}
        {showToast && (
          <View
            onClick={() => setShowToast(false)}
            className="w-full flex items-center justify-center mt-12 cursor-pointer"
          >
            <View
              className="bg-[#424242] px-6 py-3 rounded-2xl shadow-lg max-w-[85%]"
              style={{ borderRadius: '18px' }}
            >
              <Text className="text-white text-[13.5px] font-normal leading-snug text-center">
                Can&apos;t take screenshots due to security policy.
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* 3. Bottom Option Link */}
      <View
        onClick={() => Taro.navigateTo({ url: '/pages/login/index' })}
        className="w-full pb-8 flex items-center justify-center cursor-pointer active:opacity-70"
      >
        <Text className="text-gray-700 text-[14px] font-normal">
          Log in with another option ›
        </Text>
      </View>
    </View>
  )
}
