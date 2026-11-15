<template>
  <view class="dashboard">
    <view class="status-bar">
      <text>11:07　🔔</text>
      <text>4G　20% 🔋</text>
    </view>

    <view class="app-header" :class="{ 'home-header': activeTab === 'home' }">
      <template v-if="activeTab === 'home'">
        <view class="brand-row">
          <image class="brand-ethio" src="/static/images/ethio_logo.png" mode="aspectFit" />
          <image class="brand-telebirr" src="/static/images/telebirr_logo.png" mode="aspectFit" />
        </view>
        <view class="profile-strip">
          <image class="profile-avatar" src="/static/images/user_avatar_capsule.png" mode="aspectFit" />
          <text class="profile-greeting">Selam, Natnael</text>
          <view class="header-actions">
            <text @click="showToast('Search')">⌕</text>
            <text @click="showToast('Notifications')">♧</text>
            <text class="language-action" @click="toggleLanguage">{{ language }}</text>
          </view>
        </view>
      </template>
      <view v-else class="simple-header">
        <text v-if="activeTab === 'engage'" @click="showToast('telebirr Engage Menu')">☰</text>
        <text v-else />
        <text class="simple-title">{{ tabTitle }}</text>
        <text @click="showToast(`Search in ${activeTab}`)">⌕</text>
      </view>
    </view>

    <scroll-view v-if="activeTab === 'home'" class="tab-scroll home-scroll" scroll-y>
      <view class="balance-card">
        <image class="balance-background" src="/static/images/hero_card_bg.png" mode="aspectFill" />
        <view class="balance-content">
          <view class="balance-top">
            <view class="wallet-hotspot" @click="navigate('/pages/transaction-history/index')" />
            <view class="balance-main">
              <text class="balance-label" @click="showMainBalance = !showMainBalance">
                Balance (ETB)　{{ showMainBalance ? '◉' : '◎' }}
              </text>
              <text class="balance-number" @click="navigate('/pages/transaction-history/index')">
                {{ showMainBalance ? '855.08' : '******' }}
              </text>
            </view>
          </view>
          <view class="sub-balances">
            <view class="sub-balance" @click="showEndekise = !showEndekise">
              <text>⚡ Endekise (ETB)　{{ showEndekise ? '◉' : '◎' }}</text>
              <text class="sub-balance-value">{{ showEndekise ? '0.00' : '******' }}</text>
            </view>
            <view class="sub-balance" @click="showReward = !showReward">
              <text>🎁 Reward (ETB)　{{ showReward ? '◉' : '◎' }}</text>
              <text class="sub-balance-value">{{ showReward ? '25.50' : '******' }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="needs-banner">ONE APP FOR ALL YOUR NEEDS!</view>
      <view class="service-grid primary-services">
        <view v-for="service in primaryServices" :key="service.label" class="service-tile" @click="service.action()">
          <view v-if="service.badge" class="service-badge">{{ service.badge }}</view>
          <image class="service-icon" :src="service.icon" mode="aspectFit" />
          <text class="service-label">{{ service.label }}</text>
        </view>
      </view>

      <view class="promo-banner">
        <swiper class="promo-swiper" autoplay circular :interval="3500" @change="promoIndex = $event.detail.current">
          <swiper-item v-for="banner in banners" :key="banner.title" @click="showToast(banner.title)">
            <image class="promo-image" :src="banner.image" mode="aspectFill" />
          </swiper-item>
        </swiper>
        <view class="promo-dots">
          <view v-for="(banner, index) in banners" :key="banner.title" class="promo-dot" :class="{ active: promoIndex === index }" />
        </view>
      </view>

      <view class="history-link" @click="navigate('/pages/transaction-history/index')">
        <text>Transaction Details　›</text>
      </view>
      <view class="service-grid secondary-services">
        <view v-for="service in secondaryServices" :key="service.label" class="service-tile" @click="showToast(service.label.replace(/\n/g, ' '))">
          <image class="service-icon" :src="service.icon" mode="aspectFit" />
          <text class="service-label">{{ service.label }}</text>
        </view>
      </view>
      <view class="scroll-spacer" />
    </scroll-view>

    <scroll-view v-else-if="activeTab === 'payment'" class="tab-scroll content-scroll" scroll-y>
      <view class="category-card utility-card">
        <view class="category-heading utility-heading" @click="toggleCategory('utility')">
          <text>Utility</text><text>{{ expanded.utility ? '⌃' : '⌄' }}</text>
        </view>
        <view v-if="expanded.utility" class="bill-grid">
          <view v-for="biller in utilityBillers" :key="biller.name" class="bill-tile" @click="showToast(`Pay ${biller.name}`)">
            <image :src="biller.icon" mode="aspectFit" />
            <text>{{ biller.name }}</text>
          </view>
        </view>
      </view>
      <view v-for="category in paymentCategories" :key="category.id" class="category-card">
        <view class="category-heading" @click="toggleCategory(category.id)">
          <text>{{ category.title }}</text><text>{{ expanded[category.id] ? '⌃' : '⌄' }}</text>
        </view>
        <view v-if="expanded[category.id]" class="bill-grid">
          <view v-for="item in category.items" :key="item.name" class="bill-tile" @click="showToast(`Pay ${item.name}`)">
            <image :src="item.icon" mode="aspectFit" />
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
      <view class="scroll-spacer" />
    </scroll-view>

    <scroll-view v-else-if="activeTab === 'apps'" class="tab-scroll content-scroll" scroll-y>
      <view class="search-box">
        <text class="search-symbol">⌕</text>
        <input v-model="searchTerm" placeholder="Search mini programs and apps..." />
        <text v-if="searchTerm" class="clear-search" @click="searchTerm = ''">×</text>
      </view>
      <view class="apps-grid">
        <view v-for="app in filteredApps" :key="app.name" class="app-tile" @click="showToast(`Mini Program: ${app.name}`)">
          <image :src="app.icon" mode="aspectFit" />
          <text>{{ app.name }}</text>
        </view>
      </view>
      <view class="scroll-spacer" />
    </scroll-view>

    <view v-else-if="activeTab === 'engage'" class="engage-panel">
      <template v-if="!inChatMode">
        <view class="engage-welcome">
          <image src="/static/images/engage_hero.png" mode="aspectFit" />
          <text class="engage-title">Welcome to telebirr Engage</text>
          <text class="engage-subtitle">Engage with your friends and family and experience the power of telebirr!</text>
        </view>
        <button class="primary-button engage-start" @click="inChatMode = true">Start Engaging</button>
      </template>
      <template v-else>
        <view class="friend-bar">
          <text class="back-glyph" @click="inChatMode = false">‹</text>
          <view class="friend-avatar">AB</view>
          <view class="friend-name"><text>Abebe Bikila</text><text>Online</text></view>
          <button class="small-green-button" @click="sendEngageMoney">💸 Send Money</button>
        </view>
        <scroll-view class="message-list" scroll-y>
          <view v-for="(message, index) in engageMessages" :key="index" class="message-row" :class="{ mine: message.sender === 'me' }">
            <text class="message-bubble" :class="{ money: message.money }">{{ message.text }}</text>
            <text class="message-time">{{ message.time }}</text>
          </view>
        </scroll-view>
        <view class="message-composer">
          <input v-model="engageInput" placeholder="Type a message..." @confirm="sendEngageMessage" />
          <button class="send-button" @click="sendEngageMessage">➤</button>
        </view>
      </template>
    </view>

    <scroll-view v-else class="tab-scroll content-scroll account-scroll" scroll-y>
      <view class="account-profile">
        <image src="/static/images/acc_avatar.png" mode="aspectFill" />
        <view class="account-user">
          <text class="account-name">Natnael</text>
          <text><text class="level-badge">Level 3</text>　+251905410217</text>
        </view>
        <text class="qr-action" @click="showToast('My QR Code')">▦ ›</text>
      </view>
      <view class="account-menu">
        <view v-for="item in accountItems" :key="item.title" class="account-item" @click="handleAccountItem(item)">
          <image :src="item.icon" mode="aspectFit" />
          <text class="account-item-title">{{ item.title }}</text>
          <text v-if="item.title === 'Change Language'" class="account-item-value">{{ language }}</text>
          <text class="chevron">›</text>
        </view>
      </view>
      <view class="logout-area">
        <button class="logout-button" @click="logout">Log Out</button>
        <text>telebirr SuperApp v1.3.3</text>
      </view>
    </scroll-view>

    <view class="tab-bar">
      <view v-for="tab in tabs" :key="tab.id" class="tab-item" :class="{ selected: activeTab === tab.id }" @click="activeTab = tab.id">
        <view class="tab-icon">{{ tab.icon }}</view>
        <text>{{ tab.label }}</text>
      </view>
    </view>

    <view v-if="showSendMoneyMenu" class="menu-overlay" @click="showSendMoneyMenu = false">
      <view class="send-menu" @click.stop>
        <view @click="navigate('/packageSendMoney/pages/index')">👤　To Individual</view>
        <view @click="showToast('Send to Group'); showSendMoneyMenu = false">👥　To Group</view>
      </view>
    </view>

    <view class="ai-fab" @click="navigate('/pages/ai-agent/index')">
      <image src="/static/images/ai_agent_avatar.png" mode="aspectFill" />
      <view><text>AI Agent</text><text>Your Telebirr assistant</text></view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  initialTab: { type: String, default: 'home' }
})

