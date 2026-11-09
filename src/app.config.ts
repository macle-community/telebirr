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
  }
})
