import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { TabType } from './TabBar'
import ethioLogo from '../assets/images/ethio_logo.png'
import telebirrLogo from '../assets/images/telebirr_logo.png'
import userAvatar from '../assets/images/home_user_avatar.png'
import iconSearchWhite from '../assets/images/icon_search_white.png'
import iconBellWhite from '../assets/images/icon_bell_white.png'
import iconMenuWhite from '../assets/images/icon_menu_white.png'
import iconSearchHeader from '../assets/images/icon_search_header.png'

interface HeaderProps {
  activeTab: TabType
  language: string
  onLanguageToggle: () => void
  onSearchClick: () => void
  onNotificationClick: () => void
  onMenuClick: () => void
}

export default function Header({
  activeTab,
  language,
  onLanguageToggle,
  onSearchClick,
  onNotificationClick,
  onMenuClick
}: HeaderProps) {
  return (
    <View className="w-full select-none" style={{ backgroundColor: activeTab === 'home' ? '#ffffff' : '#76bc21' }}>
      {/* 1. Android Status Bar Simulation */}
      <View
        className="w-full flex flex-row items-center justify-between px-4 pt-1"
        style={{
          height: '24px',
          color: activeTab === 'home' ? '#111827' : '#ffffff',
          fontSize: '11px',
          backgroundColor: activeTab === 'home' ? '#ffffff' : '#76bc21'
        }}
      >
        {/* Left: Time and app icons */}
        <View className="flex flex-row items-center space-x-1.5">
          <Text className="font-semibold">11:07</Text>
          <Text style={{ fontSize: '10px' }}>🔔</Text>
          <Text style={{ fontSize: '10px' }}>⚠️</Text>
        </View>

        {/* Right: Network, 4G, battery */}
        <View className="flex flex-row items-center space-x-2">
          <Text style={{ fontSize: '10px' }}>📶 4G</Text>
          <Text style={{ fontSize: '10px' }}>📶</Text>
          <Text className="font-medium">20% 🔋</Text>
        </View>
      </View>

      {/* 2. Tab Specific Header */}
      {activeTab === 'home' ? (
        <View className="w-full">
          {/* Top Brand Bar: Ethio Telecom & telebirr */}
          <View className="w-full flex flex-row items-center justify-between px-3 py-2 bg-white">
            <Image
              src={ethioLogo}
              mode="aspectFit"
              style={{ width: '130px', height: '34px' }}
            />
            <Image
              src={telebirrLogo}
              mode="aspectFit"
              style={{ width: '90px', height: '34px' }}
            />
          </View>

          {/* User Profile Bar on green background */}
          <View
            className="w-full flex flex-row items-center justify-between px-4 py-2.5"
            style={{ backgroundColor: '#76bc21' }}
          >
            {/* User Greeting */}
            <View className="flex flex-row items-center space-x-2.5">
              <View className="w-8 h-8 rounded-full overflow-hidden border border-white/40 flex items-center justify-center bg-white/20">
                <Image
                  src={userAvatar}
                  mode="aspectFill"
                  style={{ width: '32px', height: '32px' }}
                />
              </View>
              <Text className="text-white font-medium text-sm tracking-wide">
                Selam, Natnael
              </Text>
            </View>

            {/* Header Action Icons */}
            <View className="flex flex-row items-center space-x-2.5">
              <View onClick={onSearchClick} className="cursor-pointer flex items-center justify-center">
                <Image
                  src={iconSearchWhite}
                  mode="aspectFit"
                  style={{ width: '22px', height: '22px' }}
                />
              </View>
              <View onClick={onNotificationClick} className="cursor-pointer flex items-center justify-center">
                <Image
                  src={iconBellWhite}
                  mode="aspectFit"
                  style={{ width: '22px', height: '22px' }}
                />
              </View>
              <View
                onClick={onLanguageToggle}
                className="flex flex-row items-center space-x-1 cursor-pointer bg-white/10 px-2 py-0.5 rounded"
              >
                <Text className="text-white text-xs font-medium">{language}</Text>
                <Text className="text-white text-xs">▼</Text>
              </View>
            </View>
          </View>
        </View>
      ) : activeTab === 'engage' ? (
        /* Engage Header with Menu Icon */
        <View
          className="w-full flex flex-row items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: '#76bc21', height: '48px' }}
        >
          <View onClick={onMenuClick} className="cursor-pointer flex items-center justify-center">
            <Image
              src={iconMenuWhite}
              mode="aspectFit"
              style={{ width: '24px', height: '24px' }}
            />
          </View>
          <Text className="text-white font-semibold text-base tracking-wide">
            Engage
          </Text>
          <View onClick={onSearchClick} className="cursor-pointer flex items-center justify-center">
            <Image
              src={iconSearchHeader}
              mode="aspectFit"
              style={{ width: '24px', height: '24px' }}
            />
          </View>
        </View>
      ) : (
        /* Standard Header for Payment, Apps, Account */
        <View
          className="w-full flex flex-row items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: '#76bc21', height: '48px' }}
        >
          <View style={{ width: '24px' }} />
          <Text className="text-white font-semibold text-base tracking-wide capitalize">
            {activeTab}
          </Text>
          <View onClick={onSearchClick} className="cursor-pointer flex items-center justify-center">
            <Image
              src={iconSearchHeader}
              mode="aspectFit"
              style={{ width: '24px', height: '24px' }}
            />
          </View>
        </View>
      )}
    </View>
  )
}
