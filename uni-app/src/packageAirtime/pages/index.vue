<template>
  <view class="airtime-page">
    <view class="mini-status"><text>11:39</text><text>4G　73%</text></view>
    <view class="page-header">
      <text class="back-button" @click="goBack">‹</text>
      <text class="page-title">Airtime / Package</text>
      <text class="capsule" @click="goBack">•••　│　⦻</text>
    </view>

    <scroll-view class="airtime-scroll" scroll-y>
      <swiper class="airtime-banner" autoplay circular :interval="3500">
        <swiper-item><image src="/static/images/banner_fayda.png" mode="aspectFill" /></swiper-item>
        <swiper-item><image src="/static/images/zemen_banner.png" mode="aspectFill" /></swiper-item>
        <swiper-item><image src="/static/images/banner_airtime_micro.png" mode="aspectFill" /></swiper-item>
      </swiper>

      <view class="recipient-toggle">
        <view :class="{ chosen: recipientType === 'self' }" @click="selectSelf">Self</view>
        <view :class="{ chosen: recipientType === 'other' }" @click="selectOther">Other</view>
        <text @click="chooseContact">♧</text>
      </view>
      <view class="recipient-field">
        <text v-if="recipientType === 'self'">{{ phoneNumber }}</text>
        <input v-else v-model="phoneNumber" type="number" maxlength="13" placeholder="+251 9..." />
      </view>

      <view class="service-tabs">
        <text :class="{ chosen: activeTab === 'airtime' }" @click="activeTab = 'airtime'">Airtime</text>
        <text :class="{ chosen: activeTab === 'package' }" @click="activeTab = 'package'">Package</text>
      </view>

      <template v-if="activeTab === 'airtime'">
        <text class="section-label">Select Denomination</text>
        <view class="amount-grid">
          <view v-for="item in denominations" :key="item.amount" class="amount-option" :class="{ selected: selectedAmount === item.amount && !customAmount, highlighted: item.highlight }" @click="selectAmount(item.amount)">
            <text v-if="item.badge" class="bonus-badge">{{ item.badge }}</text>
            <text class="amount-value">{{ item.amount }} <text>ETB</text></text>
            <text v-if="item.sub" class="amount-sub">{{ item.sub }}</text>
          </view>
        </view>
        <text class="section-label">Other Amount</text>
        <view class="custom-amount"><input v-model="customAmount" type="digit" placeholder="Enter Amount" @input="updateCustomAmount" /><text>ETB</text></view>
      </template>

      <template v-else>
        <text class="section-label">Select Package</text>
        <view v-for="pkg in packages" :key="pkg.id" class="package-option" :class="{ selected: selectedPackageId === pkg.id }" @click="selectedPackageId = pkg.id">
          <view class="package-info">
            <view class="package-name-row"><text>{{ pkg.name }}</text><text class="package-tag">{{ pkg.tag }}</text></view>
            <text class="package-validity">Validity: {{ pkg.validity }}</text>
          </view>
          <text class="package-price">{{ pkg.price }} ETB</text>
        </view>
      </template>

      <button class="next-button" @click="openConfirmation">Next</button>
    </scroll-view>

    <view v-if="showConfirm" class="sheet-backdrop" @click="showConfirm = false">
      <view class="confirm-sheet" @click.stop>
        <view class="sheet-heading"><text>Confirm Airtime Recharge</text><text @click="showConfirm = false">×</text></view>
        <view class="confirm-details">
          <view><text>Service</text><text>{{ activeTab === 'airtime' ? 'Airtime Top-Up' : 'Data/Voice Package' }}</text></view>
          <view><text>Phone Number</text><text>{{ normalizedPhone }}</text></view>
          <view><text>Payment Account</text><text>telebirr ({{ walletBalance.toFixed(2) }} ETB)</text></view>
          <view v-if="handoffOrderId"><text>Order Ref (AI Agent)</text><text>{{ handoffOrderId }}</text></view>
          <view v-if="pendingOrder && pendingOrder.bonusAmount"><text>Bonus Airtime</text><text>+{{ pendingOrder.bonusAmount.toFixed(2) }} ETB</text></view>
          <view><text>Total Amount</text><text class="total-amount">{{ totalAmount.toFixed(2) }} ETB</text></view>
          <text class="demo-note">Demo checkout — no real payment is processed.</text>
        </view>
        <view class="sheet-actions">
          <button class="cancel-button" @click="showConfirm = false">Cancel</button>
          <button class="pay-button" :loading="isSuccess" @click="confirmPay">{{ isSuccess ? 'Processing...' : 'Confirm & Pay' }}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  createAirtimeOrder,
  DEFAULT_DENOMINATIONS,
  DEFAULT_PACKAGES,
  payAirtimeOrder,
  WALLET_BALANCE
} from '../../services/buyAirtime.js'

