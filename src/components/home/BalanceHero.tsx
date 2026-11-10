import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

import heroCardBg from '../../assets/images/hero_card_bg.png'
import boltIcon from '../../assets/images/icon_bolt_yellow.png'
import giftIcon from '../../assets/images/icon_gift_yellow.png'

// Pure white eye vector icons (open / closed) for balance privacy toggle
const EYE_OPEN_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMSAxMnM0LTggMTEtOCAxMSA4IDExIDgtNCA4LTExIDgtMTEtOC0xMS04eiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIvPjwvc3ZnPg=='

const EYE_CLOSE_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJNMTcuOTQgMTcuOTRBMTAuMDcgMTAuMDcgMCAwIDEgMTIgMjBjLTcgMC0xMS04LTExLThhMTguNDUgMTguNDUgMCAwIDEgNS4wNi01Ljk0TTkuOSA0LjI0QTkuMTIgOS4xMiAwIDAgMSAxMiA0YzcgMCAxMSA4IDExIDhhMTguNSAxOC41IDAgMCAxLTIuMTYgMy4xOW0tNi43Mi0xLjA3YTMgMyAwIDEgMS00LjI0LTQuMjQiLz48bGluZSB4MT0iMSIgeTE9IjEiIHgyPSIyMyIgeTI9IjIzIi8+PC9zdmc+'

export interface BalanceHeroProps {
  mainBalance?: string
  endekiseBalance?: string
  rewardBalance?: string
  onNavigateHistory: () => void
}

export default function BalanceHero({
  mainBalance = '855.08',
  endekiseBalance = '0.00',
  rewardBalance = '25.50',
  onNavigateHistory
}: BalanceHeroProps) {
  // Main balance starts visible (855.08), sub-balances start masked (******)
  const [showMainBalance, setShowMainBalance] = useState(true)
  const [showEndekise, setShowEndekise] = useState(false)
  const [showReward, setShowReward] = useState(false)

  return (
    <View className="w-full flex-shrink-0 z-20 bg-white px-3.5 pt-0.5 pb-2.5">
      {/* Floating Rounded Green Hero Card */}
      <View
        className="w-full rounded-[24px] overflow-hidden relative select-none"
        style={{
          boxShadow: '0 4px 16px rgba(45, 120, 10, 0.22)',
          aspectRatio: '802 / 368'
        }}
      >
        {/* Flawless Card Background Graphic (gradient, waves, tower, dividers, wallet circle) */}
        <Image
          src={heroCardBg}
          mode="scaleToFill"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Content Layer */}
        <View className="absolute inset-0 w-full h-full flex flex-col justify-between">
          {/* Top Section: Wallet Icon (Click Target) + Main Balance */}
          <View className="w-full flex-1 flex flex-row items-center px-4 pt-1">
            {/* Click target positioned over the frosted wallet circle */}
            <View
              className="flex-shrink-0 cursor-pointer active:opacity-80"
              style={{ width: '56px', height: '56px' }}
              onClick={onNavigateHistory}
            />

            {/* Main Balance Info */}
            <View className="flex-1 flex flex-col justify-center ml-2.5">
              {/* "Balance (ETB)" Label + Open/Closed Eye Toggle */}
              <View
                className="flex flex-row items-center space-x-1.5 cursor-pointer self-start py-0.5 active:opacity-80"
                onClick={() => setShowMainBalance(!showMainBalance)}
              >
                <Text className="text-white text-[13px] font-medium leading-none tracking-wide">
                  Balance (ETB)
                </Text>
                <View className="flex items-center justify-center">
                  <MauiIcon
                    name={showMainBalance ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                    size="15px"
                    color="#ffffff"
                  />
                </View>
              </View>

              {/* Amount Display (Clickable to open Transaction History) */}
              <View
                className="cursor-pointer active:opacity-90 mt-1 self-start"
                onClick={onNavigateHistory}
              >
                <Text
                  className="text-white font-extrabold tracking-tight leading-none"
                  style={{
                    fontSize: showMainBalance ? '34px' : '28px',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {showMainBalance ? mainBalance : '******'}
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom Section: Sub Balances (Endekise & Reward) */}
          <View
            className="w-full flex flex-row items-center"
            style={{ height: '36.4%' }}
          >
            {/* Left Column: Endekise */}
            <View className="flex-1 flex flex-col justify-center pl-4 pr-2">
              <View
                className="flex flex-row items-center space-x-1 cursor-pointer self-start py-0.5 active:opacity-80"
                onClick={() => setShowEndekise(!showEndekise)}
              >
                <Image
                  src={boltIcon}
                  mode="aspectFit"
                  style={{ width: '11px', height: '17px', marginRight: '3px' }}
                />
                <Text className="text-white text-[12px] font-medium leading-none tracking-tight">
                  Endekise (ETB)
                </Text>
                <View className="flex items-center justify-center ml-0.5">
                  <MauiIcon
                    name={showEndekise ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                    size="12px"
                    color="#ffffff"
                  />
                </View>
              </View>
              <Text
                className="text-white font-bold mt-1 self-start leading-none"
                style={{
                  fontSize: showEndekise ? '15px' : '15px',
                  letterSpacing: showEndekise ? 'normal' : '2px',
                  marginLeft: '15px'
                }}
              >
                {showEndekise ? endekiseBalance : '******'}
              </Text>
            </View>

            {/* Right Column: Reward */}
            <View className="flex-1 flex flex-col justify-center pl-3 pr-4">
              <View
                className="flex flex-row items-center space-x-1 cursor-pointer self-start py-0.5 active:opacity-80"
                onClick={() => setShowReward(!showReward)}
              >
                <Image
                  src={giftIcon}
                  mode="aspectFit"
                  style={{ width: '13px', height: '13px', marginRight: '3px' }}
                />
                <Text className="text-white text-[12px] font-medium leading-none tracking-tight">
                  Reward (ETB)
                </Text>
                <View className="flex items-center justify-center ml-0.5">
                  <MauiIcon
                    name={showReward ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                    size="12px"
                    color="#ffffff"
                  />
                </View>
              </View>
              <Text
                className="text-white font-bold mt-1 self-start leading-none"
                style={{
                  fontSize: showReward ? '15px' : '15px',
                  letterSpacing: showReward ? 'normal' : '2px',
                  marginLeft: '17px'
                }}
              >
                {showReward ? rewardBalance : '******'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
