/**
 * WeChat Mini Program AI Development Mode - buyAirtime Skill Entrypoint
 * Specification: https://developers.weixin.qq.com/miniprogram/dev/ai/guide.html
 */

import { ModelContextSkill, ModelContextResponse } from './types'
import { queryAirtimeOptions, QueryAirtimeOptionsParams } from './apis/queryAirtimeOptions'
import { queryPackages, QueryPackagesParams } from './apis/queryPackages'
import { validateRecipient, ValidateRecipientParams } from './apis/validateRecipient'
import { createAirtimeOrder, CreateAirtimeOrderParams } from './apis/createAirtimeOrder'
import { payAirtimeOrder, PayAirtimeOrderParams } from './apis/payAirtimeOrder'

export * from './types'
export { queryAirtimeOptions } from './apis/queryAirtimeOptions'
export { queryPackages } from './apis/queryPackages'
export { validateRecipient } from './apis/validateRecipient'
export { createAirtimeOrder } from './apis/createAirtimeOrder'
export { payAirtimeOrder } from './apis/payAirtimeOrder'

export { default as AirtimeCard } from './components/airtime-card'
export { default as PackageCard } from './components/package-card'
export { default as OrderReceiptCard } from './components/order-receipt-card'

const SKILL_PATH = 'packageAirtime/skills/buyAirtime'
const SKILL_NAME = 'buyAirtime'

// In-memory registry for cross-platform fallback (Simulator, Node, H5, WeChat, Macle)
const apiRegistry = new Map<string, (params: any) => Promise<ModelContextResponse>>()

export function registerLocalAPI(name: string, handler: (params: any) => Promise<ModelContextResponse>) {
  apiRegistry.set(name, handler)
}

export function invokeLocalAPI(name: string, params: any): Promise<ModelContextResponse> {
  const handler = apiRegistry.get(name)
  if (!handler) {
    return Promise.resolve({
      isError: true,
      content: [{ type: 'text', text: `API "${name}" is not registered on skill "${SKILL_NAME}".` }]
    })
  }
  return handler(params)
}

/**
 * Initialize and register the buyAirtime skill with WeChat Mini Program AI runtime
 */
export function initBuyAirtimeSkill(): ModelContextSkill {
  // Check if native wx.modelContext is present
  const wxGlobal = typeof wx !== 'undefined' ? (wx as any) : null
  let skill: ModelContextSkill

  if (wxGlobal && wxGlobal.modelContext && typeof wxGlobal.modelContext.createSkill === 'function') {
    skill = wxGlobal.modelContext.createSkill(SKILL_PATH)
  } else {
    // Simulator & fallback environment implementation
    skill = {
      name: SKILL_NAME,
      path: SKILL_PATH,
      registerAPI(name: string, handler: (params: any) => Promise<ModelContextResponse>) {
        registerLocalAPI(name, handler)
      }
    }
  }

  // 1. Register queryAirtimeOptions
  skill.registerAPI('queryAirtimeOptions', async (params: QueryAirtimeOptionsParams) => {
    return queryAirtimeOptions(params)
  })

  // 2. Register queryPackages
  skill.registerAPI('queryPackages', async (params: QueryPackagesParams) => {
    return queryPackages(params)
  })

  // 3. Register validateRecipient
  skill.registerAPI('validateRecipient', async (params: ValidateRecipientParams) => {
    return validateRecipient(params)
  })

  // 4. Register createAirtimeOrder
  skill.registerAPI('createAirtimeOrder', async (params: CreateAirtimeOrderParams) => {
    return createAirtimeOrder(params)
  })

  // 5. Register payAirtimeOrder
  skill.registerAPI('payAirtimeOrder', async (params: PayAirtimeOrderParams) => {
    return payAirtimeOrder(params)
  })

  return skill
}

// Automatically initialize the skill when imported
export const buyAirtimeSkill = initBuyAirtimeSkill()
export default buyAirtimeSkill