const denominations = DEFAULT_DENOMINATIONS
const packages = DEFAULT_PACKAGES
const recipientType = ref('self')
const phoneNumber = ref('+251 905410217')
const activeTab = ref('airtime')
const selectedAmount = ref(100)
const customAmount = ref('')
const selectedPackageId = ref('p1')
const showConfirm = ref(false)
const isSuccess = ref(false)
const handoffOrderId = ref('')
const pendingOrder = ref(null)
const walletBalance = ref(WALLET_BALANCE)
const selectedPackage = computed(() => packages.find((item) => item.id === selectedPackageId.value) || packages[0])
const totalAmount = computed(() => activeTab.value === 'airtime' ? Number(selectedAmount.value || 0) : selectedPackage.value.price)
const normalizedPhone = computed(() => {
  const digits = phoneNumber.value.replace(/\D/g, '')
  const local = digits.startsWith('251') ? digits.slice(3) : digits.startsWith('0') ? digits.slice(1) : digits
  return local ? `+251 ${local}` : phoneNumber.value
})

onLoad((options) => {
  const params = options || {}
  handoffOrderId.value = params.orderId || ''
  if (params.amount) {
    selectedAmount.value = Number(params.amount)
    customAmount.value = ''
  }
  if (params.recipientPhone || params.phone) phoneNumber.value = decodeURIComponent(params.recipientPhone || params.phone)
  if (params.recipientType === 'other') recipientType.value = 'other'
  if (params.activeTab === 'package' || params.tab === 'package') activeTab.value = 'package'
  if (params.packageId || params.pkgId) selectedPackageId.value = params.packageId || params.pkgId
  if (params.orderId) {
    const result = createAirtimeOrder({
      serviceType: activeTab.value,
      amount: selectedAmount.value,
      packageId: selectedPackageId.value,
      recipientPhone: phoneNumber.value,
      recipientType: recipientType.value
    })
    if (!result.isError) {
      pendingOrder.value = { ...result.structuredContent, orderId: params.orderId }
      showConfirm.value = true
    }
  }
})

function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/home/index' }) })
}
function selectSelf() {
  recipientType.value = 'self'
  phoneNumber.value = '+251 905410217'
}
function selectOther() {
  recipientType.value = 'other'
  phoneNumber.value = '+251 9'
}
function chooseContact() {
  recipientType.value = 'other'
  phoneNumber.value = '+251 911234567'
}
function selectAmount(amount) {
  selectedAmount.value = amount
  customAmount.value = ''
}
function updateCustomAmount() {
  const amount = Number(customAmount.value)
  if (customAmount.value && Number.isFinite(amount)) selectedAmount.value = amount
}
function openConfirmation() {
  const result = createAirtimeOrder({
    serviceType: activeTab.value,
    amount: totalAmount.value,
    packageId: selectedPackageId.value,
    recipientPhone: phoneNumber.value,
    recipientType: recipientType.value
  })
  if (result.isError) {
    uni.showToast({ title: result.content[0]?.text || 'Unable to create order', icon: 'none' })
    return
  }
  pendingOrder.value = result.structuredContent
  showConfirm.value = true
}
function confirmPay() {
  if (!pendingOrder.value) {
    uni.showToast({ title: 'No pending order to pay', icon: 'none' })
    return
  }
  const payment = payAirtimeOrder({
    orderId: pendingOrder.value.orderId,
    order: pendingOrder.value,
    confirmed: true
  })
  if (payment.isError) {
    uni.showToast({ title: payment.content[0]?.text || 'Payment failed', icon: 'none' })
    return
  }
  isSuccess.value = true
  setTimeout(() => {
    isSuccess.value = false
    showConfirm.value = false
    walletBalance.value = payment.structuredContent.newBalance
    uni.showToast({ title: 'Recharge Successful!', icon: 'success' })
  }, 900)
}
</script>

