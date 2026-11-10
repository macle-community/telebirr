import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'
import { TabType } from './TabBar'
import ethioLogo from '../assets/images/ethio_logo.png'
import telebirrLogo from '../assets/images/telebirr_logo.png'
import userAvatarCapsule from '../assets/images/user_avatar_capsule.png'
import headerBellBadge from '../assets/images/header_bell_badge_35.png'

const SEARCH_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik05MDkuNiA4NTQuNUw2NDkgNTk0Yy00LjQtNC40LTEwLjQtNi45LTE2LjctNi45aC0xNi4xYy00Ni4xIDM2LjgtMTA0LjYgNTguOS0xNjguMiA1OC45LTE0NS45IDAtMjY0LTExOC4xLTI2NC0yNjRTMzAxLjkgMTE4IDQ0Ny45IDExOGMxNDUuOSAwIDI2NCAxMTguMSAyNjQgMjY0IDAgNjMuNi0yMi4xIDEyMi4xLTU4LjkgMTY4LjJ2MTYuMWMwIDYuMyAyLjUgMTIuMyA2LjkgMTYuN2wyNjAuNSAyNjAuNWM5LjQgOS40IDI0LjYgOS40IDMzLjkgMGw5LjQtOS40YzkuNC05LjQgOS40LTI0LjYgMC0zMy45ek00NDcuOSA1MjBjOTkuNSAwIDE4MC04MC41IDE4MC0xODBzLTgwLjUtMTgwLTE4MC0xODAtMTgwIDgwLjUtMTgwIDE4MCA4MC41IDE4MCAxODAgMTh6Ii8+PC9zdmc+'

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
    <View
      className="w-full select-none"
      style={{
        backgroundColor: activeTab === 'home' ? '#ffffff' : '#76bc21',
        transition: 'background-color 200ms ease-in-out'
      }}
    >
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
          <View
            className="w-full bg-white flex flex-row items-center justify-between px-4 py-2 border-b border-gray-100"
            style={{ height: '48px' }}
          >
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

          {/* Profile Capsule: Selam, Natnael + Action Icons */}
          <View className="w-full bg-white px-3.5 pt-1.5 pb-2">
            <View
              className="w-full rounded-full flex flex-row items-center justify-between px-2.5 py-1.5"
              style={{ backgroundColor: '#eef7ea' }}
            >
              {/* User Avatar + Greeting */}
              <View className="flex flex-row items-center space-x-2">
                <View className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={userAvatarCapsule}
                    mode="aspectFit"
                    style={{ width: '32px', height: '32px' }}
                  />
                </View>
                <Text className="text-gray-900 font-bold text-base tracking-normal">
                  Selam, Natnael
                </Text>
              </View>

              {/* Header Action Icons */}
              <View className="flex flex-row items-center space-x-2">
                <View
                  onClick={onSearchClick}
                  className="cursor-pointer flex items-center justify-center p-1 active:opacity-75"
                >
                  <MauiIcon name={SEARCH_ICON} size="19px" color="#1f2937" />
                </View>
                <View
                  onClick={onNotificationClick}
                  className="cursor-pointer flex items-center justify-center p-0.5 active:opacity-75"
                >
                  <Image
                    src={headerBellBadge}
                    mode="aspectFit"
                    style={{ width: '24px', height: '22px' }}
                  />
                </View>
                <View className="w-[1px] h-3.5 bg-gray-300 mx-0.5" />
                <View
                  onClick={onLanguageToggle}
                  className="flex flex-row items-center space-x-1 cursor-pointer pr-1"
                >
                  <Text className="text-gray-800 text-xs font-semibold">{language}</Text>
                  <Text className="text-gray-600 text-[10px]">▼</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : activeTab === 'engage' ? (
        /* Engage Header with MAUI Icon */
        <View
          className="w-full flex flex-row items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: '#76bc21', height: '48px' }}
        >
          <View onClick={onMenuClick} className="cursor-pointer flex items-center justify-center active:opacity-80">
            <MauiIcon name="checklist" size="22px" color="#ffffff" />
          </View>
          <Text className="text-white font-bold text-lg tracking-wide">
            Engage
          </Text>
          <View onClick={onSearchClick} className="cursor-pointer flex items-center justify-center active:opacity-80">
            <MauiIcon name={SEARCH_ICON} size="20px" color="#ffffff" />
          </View>
        </View>
      ) : (
        /* Standard Header for Payment, Apps, Account with MAUI Icon */
        <View
          className="w-full flex flex-row items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: '#76bc21', height: '48px' }}
        >
          <View style={{ width: '24px' }} />
          <Text className="text-white font-semibold text-base tracking-wide capitalize">
            {activeTab}
          </Text>
          <View onClick={onSearchClick} className="cursor-pointer flex items-center justify-center active:opacity-80">
            <MauiIcon name={SEARCH_ICON} size="20px" color="#ffffff" />
          </View>
        </View>
      )}
    </View>
  )
}
