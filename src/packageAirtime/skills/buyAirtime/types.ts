/**
 * WeChat Mini Program AI Development Mode - Type Definitions
 * Specification: https://developers.weixin.qq.com/miniprogram/dev/ai/guide.html
 */

export interface AirtimeDenomination {
  amount: number
  currency: 'ETB'
  badge?: string
  sub?: string
  bonusRate?: number // e.g. 0.3 for +30%
  bonusAmount?: number // e.g. 30 ETB
  highlight?: boolean
}

export interface AirtimePackage {
  id: string
  name: string
  category: 'daily' | 'weekly' | 'monthly' | 'night'
  validity: string
  price: number
  currency: 'ETB'
  quota: string // e.g. '1GB Data', '5GB + 200 Mins'
  tag: 'Popular' | 'Best Value' | 'Recommended' | 'Night'
  description?: string
}

export interface RecipientInfo {
  phone: string
  formattedPhone: string
  type: 'self' | 'other'
  isValid: boolean
  carrier: 'Ethio Telecom'
}

export interface AirtimeOrder {
  orderId: string
  serviceType: 'airtime' | 'package'
  recipient: RecipientInfo
  amount: number
  bonusAmount?: number
  totalPayable: number
  currency: 'ETB'
  packageDetails?: AirtimePackage
  status: 'PENDING' | 'CONFIRMED' | 'PAID' | 'FAILED'
  createdAt: number
  paymentAccount: string
}

export interface PaymentResult {
  success: boolean
  orderId: string
  transactionId: string
  amount: number
  currency: 'ETB'
  recipientPhone: string
  newBalance: number
  timestamp: string
  message: string
}

export interface ModelContextResponse<T = any> {
  isError: boolean
  content: Array<{
    type: 'text' | 'image' | 'card'
    text?: string
    url?: string
    data?: any
  }>
  structuredContent?: T
}

export interface ModelContextSkill {
  name: string
  path: string
  registerAPI: (name: string, handler: (params: any) => Promise<ModelContextResponse>) => void
  use?: (middleware: any) => void
}

