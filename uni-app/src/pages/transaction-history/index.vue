<template>
  <view class="history-page">
    <view class="mini-status"><text>11:09　🔔</text><text>4G　19% 🔋</text></view>
    <view class="page-header">
      <text class="back-button" @click="goBack">‹</text>
      <text class="page-title">Transaction History</text>
      <text class="capsule">•••　│　◉</text>
    </view>
    <view class="history-toolbar">
      <view class="segmented">
        <text :class="{ active: activeTab === 'main' }" @click="activeTab = 'main'">Main</text>
        <text :class="{ active: activeTab === 'reward' }" @click="activeTab = 'reward'">Reward</text>
      </view>
      <view class="history-tools">
        <text @click="toast('Downloading Statement...')">⇩</text>
        <text @click="toast('Filter Transactions')">☷</text>
      </view>
    </view>
    <view class="summary-card">
      <view><text>Pay (ETB)</text><text>-369.70</text></view>
      <view><text>Income (ETB)</text><text>1000.00</text></view>
      <view><text>Total (ETB)</text><text>630.30</text></view>
    </view>
    <scroll-view class="history-scroll" scroll-y>
      <view v-for="group in groups" :key="group.month" class="transaction-group">
        <view class="group-title">{{ group.month }}</view>
        <view v-for="tx in group.items" :key="tx.id" class="transaction-row" @click="selectedTx = tx">
          <image src="/static/images/tx_icon.png" mode="aspectFit" />
          <view class="transaction-info"><text>{{ tx.title }}</text><text>{{ tx.dateTime }}</text></view>
          <view class="transaction-amount">
            <text>{{ tx.amount > 0 ? '+' : '' }}{{ tx.amount.toFixed(2) }}</text>
            <text>{{ tx.currency }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-if="selectedTx" class="modal-mask" @click="selectedTx = null">
      <view class="receipt-modal" @click.stop>
        <view class="receipt-check">✓</view>
        <text class="receipt-title">{{ selectedTx.title }}</text>
        <text class="receipt-status">TRANSACTION SUCCESSFUL</text>
        <text class="receipt-amount">{{ selectedTx.amount > 0 ? '+' : '' }}{{ selectedTx.amount.toFixed(2) }} {{ selectedTx.currency }}</text>
        <view class="receipt-details">
          <view><text>Reference No</text><text>{{ selectedTx.refNo }}</text></view>
          <view><text>Date & Time</text><text>{{ selectedTx.dateTime }}</text></view>
          <view><text>Payment Mode</text><text>telebirr Wallet</text></view>
          <view><text>Fee</text><text>0.00 ETB</text></view>
        </view>
        <button class="done-button" @click="selectedTx = null">Done</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('main')
const selectedTx = ref(null)
const groups = [
  {
    month: 'November',
    items: [
      { id: 'tx_1', title: 'Transfer Money', dateTime: '06-11-2026 20:55', amount: -30, currency: 'ETB', refNo: 'MP261106.2055.A98214' },
      { id: 'tx_2', title: 'Cash In', dateTime: '06-11-2026 20:54', amount: 1000, currency: 'ETB', refNo: 'MP261106.2054.C44109' },
      { id: 'tx_3', title: 'Transfer Money', dateTime: '05-11-2026 20:50', amount: -40, currency: 'ETB', refNo: 'MP261105.2050.T51820' },
      { id: 'tx_4', title: 'Transfer Money', dateTime: '04-11-2026 19:35', amount: -30, currency: 'ETB', refNo: 'MP261104.1935.M19402' }
    ]
  },
  {
    month: 'October',
    items: [
      { id: 'tx_5', title: 'Transfer Money', dateTime: '31-10-2026 10:15', amount: -30, currency: 'ETB', refNo: 'MP261031.1015.K77319' },
      { id: 'tx_6', title: 'Transfer Money', dateTime: '30-10-2026 19:20', amount: -40, currency: 'ETB', refNo: 'MP261030.1920.L90218' },
      { id: 'tx_7', title: 'Transfer Money', dateTime: '30-10-2026 19:17', amount: -30, currency: 'ETB', refNo: 'MP261030.1917.Q33810' }
    ]
  }
]

function toast(title) {
  uni.showToast({ title, icon: 'none' })
}
function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/index/index' }) })
}
</script>

