import React, { useState } from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'

import bannerFayda from '../../assets/images/banner_fayda.png'
import bannerZemen from '../../assets/images/zemen_banner.png'
import bannerFinancial from '../../assets/images/banner_airtime_micro.png'

export interface BannerItem {
  id: string
  image: string
  title: string
  url?: string
}

export interface PromotionalBannerProps {
  banners?: BannerItem[]
  height?: string
  interval?: number
  autoplay?: boolean
  duration?: number
  circular?: boolean
  showDots?: boolean
  onBannerClick?: (item: BannerItem) => void
  className?: string
}

const DEFAULT_BANNERS: BannerItem[] = [
  { id: 'fayda', image: bannerFayda, title: 'FAYDA National ID' },
  { id: 'zemen', image: bannerZemen, title: 'Zemen GEBEYA' },
  { id: 'financial', image: bannerFinancial, title: 'Financial Services' }
]

export default function PromotionalBanner({
  banners = DEFAULT_BANNERS,
  height = '112px',
  interval = 3500,
  autoplay = true,
  duration = 500,
  circular = true,
  showDots = true,
  onBannerClick,
  className = 'w-full px-3 pt-3.5'
}: PromotionalBannerProps) {
  const [current, setCurrent] = useState(0)

  return (
    <View className={className}>
      <View className="w-full rounded-2xl overflow-hidden shadow-xs">
        <Swiper
          className="w-full rounded-2xl overflow-hidden"
          style={{ height }}
          autoplay={autoplay}
          interval={interval}
          duration={duration}
          circular={circular}
          indicatorDots={false}
          onChange={(e) => setCurrent(e.detail.current)}
        >
          {banners.map((item) => (
            <SwiperItem key={item.id} className="w-full h-full">
              <View
                className="w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => onBannerClick && onBannerClick(item)}
              >
                <Image
                  src={item.image}
                  mode="aspectFill"
                  className="w-full h-full block"
                />
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      {/* Animated Pagination Indicators */}
      {showDots && banners.length > 1 && (
        <View className="w-full flex flex-row items-center justify-center space-x-1.5 pt-2">
          {banners.map((item, idx) => (
            <View
              key={item.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-3.5 bg-[#76bc21]'
                  : 'w-1.5 border border-gray-300 bg-transparent'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  )
}

