import React, { useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import ethioLogo from '../../assets/images/ethio_logo.png'
import telebirrLogo from '../../assets/images/telebirr_logo.png'

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('905410217')
  const [language, setLanguage] = useState('English')

  const handleToggleLanguage = () => {
    const next = language === 'English' ? 'አማርኛ' : 'English'
    setLanguage(next)
    Taro.showToast({
      title: `Language: ${next}`,
      icon: 'none'
    })
  }

  const handleNext = () => {
    if (!mobileNumber.trim()) {
      Taro.showToast({
        title: 'Please enter your mobile number',
        icon: 'none'
      })
      return
    }

    Taro.navigateTo({
      url: `/pages/login-finger/index?mobile=${mobileNumber}`
    })
  }

  return (
    <View className="w-full min-h-screen telebirr-login-bg flex flex-col justify-between relative overflow-hidden select-none">
      {/* 1. Header with Status Bar safe area and Brand Logos */}
      <View className="w-full pt-8 px-5">
        <View className="w-full flex flex-row items-center justify-between py-2">
          {/* Left: Ethio Telecom Logo */}
          <View className="flex items-center justify-center">
            <Image
              src={ethioLogo}
              mode="aspectFit"
              style={{ width: '120px', height: '32px' }}
            />
          </View>

          {/* Right: Telebirr Logo */}
          <View className="flex items-center justify-center">
            <Image
              src={telebirrLogo}
              mode="aspectFit"
              style={{ width: '85px', height: '32px' }}
            />
          </View>
        </View>

        {/* Language selector dropdown */}
        <View className="w-full flex flex-row justify-end mt-2">
          <View
            onClick={handleToggleLanguage}
            className="flex flex-row items-center space-x-1 cursor-pointer active:opacity-75 py-1 px-1"
          >
            <Text className="text-gray-900 font-bold text-[14px]">
              {language}
            </Text>
            <Text className="text-gray-900 font-bold text-[11px] ml-1">▼</Text>
          </View>
        </View>
      </View>

      {/* 2. Main Login Form Container */}
      <View className="w-full px-6 flex flex-col items-center flex-1 justify-center -mt-6">
        {/* Welcome SuperApp Title */}
        <Text className="text-[#0084ff] text-[23px] font-bold italic tracking-tight text-center">
          Welcome to telebirr SuperApp!
        </Text>

        {/* All-in-One Subtitle */}
        <Text className="text-[#0084ff] text-[15px] font-semibold tracking-wide text-center mt-2.5">
          All-in-One
        </Text>

        {/* Login Header with green underline */}
        <View className="flex flex-col items-center mt-4">
          <Text className="text-gray-900 text-[26px] font-bold tracking-tight">
            Login
          </Text>
          <View className="w-12 h-1 bg-[#76bc21] rounded-full mt-1.5" />
        </View>

        {/* Form Input Section */}
        <View className="w-full mt-7">
          <Text className="text-gray-500 text-[13px] font-normal mb-2 ml-0.5">
            Mobile Number
          </Text>

          {/* Input field with +251 prefix */}
          <View
            className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 flex flex-row items-center"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)'
            }}
          >
            <Text className="text-gray-900 text-[16px] font-medium mr-2.5 select-none">
              +251
            </Text>
            <Input
              type="number"
              value={mobileNumber}
              onInput={(e) => setMobileNumber(e.detail.value)}
              placeholder="905410217"
              className="flex-1 text-gray-900 text-[16px] font-medium bg-transparent outline-none border-none p-0"
              style={{ fontSize: '16px' }}
            />
          </View>

          {/* Next Button */}
          <View
            onClick={handleNext}
            className="mt-6 w-full bg-[#0084ff] active:bg-[#0074e0] text-white py-3.5 rounded-xl flex items-center justify-center cursor-pointer shadow-sm active:scale-[0.99] transition-transform"
            style={{
              backgroundColor: '#0084ff',
              borderRadius: '12px'
            }}
          >
            <Text className="text-white text-[16px] font-semibold tracking-wide">
              Next
            </Text>
          </View>

          {/* Don't have an account link */}
          <View className="w-full flex flex-row items-center justify-center mt-5 text-center">
            <Text className="text-gray-700 text-[13px]">
              Dont&apos;t have an account?{' '}
            </Text>
            <Text
              onClick={() => {
                Taro.showToast({
                  title: 'Create New Account',
                  icon: 'none'
                })
              }}
              className="text-[#76bc21] text-[13px] font-medium cursor-pointer ml-1 active:opacity-70"
            >
              Create New Account
            </Text>
          </View>

          {/* teleHub & Help links */}
          <View className="w-full flex flex-row items-center justify-between px-10 mt-6">
            <Text
              onClick={() => {
                Taro.showToast({ title: 'teleHub', icon: 'none' })
              }}
              className="text-[#76bc21] text-[15px] font-medium cursor-pointer active:opacity-70"
            >
              teleHub
            </Text>
            <Text
              onClick={() => {
                Taro.showToast({ title: 'Help', icon: 'none' })
              }}
              className="text-[#76bc21] text-[15px] font-medium cursor-pointer active:opacity-70"
            >
              Help
            </Text>
          </View>
        </View>
      </View>

      {/* 3. Footer Section */}
      <View className="w-full pb-6 px-4 flex flex-col items-center">
        <Text
          onClick={() => {
            Taro.showToast({ title: 'Terms and Conditions', icon: 'none' })
          }}
          className="text-[#76bc21] text-[13px] font-medium cursor-pointer active:opacity-70"
        >
          Terms and Conditions
        </Text>
        <Text className="text-gray-400 text-[11px] mt-1 text-center font-normal">
          @2026 Ethio telecom.All rights reserved 1.3.3
        </Text>
        <Text className="text-gray-400 text-[11px] text-center font-normal">
          version
        </Text>
      </View>
    </View>
  )
}