<style scoped>
.history-page { display:flex; flex-direction:column; height:100vh; background:#f4f6f8; }
.mini-status { display:flex; height:24px; flex:0 0 24px; align-items:center; justify-content:space-between; padding:0 16px; background:#fff; font-size:11px; }
.page-header { display:flex; height:48px; flex:0 0 48px; align-items:center; padding:0 12px; background:#fff; border-bottom:1px solid #eaecf0; }
.back-button { width:32px; font-size:28px; color:#344054; }
.page-title { flex:1; font-size:17px; font-weight:700; }
.capsule { padding:5px 10px; border:1px solid #d0d5dd; border-radius:18px; font-size:11px; }
.history-toolbar { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; }
.segmented { display:flex; gap:8px; }
.segmented text { padding:6px 18px; border:1px solid #eaecf0; border-radius:18px; background:#fff; color:#667085; font-size:13px; }
.segmented text.active { border-color:#76bc21; background:#76bc21; color:#fff; }
.history-tools { display:flex; gap:12px; color:#475467; font-size:20px; }
.summary-card { display:flex; margin:0 16px 12px; padding:12px; border-radius:12px; background:#76bc21; color:#fff; }
.summary-card view { display:flex; flex:1; flex-direction:column; gap:5px; font-size:11px; }
.summary-card view:nth-child(2) { align-items:center; }
.summary-card view:nth-child(3) { align-items:flex-end; }
.summary-card view text:last-child { font-size:15px; font-weight:700; }
.history-scroll { flex:1; min-height:0; padding:0 16px 14px; }
.transaction-group { margin-bottom:14px; overflow:hidden; border-radius:14px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,.05); }
.group-title { padding:10px 14px; border-bottom:1px solid #ecfdf3; background:#ecfdf3; font-size:14px; font-weight:700; }
.transaction-row { display:flex; min-height:66px; align-items:center; padding:8px 12px; border-bottom:1px solid #f2f4f7; }
.transaction-row:last-child { border-bottom:0; }
.transaction-row image { width:38px; height:38px; margin-right:10px; }
.transaction-info { display:flex; flex:1; flex-direction:column; gap:4px; font-size:13px; font-weight:600; }
.transaction-info text:last-child { color:#98a2b3; font-size:10px; font-weight:400; }
.transaction-amount { display:flex; flex-direction:column; align-items:flex-end; gap:3px; font-size:14px; font-weight:700; }
.transaction-amount text:last-child { color:#98a2b3; font-size:10px; font-weight:400; }
.modal-mask { position:fixed; inset:0; z-index:20; display:flex; align-items:center; justify-content:center; padding:20px; background:rgba(0,0,0,.6); }
.receipt-modal { display:flex; width:100%; flex-direction:column; align-items:center; padding:22px; border-radius:24px; background:#fff; }
.receipt-check { display:flex; width:52px; height:52px; align-items:center; justify-content:center; margin-bottom:8px; border-radius:50%; background:#d1fae5; color:#76bc21; font-size:25px; }
.receipt-title { font-size:18px; font-weight:700; }
.receipt-status { margin-top:4px; color:#059669; font-size:10px; font-weight:700; }
.receipt-amount { margin:18px 0; font-size:25px; font-weight:800; }
.receipt-details { width:100%; padding:10px 0; border-top:1px solid #eaecf0; border-bottom:1px solid #eaecf0; }
.receipt-details view { display:flex; justify-content:space-between; gap:12px; margin:8px 0; font-size:10px; }
.receipt-details view text:first-child { color:#98a2b3; }
.receipt-details view text:last-child { color:#344054; text-align:right; }
.done-button { width:100%; margin-top:16px; border:0; border-radius:22px; background:#76bc21; color:#fff; font-size:14px; }
</style>
