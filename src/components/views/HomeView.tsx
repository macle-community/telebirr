import React, { useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'

import {
  BalanceHero,
  NeedsBanner,
  ServiceGrid,
  SendMoneyModal,
  PromotionalBanner,
  AIAgentButton
} from '../index'

import sendMoneyIcon from '../../assets/images/home_send_money.png'
import cashInOutIcon from '../../assets/images/home_cash_inout.png'
import airtimeIcon from '../../assets/images/home_airtime.png'
import zemenLogo from '../../assets/images/logo_zemen.png'
import dashenLogo from '../../assets/images/logo_dashen.png'
import cbeLogo from '../../assets/images/logo_cbe.png'
import siinqeeLogo from '../../assets/images/logo_siinqee.png'
import transferBankIcon from '../../assets/images/home_transfer_bank.png'

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
  onOpenAIAgent?: () => void
}

export default function HomeView({
  onNavigateHistory,
  onScanQR,
  onQuickAction,
  onOpenAIAgent
}: HomeViewProps) {
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
    <View className="w-full h-full flex flex-col relative overflow-hidden select-none">
      {/* 1. Green Hero & Balance Section (Docked at top) */}
      <BalanceHero onNavigateHistory={onNavigateHistory} />

      {/* Scrollable Container for Lower Content */}
      <ScrollView
        scrollY
        className="flex-1 w-full overflow-y-auto home-scroll-container"
        style={{ boxSizing: 'border-box' }}
      >
        <View className="w-full pb-36 pt-0">
          {/* 2. Orange Banner: ONE APP FOR ALL YOUR NEEDS! */}
          <NeedsBanner />

          {/* 3. Primary Quick Services (Top 8 Grid) */}
          <ServiceGrid services={topServices} />

          {/* 4. Promotional Banner Slideshow (Auto scroll) */}
          <PromotionalBanner onBannerClick={(b) => onQuickAction(b.title)} />

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

          {/* 6. Lower Quick Services (8-Grid) */}
          <ServiceGrid services={lowerServices} />
        </View>
      </ScrollView>

      {/* Send Money Popup Dialog */}
      <SendMoneyModal
        visible={showSendMoneyModal}
        onClose={() => setShowSendMoneyModal(false)}
        onSelectIndividual={handleNavigateIndividual}
        onSelectGroup={handleNavigateGroup}
      />

      {/* 7. Floating AI Agent Button (Fixed above TabBar matching Telebirr AI Agent Dashboard design) */}
      <AIAgentButton
        onClick={() => {
          if (onOpenAIAgent) {
            onOpenAIAgent()
          } else {
            Taro.navigateTo({ url: '/pages/ai-agent/index' })
          }
        }}
      />
    </View>
  )
}
