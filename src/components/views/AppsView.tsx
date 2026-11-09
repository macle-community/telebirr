import React, { useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import { IconSearch } from '../Icons'

import appEthiotel from '../../assets/images/app_ethiotel.png'
import appEthiopianAirlines from '../../assets/images/app_ethiopian_airlines.png'
import appFayda from '../../assets/images/app_fayda.png'
import appEsl from '../../assets/images/app_esl.png'
import appTeninete from '../../assets/images/app_teninete.png'
import appFaydaPrint from '../../assets/images/app_fayda_print.png'
import appDstv from '../../assets/images/app_dstv.png'
import appHowlow from '../../assets/images/app_howlow.png'
import appEservices from '../../assets/images/app_eservices.png'
import appGer from '../../assets/images/app_ger.png'
import appMedhin from '../../assets/images/app_medhin.png'
import appRide from '../../assets/images/app_ride.png'
import appTransport from '../../assets/images/app_transport.png'
import appHuluBeje from '../../assets/images/app_hulu_beje.png'
import appWebsprix from '../../assets/images/app_websprix.png'
import appAshewa from '../../assets/images/app_ashewa.png'
import telebirrLogo from '../../assets/images/telebirr_logo.png'

interface AppsViewProps {
  onAppSelect: (appName: string) => void
}

export default function AppsView({ onAppSelect }: AppsViewProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // 20 Apps matching apps.jpg exactly
  const allApps = [
    { id: 'ethiotel', name: 'My Ethiotel', icon: appEthiotel },
    { id: 'remit', name: 'telebirrRemit', icon: telebirrLogo },
    { id: 'fixed', name: 'tele-Online Fixed\nService', icon: appEthiotel },
    { id: 'airlines', name: 'Ethiopian\nAirlines', icon: appEthiopianAirlines },
    { id: 'fayda', name: 'NID (Fayda)\nDigital ID', icon: appFayda },
    { id: 'esl', name: 'Ethiopian\nShipping and\nLogistics', icon: appEsl },
    { id: 'teninete', name: 'Teninete', icon: appTeninete },
    { id: 'fayda_print', name: 'NID (Fayda)\nprinting', icon: appFaydaPrint },
    { id: 'mydstv', name: 'MyDStv', icon: appDstv },
    { id: 'howlow', name: 'HOWLOW', icon: appHowlow },
    { id: 'sitota', name: 'SITOTA', icon: telebirrLogo },
    { id: 'eservices', name: 'E-Services', icon: appEservices },
    { id: 'ger', name: 'Great Ethiopian\nRun', icon: appGer },
    { id: 'medhin', name: 'Medhin Link', icon: appMedhin },
    { id: 'ride', name: 'RIDE', icon: appRide },
    { id: 'transport', name: 'Public Transport', icon: appTransport },
    { id: 'hulu_beje', name: 'Hulu beje', icon: appHuluBeje },
    { id: 'websprix', name: 'WebSprix', icon: appWebsprix },
    { id: 'zemen', name: 'Zemen Market', icon: appHuluBeje },
    { id: 'ashewa', name: 'ASHEWA', icon: appAshewa }
  ]

  const filteredApps = allApps.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <View className="w-full px-3 py-3 pb-24">
      {/* Search Bar */}
      <View className="w-full mb-3 px-3 py-2 bg-white rounded-xl telebirr-card-shadow flex flex-row items-center space-x-2">
        <IconSearch size={18} color="#9ca3af" />
        <Input
          type="text"
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.detail.value)}
          placeholder="Search mini programs and apps..."
          className="flex-1 text-sm text-gray-800 bg-transparent"
        />
        {searchTerm && (
          <Text
            onClick={() => setSearchTerm('')}
            className="text-xs text-gray-400 font-bold px-1.5 cursor-pointer"
          >
            ✕
          </Text>
        )}
      </View>

      {/* 3-Column Apps Grid */}
      <View className="grid grid-cols-3 gap-2.5">
        {filteredApps.map((app) => (
          <View
            key={app.id}
            onClick={() => onAppSelect(app.name.replace('\n', ' '))}
            className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center telebirr-card-shadow active:bg-gray-50 cursor-pointer min-h-[110px]"
          >
            {/* App Icon Container */}
            <View className="w-12 h-12 flex items-center justify-center mb-2">
              <Image
                src={app.icon}
                mode="aspectFit"
                style={{ width: '42px', height: '42px' }}
              />
            </View>

            {/* App Name */}
            <Text className="text-gray-800 text-xs font-medium text-center leading-tight whitespace-pre-line">
              {app.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

