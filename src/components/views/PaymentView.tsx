import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

import payEthiotel from '../../assets/images/pay_ethiotel.png'
import payElectric from '../../assets/images/pay_electric.png'
import payAawsa from '../../assets/images/pay_aawsa.png'
import payDerash from '../../assets/images/pay_derash.png'
import payWebirr from '../../assets/images/pay_webirr.png'
import payWm from '../../assets/images/pay_wm.png'
import payUnicash from '../../assets/images/pay_unicash.png'
import payEeu from '../../assets/images/pay_eeu.png'
import payWebsprix from '../../assets/images/pay_websprix.png'
import payPalaba from '../../assets/images/pay_palaba.png'

interface PaymentViewProps {
  onBillerSelect: (name: string) => void
}

export default function PaymentView({ onBillerSelect }: PaymentViewProps) {
  // Expanded category IDs (Utility is open by default)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    utility: true
  })

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // 10 Utility Billers matching payment.jpg exactly
  const utilityBillers = [
    { id: 'ethiotel', name: 'Pay Ethio\ntelecom Bill', icon: payEthiotel },
    { id: 'electric', name: 'Electric\nUtility', icon: payElectric },
    { id: 'aawsa', name: 'Addis\nAbaba Wa...', icon: payAawsa },
    { id: 'derash', name: 'Water Utility\nby Derash', icon: payDerash },
    { id: 'webirr', name: 'Water Utility\nby WeBirr', icon: payWebirr },
    { id: 'wm', name: 'W M\nGENERAL T...', icon: payWm },
    { id: 'unicash', name: 'Water utility\nby UniCash', icon: payUnicash },
    { id: 'eeu', name: 'Ethiopian\nElectric Utili...', icon: payEeu },
    { id: 'websprix', name: 'WebSprix', icon: payWebsprix },
    { id: 'palaba', name: 'Water utility\nby palaba', icon: payPalaba }
  ]

  // Accordion Categories matching payment.jpg
  const categories = [
    {
      id: 'tax_gov',
      title: 'Tax and Goverment Service',
      items: [
        { name: 'Ministry of\nRevenue (MOR)', icon: payWm },
        { name: 'Traffic\nFine Payment', icon: payDerash },
        { name: 'Document\nAuthentication', icon: payUnicash },
        { name: 'City Admin\nService', icon: payEeu }
      ]
    },
    {
      id: 'mesob',
      title: 'MESOB One-stop Service Center',
      items: [
        { name: 'MESOB\nCivil Service', icon: payEthiotel },
        { name: 'MESOB\nBusiness Reg', icon: payWebirr }
      ]
    },
    {
      id: 'transport',
      title: 'Transport Service',
      items: [
        { name: 'Ethio-Djibouti\nRailway', icon: payElectric },
        { name: 'Anbessa Bus\nTicketing', icon: payPalaba },
        { name: 'Sheger Bus\nPay', icon: payWebsprix },
        { name: 'Fuel Pay\nat Station', icon: payAawsa }
      ]
    },
    {
      id: 'entertainment',
      title: 'Entertainment Service',
      items: [
        { name: 'DStv\nSubscription', icon: payWebsprix },
        { name: 'Canal+\nPayment', icon: payDerash },
        { name: 'HabeshaView\nVIP', icon: payUnicash }
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      items: [
        { name: 'Zemen GEBEYA\nStore', icon: payWm },
        { name: 'Ashewa\nMarketplace', icon: payWebirr },
        { name: 'Deliver Addis\nFood', icon: payEthiotel }
      ]
    },
    {
      id: 'events',
      title: 'Event and Ticketing',
      items: [
        { name: 'Great Ethiopian\nRun', icon: payEeu },
        { name: 'Millennium Hall\nEvents', icon: payAawsa },
        { name: 'Cinema Hall\nTickets', icon: payPalaba }
      ]
    }
  ]

  return (
    <View className="w-full px-3 py-3 pb-24 space-y-2.5">
      {/* 1. Utility Category (Active / Expanded Blue Bar) */}
      <View className="w-full rounded-2xl overflow-hidden telebirr-card-shadow bg-white">
        {/* Blue Header Bar */}
        <View
          onClick={() => toggleCategory('utility')}
          className="w-full px-4 py-3 flex flex-row items-center justify-between cursor-pointer"
          style={{ backgroundColor: '#0084ff' }}
        >
          <Text className="text-white font-bold text-lg">Utility</Text>
          <View style={{ transform: expandedCategories['utility'] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <MauiIcon name="arrow" size="14px" color="#ffffff" />
          </View>
        </View>

        {/* Expanded Grid of 10 Utility Billers */}
        {expandedCategories['utility'] && (
          <View className="p-3 bg-white">
            <View className="grid grid-cols-4 gap-y-4 gap-x-2">
              {utilityBillers.map((biller) => (
                <View
                  key={biller.id}
                  onClick={() => onBillerSelect(biller.name.replace('\n', ' '))}
                  className="flex flex-col items-center justify-start cursor-pointer active:opacity-75"
                >
                  <View className="w-12 h-12 rounded-full flex items-center justify-center mb-1">
                    <Image
                      src={biller.icon}
                      mode="aspectFit"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </View>
                  <Text className="text-gray-800 text-xs font-semibold text-center leading-tight whitespace-pre-line">
                    {biller.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* 2. Other Categories (Accordion Items) */}
      {categories.map((cat) => {
        const isExpanded = !!expandedCategories[cat.id]

        return (
          <View
            key={cat.id}
            className="w-full rounded-2xl overflow-hidden telebirr-card-shadow bg-white mb-2.5"
          >
            {/* Header row */}
            <View
              onClick={() => toggleCategory(cat.id)}
              className="w-full px-4 py-3.5 flex flex-row items-center justify-between cursor-pointer bg-white active:bg-gray-50"
            >
              <Text className="text-gray-900 font-bold text-base">
                {cat.title}
              </Text>
              <View style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <MauiIcon name="arrow" size="14px" color="#9ca3af" />
              </View>
            </View>

            {/* Expandable Content Grid */}
            {isExpanded && (
              <View className="p-3 pt-1 border-t border-gray-100 bg-white">
                <View className="grid grid-cols-4 gap-y-4 gap-x-2">
                  {cat.items.map((item, idx) => (
                    <View
                      key={idx}
                      onClick={() => onBillerSelect(item.name.replace('\n', ' '))}
                      className="flex flex-col items-center justify-start cursor-pointer active:opacity-75"
                    >
                      <View className="w-12 h-12 rounded-full flex items-center justify-center mb-1 bg-gray-50">
                        <Image
                          src={item.icon}
                          mode="aspectFit"
                          style={{ width: '38px', height: '38px' }}
                        />
                      </View>
                      <Text className="text-gray-800 text-xs font-semibold text-center leading-tight whitespace-pre-line">
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}