const tabs = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'payment', label: 'Payment', icon: '▣' },
  { id: 'apps', label: 'Apps', icon: '▦' },
  { id: 'engage', label: 'Engage', icon: '☏' },
  { id: 'account', label: 'Account', icon: '⚙' }
]
const activeTab = ref(tabs.some((tab) => tab.id === props.initialTab) ? props.initialTab : 'home')
const language = ref('English')
const showMainBalance = ref(true)
const showEndekise = ref(false)
const showReward = ref(false)
const showSendMoneyMenu = ref(false)
const searchTerm = ref('')
const promoIndex = ref(0)
const expanded = ref({ utility: true })
const inChatMode = ref(false)
const engageInput = ref('')
const engageMessages = ref([
  { sender: 'friend', text: 'Selam Natnael, did you receive the transfer?', time: '10:45 AM' },
  { sender: 'me', text: 'Yes, received 1000 ETB via telebirr! Thanks! 🙏', time: '10:46 AM' },
  { sender: 'friend', text: 'Great! telebirr is super fast! ⚡', time: '10:48 AM' }
])

const tabTitle = computed(() => tabs.find((tab) => tab.id === activeTab.value)?.label || 'Home')
const icon = (name) => `/static/images/${name}.png`
const primaryServices = [
  { label: 'Send\nMoney', icon: icon('home_send_money'), action: () => { showSendMoneyMenu.value = true } },
  { label: 'Cash In/\nOut', icon: icon('home_cash_inout'), action: () => showToast('Cash In / Out') },
  { label: 'Airtime/Buy\nPackage', icon: icon('home_airtime'), badge: 'Up to 35%', action: () => navigate('/packageAirtime/pages/index') },
  { label: 'Zemen\nGEBEYA', icon: icon('logo_zemen'), action: () => showToast('Zemen GEBEYA') },
  { label: 'Service with\nDashen', icon: icon('logo_dashen'), action: () => showToast('Service with Dashen') },
  { label: 'Service with\nCBE', icon: icon('logo_cbe'), action: () => showToast('Service with CBE') },
  { label: 'Service with\nSiinqee', icon: icon('logo_siinqee'), action: () => showToast('Service with Siinqee') },
  { label: 'Bank\nTransfer', icon: icon('home_transfer_bank'), action: () => showToast('Bank Transfer') }
]
const secondaryServices = [
  { label: 'Financial Service\nwith Awash', icon: icon('srv_awash') },
  { label: 'Pay for\nMerchant', icon: icon('srv_merchant') },
  { label: 'teleEV\nCharging', icon: icon('srv_telev') },
  { label: 'TOLO\nPayment', icon: icon('srv_tolo') },
  { label: 'AA Traffic Penalty\nPayment', icon: icon('srv_traffic') },
  { label: 'AATMA Parking\nPayment', icon: icon('srv_parking') },
  { label: 'tele Device\nFinancing', icon: icon('srv_finance') },
  { label: 'More', icon: icon('srv_more') }
]
const banners = [
  { title: 'FAYDA National ID', image: icon('banner_fayda') },
  { title: 'Zemen GEBEYA', image: icon('zemen_banner') },
  { title: 'Financial Services', image: icon('banner_airtime_micro') }
]
const utilityBillers = [
  { name: 'Pay Ethio telecom Bill', icon: icon('pay_ethiotel') },
  { name: 'Electric Utility', icon: icon('pay_electric') },
  { name: 'Addis Ababa Water', icon: icon('pay_aawsa') },
  { name: 'Water by Derash', icon: icon('pay_derash') },
  { name: 'Water by WeBirr', icon: icon('pay_webirr') },
  { name: 'W M General Trading', icon: icon('pay_wm') },
  { name: 'Water by UniCash', icon: icon('pay_unicash') },
  { name: 'Ethiopian Electric Utility', icon: icon('pay_eeu') },
  { name: 'WebSprix', icon: icon('pay_websprix') },
  { name: 'Water by Palaba', icon: icon('pay_palaba') }
]
const paymentCategories = [
  { id: 'tax', title: 'Tax and Government Service', items: [{ name: 'Ministry of Revenue', icon: icon('pay_wm') }, { name: 'Traffic Fine Payment', icon: icon('pay_derash') }, { name: 'Document Authentication', icon: icon('pay_unicash') }, { name: 'City Admin Service', icon: icon('pay_eeu') }] },
  { id: 'mesob', title: 'MESOB One-stop Service Center', items: [{ name: 'MESOB Civil Service', icon: icon('pay_ethiotel') }, { name: 'MESOB Business Registration', icon: icon('pay_webirr') }] },
  { id: 'transport', title: 'Transport Service', items: [{ name: 'Ethio-Djibouti Railway', icon: icon('pay_electric') }, { name: 'Anbessa Bus Ticketing', icon: icon('pay_palaba') }, { name: 'Sheger Bus Pay', icon: icon('pay_websprix') }, { name: 'Fuel Pay at Station', icon: icon('pay_aawsa') }] },
  { id: 'entertainment', title: 'Entertainment Service', items: [{ name: 'DStv Subscription', icon: icon('pay_websprix') }, { name: 'Canal+ Payment', icon: icon('pay_derash') }, { name: 'HabeshaView VIP', icon: icon('pay_unicash') }] },
  { id: 'ecommerce', title: 'E-commerce', items: [{ name: 'Zemen GEBEYA Store', icon: icon('pay_wm') }, { name: 'Ashewa Marketplace', icon: icon('pay_webirr') }, { name: 'Deliver Addis Food', icon: icon('pay_ethiotel') }] },
  { id: 'events', title: 'Event and Ticketing', items: [{ name: 'Great Ethiopian Run', icon: icon('pay_eeu') }, { name: 'Millennium Hall Events', icon: icon('pay_aawsa') }, { name: 'Cinema Hall Tickets', icon: icon('pay_palaba') }] }
]
const allApps = [
  ['My Ethiotel', 'app_ethiotel'], ['telebirrRemit', 'telebirr_logo'], ['tele-Online Fixed Service', 'app_ethiotel'], ['Ethiopian Airlines', 'app_ethiopian_airlines'],
  ['NID (Fayda) Digital ID', 'app_fayda'], ['Ethiopian Shipping and Logistics', 'app_esl'], ['Teninete', 'app_teninete'], ['NID (Fayda) printing', 'app_fayda_print'],
  ['MyDStv', 'app_dstv'], ['HOWLOW', 'app_howlow'], ['SITOTA', 'telebirr_logo'], ['E-Services', 'app_eservices'], ['Great Ethiopian Run', 'app_ger'],
  ['Medhin Link', 'app_medhin'], ['RIDE', 'app_ride'], ['Public Transport', 'app_transport'], ['Hulu beje', 'app_hulu_beje'], ['WebSprix', 'app_websprix'],
  ['Zemen Market', 'app_hulu_beje'], ['ASHEWA', 'app_ashewa']
].map(([name, image]) => ({ name, icon: icon(image) }))
const filteredApps = computed(() => allApps.filter((app) => app.name.toLowerCase().includes(searchTerm.value.toLowerCase())))
const accountItems = [
  ['Verify/Upgrade with Fayda (NID)', 'acc_fayda'], ['Change PIN', 'acc_pin'], ['Change Language', 'acc_lang'], ['Security Question', 'acc_security'],
  ['Biometric Authentication', 'acc_biometric'], ['FAQ', 'acc_faq'], ['Feedback', 'acc_feedback'], ['Contact Us', 'acc_contact'], ['About', 'acc_about'],
  ['Share', 'acc_share'], ['My Coupon', 'acc_coupon'], ['Bill Share History', 'acc_billshare'], ['Verify Payment', 'acc_verifypay'], ['Access on Wi-Fi', 'acc_wifi']
].map(([title, image]) => ({ title, icon: icon(image) }))

