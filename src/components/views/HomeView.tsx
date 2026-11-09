import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

// QR Scanner vector icon (masked via MAUI Icon)
const SCAN_QR_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiPgogIDxwYXRoIGQ9Ik0gMTgwIDM2MCBWIDI2MCBBIDgwIDgwIDAgMCAxIDI2MCAxODAgSCAzNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJjMmMyYyIgc3Ryb2tlLXdpZHRoPSI4MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPHBhdGggZD0iTSA2NjQgMTgwIEggNzY0IEEgODAgODAgMCAwIDEgODQ0IDI2MCBWIDM2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMmMyYzJjIiBzdHJva2Utd2lkdGg9IjgwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICA8cGF0aCBkPSJNIDE4MCA2NjQgViA3NjQgQSA4MCA4MCAwIDAgMCAyNjAgODQ0IEggMzYwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyYzJjMmMiIHN0cm9rZS13aWR0aD0iODAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik0gNjY0IDg0NCBIIDc2NCBBIDgwIDgwIDAgMCAwIDg0NCA3NjQgViA2NjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJjMmMyYyIgc3Ryb2tlLXdpZHRoPSI4MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPHBhdGggZD0iTSAzMzAgNTAwIFYgMzgwIEEgNzAgNzAgMCAwIDEgNDAwIDMxMCBIIDYyNCBBIDcwIDcwIDAgMCAxIDY5NCAzODAgViA1MDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJjMmMyYyIgc3Ryb2tlLXdpZHRoPSI3MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPHJlY3QgeD0iMjYwIiB5PSI1ODAiIHdpZHRoPSI1MDQiIGhlaWdodD0iOTAiIHJ4PSI0NSIgZmlsbD0iIzJjMmMyYyIvPgo8L3N2Zz4='

import eyeMainIcon from '../../assets/images/icon_eye_main.png'
import eyeEndekiseIcon from '../../assets/images/icon_eye_endekise.png'
import eyeRewardIcon from '../../assets/images/icon_eye_reward.png'
import bannerFayda from '../../assets/images/banner_fayda.png'
import sendMoneyIcon from '../../assets/images/home_send_money.png'
import cashInOutIcon from '../../assets/images/home_cash_inout.png'
import airtimeIcon from '../../assets/images/home_airtime.png'
import zemenLogo from '../../assets/images/logo_zemen.png'
import dashenLogo from '../../assets/images/logo_dashen.png'
import cbeLogo from '../../assets/images/logo_cbe.png'
import siinqeeLogo from '../../assets/images/logo_siinqee.png'
import transferBankIcon from '../../assets/images/home_transfer_bank.png'

import iconSendIndividual from '../../assets/images/icon_send_individual.png'
import iconSendGroup from '../../assets/images/icon_send_group.png'

import srvAwash from '../../assets/images/srv_awash.png'
import srvMerchant from '../../assets/images/srv_merchant.png'
import srvTelev from '../../assets/images/srv_telev.png'
import srvTolo from '../../assets/images/srv_tolo.png'
import srvTraffic from '../../assets/images/srv_traffic.png'
import srvParking from '../../assets/images/srv_parking.png'
import srvFinance from '../../assets/images/srv_finance.png'
import srvMore from '../../assets/images/srv_more.png'

interface HomeViewProps {
  onNavigateHistory: () => void
  onScanQR: () => void
  onQuickAction: (title: string) => void
}

