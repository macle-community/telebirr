import { AirtimeOrder, ModelContextResponse } from '../types'
import { validateRecipient } from './validateRecipient'
import { DEFAULT_PACKAGES } from './queryPackages'

export interface CreateAirtimeOrderParams {
  serviceType: 'airtime' | 'package'
  amount?: number
  packageId?: string
  recipientPhone: string
  recipientType?: 'self' | 'other'
}

export async function createAirtimeOrder(
  params: CreateAirtimeOrderParams
): Promise<ModelContextResponse<AirtimeOrder>> {
  const { serviceType, amount, packageId, recipientPhone, recipientType } = params

  // 1. Validate recipient
  const valRes = await validateRecipient({ phone: recipientPhone, type: recipientType })
  if (valRes.isError || !valRes.structuredContent?.isValid) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Cannot create order: Invalid recipient phone number (${recipientPhone}).`
        }
      ]
    }
  }

  const recipient = valRes.structuredContent
  const orderId = `ORD-AIRTIME-${Date.now().toString(36).toUpperCase()}`
  const userBalance = 855.08

  // 2. Handle Airtime Top-Up
  if (serviceType === 'airtime') {
    const rechargeAmount = amount || 100
    if (rechargeAmount < 5) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: 'Minimum airtime recharge amount is 5.00 ETB.'
          }
        ]
      }
    }

    if (rechargeAmount > userBalance) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Insufficient telebirr balance. Total payable is ${rechargeAmount.toFixed(2)} ETB, but your current balance is ${userBalance.toFixed(2)} ETB. Please cash in first.`
          }
        ]
      }
    }

    // Calculate bonus
    let bonusAmount = 0
    let bonusRate = 0
    if (rechargeAmount === 100) {
      bonusRate = 0.3
      bonusAmount = 30
    } else if (rechargeAmount === 250) {
      bonusRate = 0.35
      bonusAmount = 87.5
    }

    const order: AirtimeOrder = {
      orderId,
      serviceType: 'airtime',
      recipient,
      amount: rechargeAmount,
      bonusAmount,
      totalPayable: rechargeAmount,
      currency: 'ETB',
      status: 'PENDING',
      createdAt: Date.now(),
      paymentAccount: `telebirr (${userBalance.toFixed(2)} ETB)`
    }

    const bonusText =
      bonusAmount > 0
        ? ` (+${bonusRate * 100}% telebirr bonus: ${bonusAmount.toFixed(2)} ETB extra airtime)`
        : ''

    return {
      isError: false,
      content: [
        {
          type: 'text',
          text: `Airtime recharge order created: ${rechargeAmount.toFixed(2)} ETB for ${recipient.formattedPhone}${bonusText}. Total payable: ${rechargeAmount.toFixed(2)} ETB.`
        },
        {
          type: 'card',
          data: order
        }
      ],
      structuredContent: order
    }
  }

  // 3. Handle Package Subscription
  const pkg = DEFAULT_PACKAGES.find(p => p.id === packageId)
  if (!pkg) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Package not found with id "${packageId}". Available package IDs are: ${DEFAULT_PACKAGES.map(p => p.id).join(', ')}.`
        }
      ]
    }
  }

  if (pkg.price > userBalance) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Insufficient balance for package "${pkg.name}". Required: ${pkg.price} ETB, Current balance: ${userBalance.toFixed(2)} ETB.`
        }
      ]
    }
  }

  const order: AirtimeOrder = {
    orderId,
    serviceType: 'package',
    recipient,
    amount: pkg.price,
    totalPayable: pkg.price,
    currency: 'ETB',
    packageDetails: pkg,
    status: 'PENDING',
    createdAt: Date.now(),
    paymentAccount: `telebirr (${userBalance.toFixed(2)} ETB)`
  }

  return {
    isError: false,
    content: [
      {
        type: 'text',
        text: `Package order created: ${pkg.name} (${pkg.price} ETB, ${pkg.validity}) for ${recipient.formattedPhone}. Total payable: ${pkg.price}.00 ETB.`
      },
      {
        type: 'card',
        data: order
      }
    ],
    structuredContent: order
  }
}

