export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/payment/index',
    'pages/apps/index',
    'pages/engage/index',
    'pages/account/index',
    'pages/transaction-history/index',
    'pages/login/index',
    'pages/login-finger/index',
    'pages/ai-agent/index',
    'pages/index/index'
  ],
  subPackages: [
    {
      root: 'packageAirtime',
      pages: [
        'pages/index'
      ]
    },
    {
      root: 'packageSendMoney',
      pages: [
        'pages/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#76bc21',
    navigationBarTitleText: 'telebirr',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  },
  agent: {
    instruction: 'src/packageAirtime/skills/buyAirtime/SKILL.md',
    skills: [
      {
        name: 'buyAirtime',
        description: 'Purchase mobile airtime recharge and voice/data/SMS packages for telebirr users',
        path: 'packageAirtime/skills/buyAirtime'
      }
    ]
  } as any
})