export default function HomeView({
  onNavigateHistory,
  onScanQR,
  onQuickAction
}: HomeViewProps) {
  // Balance visibility toggle states
  const [showMainBalance, setShowMainBalance] = useState(true)
  const [showEndekise, setShowEndekise] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [showSendMoneyModal, setShowSendMoneyModal] = useState(false)

  // Primary 8-grid services (top two rows)
  const topServices = [
    {
      id: 'send_money',
      name: 'Send\nMoney',
      icon: sendMoneyIcon,
      badge: null,
      action: () => setShowSendMoneyModal(true)
    },
    {
      id: 'cash_inout',
      name: 'Cash In/\nOut',
      icon: cashInOutIcon,
      badge: null,
      action: () => onQuickAction('Cash In / Out')
    },
    {
      id: 'airtime',
      name: 'Airtime/Buy\nPackage',
      icon: airtimeIcon,
      badge: 'Up to 35%',
      action: () => {
        Taro.navigateTo({ url: '/packageAirtime/pages/index' })
      }
    },
    {
      id: 'zemen_gebeya',
      name: 'Zemen\nGEBEYA',
      icon: zemenLogo,
      badge: null,
      action: () => onQuickAction('Zemen GEBEYA')
    },
    {
      id: 'dashen',
      name: 'Service with\nDashen',
      icon: dashenLogo,
      badge: null,
      action: () => onQuickAction('Service with Dashen')
    },
    {
      id: 'cbe',
      name: 'Service with\nCBE',
      icon: cbeLogo,
      badge: null,
      action: () => onQuickAction('Service with CBE')
    },
    {
      id: 'siinqee',
      name: 'Service with\nSiinqee',
      icon: siinqeeLogo,
      badge: null,
      action: () => onQuickAction('Service with Siinqee')
    },
    {
      id: 'transfer_bank',
      name: 'Bank\nTransfer',
      icon: transferBankIcon,
      badge: null,
      action: () => onQuickAction('Bank Transfer')
    }
  ]

  // Secondary 8-grid services (from photo_6019429732757213091_y.jpg)
  const lowerServices = [
    {
      id: 'awash',
      name: 'Financial\nService with\nAwash',
      icon: srvAwash,
      action: () => onQuickAction('Financial Service with Awash')
    },
    {
      id: 'merchant',
      name: 'Pay for\nMerchant',
      icon: srvMerchant,
      action: () => onQuickAction('Pay for Merchant')
    },
    {
      id: 'telev',
      name: 'teleEV\nCharging',
      icon: srvTelev,
      action: () => onQuickAction('teleEV Charging')
    },
    {
      id: 'tolo',
      name: 'TOLO\nPayment',
      icon: srvTolo,
      action: () => onQuickAction('TOLO Payment')
    },
    {
      id: 'traffic',
      name: 'AA Traffic\nPenalty\nPayment',
      icon: srvTraffic,
      action: () => onQuickAction('AA Traffic Penalty Payment')
    },
    {
      id: 'parking',
      name: 'AATMA\nParking\nPayment',
      icon: srvParking,
      action: () => onQuickAction('AATMA Parking Payment')
    },
    {
      id: 'financing',
      name: 'tele Device\nFinancing',
      icon: srvFinance,
      action: () => onQuickAction('tele Device Financing')
    },
    {
      id: 'more',
      name: 'More',
      icon: srvMore,
      action: () => onQuickAction('More Services')
    }
  ]

  const handleNavigateIndividual = () => {
    setShowSendMoneyModal(false)
    Taro.navigateTo({ url: '/packageSendMoney/pages/index' })
  }

  const handleNavigateGroup = () => {
    setShowSendMoneyModal(false)
    Taro.showToast({ title: 'Send to Group', icon: 'none' })
  }

  return (
    <View className="w-full pb-36 relative">
      {/* 1. Green Hero & Balance Section */}
      <View
        className="w-full telebirr-header-bg telebirr-wave-texture px-4 pt-2 pb-6 rounded-b-2xl relative"
        style={{
          backgroundColor: '#76bc21',
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.22) 20%, transparent 25%), radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.16) 40%, transparent 45%), radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.12) 60%, transparent 65%), radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08) 80%, transparent 85%)'
        }}
      >
        {/* Main Balance Header */}
        <View className="flex flex-col items-center justify-center pt-1">
          <View
            className="flex flex-row items-center space-x-1.5 cursor-pointer"
            onClick={() => setShowMainBalance(!showMainBalance)}
          >
            <Text className="text-white text-base font-medium tracking-wide">
              Balance (ETB)
            </Text>
            <Image
              src={eyeMainIcon}
              mode="aspectFit"
              style={{ width: '22px', height: '14px' }}
            />
          </View>

          {/* Amount (Clickable to open Transaction History) */}
          <View
            className="cursor-pointer py-1 my-0.5 active:opacity-90"
            onClick={onNavigateHistory}
          >
            <Text className="text-white font-black text-4xl tracking-tight">
              {showMainBalance ? '855.08' : '******'}
            </Text>
          </View>

          {/* Sub Balances: Endekise & Reward */}
          <View className="w-full flex flex-row items-center justify-between px-6 pt-2">
            {/* Endekise */}
            <View className="flex flex-col items-start">
              <View
                className="flex flex-row items-center space-x-1.5 cursor-pointer"
                onClick={() => setShowEndekise(!showEndekise)}
              >
                <Text className="text-white text-sm font-medium">
                  Endekise (ETB)
                </Text>
                <Image
                  src={eyeEndekiseIcon}
                  mode="aspectFit"
                  style={{ width: '18px', height: '13px' }}
                />
              </View>
              <Text className="text-white font-bold text-base mt-0.5">
                {showEndekise ? '0.00' : '******'}
              </Text>
            </View>

            {/* Reward */}
            <View className="flex flex-col items-end">
              <View
                className="flex flex-row items-center space-x-1.5 cursor-pointer"
                onClick={() => setShowReward(!showReward)}
              >
                <Text className="text-white text-sm font-medium">
                  Reward (ETB)
                </Text>
                <Image
                  src={eyeRewardIcon}
                  mode="aspectFit"
                  style={{ width: '18px', height: '13px' }}
                />
              </View>
              <Text className="text-white font-bold text-base mt-0.5">
                {showReward ? '25.50' : '******'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. Orange Banner: ONE APP FOR ALL YOUR NEEDS! */}
      <View className="w-full px-3 -mt-3.5 flex justify-center z-10">
        <View
          className="w-full py-1.5 rounded-full flex items-center justify-center shadow-sm"
          style={{ backgroundColor: '#f9a825' }}
        >
          <Text className="text-white font-bold text-xs tracking-wider uppercase">
            ONE APP FOR ALL YOUR NEEDS!
          </Text>
        </View>
      </View>

      {/* 3. Primary Quick Services (Top 8 Grid) */}
      <View className="w-full px-3 pt-3 relative">
        <View className="grid grid-cols-4 gap-2">
          {topServices.map((item) => (
            <View
              key={item.id}
              onClick={item.action}
              className="relative bg-white rounded-xl py-2 px-1 flex flex-col items-center justify-start telebirr-card-shadow active:bg-gray-50 cursor-pointer min-h-[96px]"
            >
              {/* Optional Up to 35% Badge */}
              {item.badge && (
                <View
                  className="absolute -top-1.5 px-1.5 py-0.5 rounded-full z-10"
                  style={{ backgroundColor: '#f59e0b' }}
                >
                  <Text className="text-white font-bold text-[10px]">
                    {item.badge}
                  </Text>
                </View>
              )}

              {/* Service Icon */}
              <View className="w-9 h-9 flex items-center justify-center mb-1">
                <Image
                  src={item.icon}
                  mode="aspectFit"
                  style={{ width: '32px', height: '32px' }}
                />
              </View>

              {/* Service Label (Multi-line) */}
              <Text className="text-gray-800 text-xs font-semibold text-center leading-tight whitespace-pre-line">
                {item.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Send Money Popup Dialog (photo_6019429732757213092_y.jpg) */}
        {showSendMoneyModal && (
          <View className="fixed inset-0 z-50 bg-black/40 flex items-start justify-start pt-64 pl-4">
            <View className="bg-white rounded-2xl shadow-2xl p-2 w-52 border border-gray-100 animate-in fade-in duration-150">
              {/* To Individual */}
              <View
                onClick={handleNavigateIndividual}
                className="flex items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-50 cursor-pointer transition border-b border-gray-100"
              >
                <Image
                  src={iconSendIndividual}
                  className="w-7 h-7 object-contain"
                />
                <Text className="text-sm font-semibold text-gray-800">To Individual</Text>
              </View>

              {/* To Group */}
              <View
                onClick={handleNavigateGroup}
                className="flex items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-50 cursor-pointer transition"
              >
                <Image
                  src={iconSendGroup}
                  className="w-7 h-7 object-contain"
                />
                <Text className="text-sm font-semibold text-gray-800">To Group</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* 4. FAYDA Promotional Banner */}
      <View className="w-full px-3 pt-3.5">
        <View className="w-full rounded-2xl overflow-hidden shadow-xs bg-[#094668]">
          <Image
            src={bannerFayda}
            mode="widthFix"
            className="w-full block"
          />
        </View>

        {/* Carousel Pagination Dots */}
        <View className="w-full flex flex-row items-center justify-center space-x-1.5 pt-2">
          <View className="w-3.5 h-1.5 rounded-full bg-[#76bc21]" />
          <View className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-transparent" />
        </View>
      </View>

      {/* 5. "Transaction Details >" Link */}
      <View className="w-full px-4 pt-1 flex justify-end">
        <View
          onClick={onNavigateHistory}
          className="flex flex-row items-center space-x-1 py-1 cursor-pointer active:opacity-75"
        >
          <Text className="text-sm font-extrabold text-[#0084ff]">Transaction Details</Text>
          <Text className="text-sm font-extrabold text-[#0084ff]">›</Text>
        </View>
      </View>

      {/* 6. Lower Quick Services (photo_6019429732757213091_y.jpg 8-Grid) */}
      <View className="w-full px-3 pt-1">
        <View className="grid grid-cols-4 gap-2">
          {lowerServices.map((item) => (
            <View
              key={item.id}
              onClick={item.action}
              className="bg-white rounded-xl py-2 px-1 flex flex-col items-center justify-start telebirr-card-shadow active:bg-gray-50 cursor-pointer min-h-[96px]"
            >
              {/* Service Icon */}
              <View className="w-9 h-9 flex items-center justify-center mb-1">
                {item.id === 'more' ? (
                  <MauiIcon name="add" size="28px" color="#76bc21" />
                ) : (
                  <Image
                    src={item.icon}
                    mode="aspectFit"
                    style={{ width: '32px', height: '32px' }}
                  />
                )}
              </View>

              {/* Service Label (Multi-line) */}
              <Text className="text-gray-800 text-xs font-semibold text-center leading-tight whitespace-pre-line">
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 7. Floating Circular Scan QR Action Button (Fixed above TabBar) */}
      <View
        onClick={onScanQR}
        className="fixed right-4 z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition"
        style={{
          bottom: '76px',
          backgroundColor: '#0084ff',
          boxShadow: '0 4px 16px rgba(0, 132, 255, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)'
        }}
      >
        <MauiIcon name={SCAN_QR_ICON} size="30px" color="#ffffff" />
      </View>
    </View>
  )
}
