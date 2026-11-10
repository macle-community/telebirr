import { AirtimePackage, ModelContextResponse } from '../types'

export const DEFAULT_PACKAGES: AirtimePackage[] = [
  {
    id: 'p1',
    name: 'Daily 100MB + 10 Mins',
    category: 'daily',
    validity: '24 Hours',
    price: 15,
    currency: 'ETB',
    quota: '100MB Data + 10 Voice Mins',
    tag: 'Popular',
    description: 'Perfect for quick daily browsing and essential calls.'
  },
  {
    id: 'p2',
    name: 'Weekly 1GB Data',
    category: 'weekly',
    validity: '7 Days',
    price: 75,
    currency: 'ETB',
    quota: '1GB High Speed Data',
    tag: 'Best Value',
    description: 'Our most popular weekly data bundle with reliable speed.'
  },
  {
    id: 'p3',
    name: 'Monthly 5GB + 200 Mins',
    category: 'monthly',
    validity: '30 Days',
    price: 350,
    currency: 'ETB',
    quota: '5GB Data + 200 Voice Mins',
    tag: 'Recommended',
    description: 'Full monthly freedom for internet access and long phone calls.'
  },
  {
    id: 'p4',
    name: 'Unlimited Night Internet',
    category: 'night',
    validity: '00:00 - 06:00',
    price: 25,
    currency: 'ETB',
    quota: 'Unlimited Night Data',
    tag: 'Night',
    description: 'High-speed unlimited downloading during off-peak night hours.'
  }
]

export interface QueryPackagesParams {
  category?: 'all' | 'daily' | 'weekly' | 'monthly' | 'night'
}

export interface QueryPackagesResult {
  packages: AirtimePackage[]
  total: number
}

export async function queryPackages(
  params?: QueryPackagesParams
): Promise<ModelContextResponse<QueryPackagesResult>> {
  const category = params?.category || 'all'
  const filtered =
    category === 'all'
      ? DEFAULT_PACKAGES
      : DEFAULT_PACKAGES.filter(p => p.category === category)

  const packageSummaries = filtered
    .map(p => `• ${p.name}: ${p.price} ETB (${p.validity})`)
    .join('\n')

  return {
    isError: false,
    content: [
      {
        type: 'text',
        text: `Found ${filtered.length} Ethio Telecom package(s):\n${packageSummaries}`
      },
      {
        type: 'card',
        data: { packages: filtered }
      }
    ],
    structuredContent: {
      packages: filtered,
      total: filtered.length
    }
  }
}

