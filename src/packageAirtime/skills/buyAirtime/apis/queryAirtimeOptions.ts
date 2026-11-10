import { AirtimeDenomination, ModelContextResponse } from '../types'

export const DEFAULT_DENOMINATIONS: AirtimeDenomination[] = [
  { amount: 5, currency: 'ETB' },
  { amount: 10, currency: 'ETB' },
  { amount: 15, currency: 'ETB' },
  { amount: 25, currency: 'ETB' },
  { amount: 50, currency: 'ETB' },
  {
    amount: 100,
    currency: 'ETB',
    badge: '+30%',
    sub: 'Frequency 1',
    bonusRate: 0.3,
    bonusAmount: 30,
    highlight: true
  },
  {
    amount: 250,
    currency: 'ETB',
    badge: '+35%',
    sub: 'Frequency 1',
    bonusRate: 0.35,
    bonusAmount: 87.5,
    highlight: true
  },
  { amount: 500, currency: 'ETB' },
  { amount: 1000, currency: 'ETB' }
]

export interface QueryAirtimeOptionsParams {
  recipientPhone?: string
}

export interface QueryAirtimeOptionsResult {
  denominations: AirtimeDenomination[]
  balance: number
  defaultPhone: string
  promotions: Array<{ title: string; description: string }>
}

export async function queryAirtimeOptions(
  params?: QueryAirtimeOptionsParams
): Promise<ModelContextResponse<QueryAirtimeOptionsResult>> {
  const currentBalance = 855.08
  const defaultPhone = params?.recipientPhone || '+251 905410217'

  const structuredContent: QueryAirtimeOptionsResult = {
    denominations: DEFAULT_DENOMINATIONS,
    balance: currentBalance,
    defaultPhone,
    promotions: [
      {
        title: 'Airtime Bonus',
        description: 'Recharge 100 ETB get +30% extra airtime, 250 ETB get +35% extra airtime!'
      }
    ]
  }

  const textSummary = `Available airtime denominations: 5, 10, 15, 25, 50, 100 (+30% bonus), 250 (+35% bonus), 500, and 1000 ETB. Your current telebirr balance is ${currentBalance.toFixed(2)} ETB.`

  return {
    isError: false,
    content: [
      {
        type: 'text',
        text: textSummary
      },
      {
        type: 'card',
        data: structuredContent
      }
    ],
    structuredContent
  }
}