function showToast(title) {
  uni.showToast({ title: String(title).slice(0, 20), icon: 'none' })
}
function navigate(url) {
  showSendMoneyMenu.value = false
  uni.navigateTo({ url })
}
function toggleLanguage() {
  language.value = language.value === 'English' ? 'አማርኛ' : 'English'
  showToast(`Language: ${language.value}`)
}
function toggleCategory(id) {
  expanded.value[id] = !expanded.value[id]
}
function handleAccountItem(item) {
  if (item.title === 'Change Language') return toggleLanguage()
  if (item.title === 'Biometric Authentication') return navigate('/pages/login-finger/index')
  showToast(item.title)
}
function logout() {
  uni.showModal({
    title: 'Log Out',
    content: 'Are you sure you want to log out of telebirr?',
    confirmText: 'Log Out',
    confirmColor: '#ef4444',
    success: (result) => {
      if (result.confirm) uni.reLaunch({ url: '/pages/login/index' })
    }
  })
}
function sendEngageMessage() {
  const text = engageInput.value.trim()
  if (!text) return
  engageMessages.value.push({ sender: 'me', text, time: '11:08 AM' })
  engageInput.value = ''
}
function sendEngageMoney() {
  uni.showModal({
    title: 'Send Money in Engage',
    content: 'Send 50.00 ETB to Abebe Bikila?',
    confirmColor: '#76bc21',
    success: (result) => {
      if (!result.confirm) return
      engageMessages.value.push({ sender: 'me', text: '💸 Sent 50.00 ETB via telebirr', time: '11:09 AM', money: true })
      uni.showToast({ title: 'Transfer Successful!', icon: 'success' })
    }
  })
}
</script>