<style scoped>
.airtime-page { display:flex; height:100vh; flex-direction:column; background:#f4f6f8; }
.mini-status { display:flex; height:24px; flex:0 0 24px; align-items:center; justify-content:space-between; padding:0 16px; background:#fff; font-size:11px; }
.page-header { display:flex; height:48px; flex:0 0 48px; align-items:center; padding:0 12px; background:#fff; border-bottom:1px solid #eaecf0; }
.back-button { width:32px; font-size:28px; }
.page-title { flex:1; font-size:14px; font-weight:700; }
.capsule { padding:5px 8px; border:1px solid #eaecf0; border-radius:16px; color:#667085; font-size:10px; }
.airtime-scroll { flex:1; min-height:0; padding:12px 16px 24px; }
.airtime-banner { height:106px; margin-bottom:13px; overflow:hidden; border-radius:14px; }
.airtime-banner image { width:100%; height:106px; }
.recipient-toggle { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.recipient-toggle view { padding:6px 16px; border:1px solid #eaecf0; border-radius:6px; background:#fff; color:#475467; font-size:11px; }
.recipient-toggle view.chosen { border-color:#76bc21; background:#76bc21; color:#fff; }
.recipient-toggle text { margin-left:auto; color:#76bc21; font-size:20px; }
.recipient-field { min-height:34px; margin-bottom:13px; padding:4px 2px; border-bottom:1px solid #76bc21; color:#17212b; font-size:16px; font-weight:700; }
.recipient-field input { font-size:15px; font-weight:600; }
.service-tabs { display:flex; margin-bottom:14px; padding:3px; border-radius:8px; background:#e4edd2; }
.service-tabs text { flex:1; padding:7px; border-radius:6px; color:#475467; text-align:center; font-size:12px; }
.service-tabs text.chosen { background:#76bc21; color:#fff; }
.section-label { display:block; margin:0 0 9px; color:#344054; font-size:11px; }
.amount-grid { display:flex; flex-wrap:wrap; justify-content:space-between; margin-bottom:18px; }
.amount-option { position:relative; display:flex; width:31.5%; min-height:58px; flex-direction:column; align-items:center; justify-content:center; margin-bottom:9px; border:1px solid #eaecf0; border-radius:9px; background:#fff; }
.amount-option.highlighted { border-color:#f59e0b; }
.amount-option.selected { border:2px solid #f59e0b; }
.amount-value { font-size:15px; font-weight:700; }
.amount-value text { font-size:9px; font-weight:400; }
.amount-sub { margin-top:3px; color:#98a2b3; font-size:8px; }
.bonus-badge { position:absolute; top:-5px; left:4px; padding:2px 5px; border-radius:9px; background:#f59e0b; color:#fff; font-size:8px; }
.custom-amount { display:flex; height:42px; align-items:center; padding:0 12px; border:1px solid #eaecf0; border-radius:8px; background:#fff; }
.custom-amount input { flex:1; font-size:12px; }
.custom-amount text { color:#667085; font-size:11px; }
.package-option { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; padding:12px; border:1px solid #eaecf0; border-radius:10px; background:#fff; }
.package-option.selected { border-color:#76bc21; background:#f5faef; }
.package-info { flex:1; }
.package-name-row { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:700; }
.package-tag { padding:2px 4px; border-radius:4px; background:#e4f2d5; color:#5ea315; font-size:8px; }
.package-validity { display:block; margin-top:5px; color:#667085; font-size:9px; }
.package-price { color:#76bc21; font-size:14px; font-weight:800; }
.next-button { margin:18px 0 24px; border:0; border-radius:10px; background:#76bc21; color:#fff; font-size:13px; }
.sheet-backdrop { position:fixed; inset:0; z-index:20; display:flex; align-items:flex-end; background:rgba(0,0,0,.6); }
.confirm-sheet { width:100%; padding:18px 20px 24px; border-radius:24px 24px 0 0; background:#fff; }
.sheet-heading { display:flex; justify-content:space-between; margin-bottom:13px; padding-bottom:12px; border-bottom:1px solid #eaecf0; font-size:14px; font-weight:700; }
.sheet-heading text:last-child { color:#98a2b3; font-size:20px; font-weight:400; }
.confirm-details { padding:12px; border:1px solid #f2f4f7; border-radius:14px; background:#f9fafb; }
.confirm-details view { display:flex; justify-content:space-between; gap:12px; padding:7px 0; border-bottom:1px solid #eaecf0; font-size:10px; }
.confirm-details view text:first-child { color:#667085; }
.confirm-details view text:last-child { text-align:right; font-weight:600; }
.confirm-details .total-amount { color:#76bc21; font-size:14px; font-weight:800; }
.demo-note { display:block; margin-top:10px; color:#98a2b3; text-align:center; font-size:9px; }
.sheet-actions { display:flex; gap:10px; margin-top:14px; }
.sheet-actions button { flex:1; margin:0; border:0; border-radius:10px; font-size:12px; }
.cancel-button { background:#f2f4f7; color:#475467; }
.pay-button { background:#76bc21; color:#fff; }
</style>
