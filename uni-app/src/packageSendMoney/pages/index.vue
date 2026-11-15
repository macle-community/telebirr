<template>
  <view class="send-page">
    <view class="mini-status"><text>11:39</text><text>4G　73%</text></view>
    <view class="page-header">
      <text class="back-button" @click="goBack">‹</text>
      <text class="page-title">Send Money to Individual</text>
      <text class="capsule" @click="goBack">•••　│　⦻</text>
    </view>
    <scroll-view class="send-scroll" scroll-y>
      <image class="send-banner" src="/static/images/banner_fayda.png" mode="widthFix" />
      <view class="banner-dots"><text class="active" /><text /></view>

      <view class="phone-card">
        <text class="field-label">Please Enter Mobile Number</text>
        <view class="number-entry">
          <text>+251</text>
          <input v-model="phoneNumber" type="number" maxlength="9" placeholder="9..." @input="selectedContact = null" />
          <text class="entry-icon" @click="toast('Opening scanner...')">▣</text>
          <text class="entry-icon" @click="selectRecent">☷</text>
        </view>
        <button class="send-next" :class="{ disabled: !isFormValid }" @click="openTransfer">Next</button>
      </view>

      <view class="recent-heading">
        <text>Recent</text>
        <text v-if="recents.length" class="clear-recents" @click="clearRecents">♲</text>
      </view>
      <view v-if="!recents.length" class="empty-recents">No recent transactions</view>
      <view v-else class="recent-list">
        <view v-for="contact in recents" :key="contact.id" class="recent-item" @click="selectContact(contact)">
          <image :src="contact.avatar" mode="aspectFill" />
          <text>{{ contact.name }}</text><text class="recent-chevron">›</text>
        </view>
      </view>
    </scroll-view>

    <view v-if="showTransferSheet" class="sheet-backdrop" @click="showTransferSheet = false">
      <view class="transfer-sheet" @click.stop>
        <view class="sheet-heading"><text>Transfer Details</text><text @click="showTransferSheet = false">×</text></view>
        <view class="recipient-summary">
          <view class="recipient-avatar">{{ selectedContact ? selectedContact.name[0] : '👤' }}</view>
          <view><text>{{ selectedContact ? selectedContact.name : `+251 ${phoneNumber}` }}</text><text>+251 {{ phoneNumber }}</text></view>
        </view>
        <text class="field-label">Transfer Amount (ETB)</text>
        <view class="amount-entry"><input v-model="transferAmount" type="digit" placeholder="0.00" /><text>ETB</text></view>
        <view class="quick-amounts">
          <text v-for="amount in quickAmounts" :key="amount" :class="{ chosen: transferAmount === amount }" @click="transferAmount = amount">{{ amount }}</text>
        </view>
        <text class="field-label remark-label">Remark (Optional)</text>
        <input v-model="remark" class="remark-input" placeholder="e.g. Lunch, Coffee, Gift" />
        <view class="sheet-actions">
          <button class="cancel-button" @click="showTransferSheet = false">Cancel</button>
          <button class="confirm-transfer" :loading="isTransferring" @click="confirmTransfer">{{ isTransferring ? 'Sending...' : `Send ${transferAmount} ETB` }}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

const contacts = [
  { id: '1', name: 'Abebe', phone: '911234567', avatar: '/static/images/avatar_abebe.png' },
  { id: '2', name: 'Mekonen', phone: '912345678', avatar: '/static/images/avatar_yellow_user.png' },
  { id: '3', name: 'Yared', phone: '913456789', avatar: '/static/images/avatar_yared.png' },
  { id: '4', name: 'Fseha', phone: '914567890', avatar: '/static/images/avatar_yellow_user.png' },
  { id: '5', name: 'Tesfay', phone: '915678901', avatar: '/static/images/avatar_yellow_user.png' },
  { id: '6', name: 'Kidanu', phone: '916789012', avatar: '/static/images/avatar_yellow_user.png' },
  { id: '7', name: 'Alem', phone: '917890123', avatar: '/static/images/avatar_yellow_user.png' }
]
const recents = ref([...contacts])
const phoneNumber = ref('')
const selectedContact = ref(null)
const showTransferSheet = ref(false)
const transferAmount = ref('50')
const remark = ref('')
const isTransferring = ref(false)
const quickAmounts = ['25', '50', '100', '250', '500']
const isFormValid = computed(() => phoneNumber.value.replace(/\D/g, '').length >= 9)

function toast(title) {
  uni.showToast({ title, icon: 'none' })
}
function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/home/index' }) })
}
function selectContact(contact) {
  selectedContact.value = contact
  phoneNumber.value = contact.phone
}
function selectRecent() {
  if (recents.value.length) selectContact(recents.value[0])
}
function clearRecents() {
  uni.showModal({
    title: 'Clear Recents',
    content: 'Are you sure you want to clear your recent contacts?',
    success: (result) => {
      if (result.confirm) recents.value = []
    }
  })
}
function openTransfer() {
  if (isFormValid.value) showTransferSheet.value = true
}
function confirmTransfer() {
  const amount = Number(transferAmount.value)
  if (!Number.isFinite(amount) || amount <= 0) {
    toast('Enter a valid transfer amount')
    return
  }
  uni.showModal({
    title: 'Confirm Transfer',
    content: `Send ${amount.toFixed(2)} ETB to +251 ${phoneNumber.value}?`,
    confirmColor: '#0084ff',
    success: (result) => {
      if (!result.confirm) return
      isTransferring.value = true
      setTimeout(() => {
        isTransferring.value = false
        showTransferSheet.value = false
        uni.showToast({ title: 'Transfer Sent!', icon: 'success' })
        setTimeout(() => uni.navigateTo({ url: '/pages/transaction-history/index' }), 800)
      }, 700)
    }
  })
}
</script>

<style scoped>
.send-page { display:flex; height:100vh; flex-direction:column; background:#f4f6f8; }
.mini-status { display:flex; height:24px; flex:0 0 24px; align-items:center; justify-content:space-between; padding:0 16px; background:#fff; font-size:11px; }
.page-header { display:flex; height:48px; flex:0 0 48px; align-items:center; padding:0 12px; background:#fff; border-bottom:1px solid #eaecf0; }
.back-button { width:32px; font-size:28px; }
.page-title { flex:1; font-size:13px; font-weight:700; }
.capsule { padding:5px 8px; border:1px solid #eaecf0; border-radius:16px; color:#667085; font-size:10px; }
.send-scroll { flex:1; min-height:0; padding:12px 16px 24px; }
.send-banner { width:100%; overflow:hidden; border-radius:14px; }
.banner-dots { display:flex; justify-content:center; gap:6px; margin:9px 0 14px; }
.banner-dots text { width:6px; height:6px; border-radius:50%; background:#d0d5dd; }
.banner-dots text.active { width:16px; border-radius:6px; background:#76bc21; }
.phone-card { padding:15px; border:1px solid #f2f4f7; border-radius:15px; background:#fff; }
.field-label { display:block; margin-bottom:9px; color:#475467; font-size:11px; }
.number-entry { display:flex; height:42px; align-items:center; margin-bottom:12px; padding:0 10px; border:1px solid #76bc21; border-radius:8px; background:#fff; }
.number-entry > text:first-child { margin-right:8px; font-size:13px; }
.number-entry input { flex:1; font-size:13px; }
.entry-icon { margin-left:9px; color:#76bc21; font-size:18px; }
.send-next { margin:0; border:0; border-radius:8px; background:#0084ff; color:#fff; font-size:13px; }
.send-next.disabled { background:#cde4f7; }
.recent-heading { display:flex; justify-content:space-between; margin:17px 4px 8px; font-size:11px; }
.clear-recents { color:#98a2b3; font-size:18px; }
.empty-recents { padding:20px; border-radius:12px; background:#fff; color:#98a2b3; text-align:center; font-size:12px; }
.recent-list { overflow:hidden; border-radius:12px; background:#fff; }
.recent-item { display:flex; height:52px; align-items:center; padding:0 13px; border-bottom:1px solid #f2f4f7; }
.recent-item:last-child { border-bottom:0; }
.recent-item image { width:32px; height:32px; margin-right:12px; border-radius:8px; }
.recent-item text { font-size:12px; }
.recent-chevron { margin-left:auto; color:#cbd5e1; font-size:18px !important; }
.sheet-backdrop { position:fixed; inset:0; z-index:20; display:flex; align-items:flex-end; background:rgba(0,0,0,.6); }
.transfer-sheet { width:100%; padding:18px 20px 24px; border-radius:24px 24px 0 0; background:#fff; }
.sheet-heading { display:flex; justify-content:space-between; margin-bottom:16px; padding-bottom:12px; border-bottom:1px solid #eaecf0; font-size:15px; font-weight:700; }
.sheet-heading text:last-child { color:#98a2b3; font-size:20px; font-weight:400; }
.recipient-summary { display:flex; align-items:center; gap:10px; margin-bottom:16px; padding:12px; border-radius:12px; background:#f4f6f8; }
.recipient-avatar { display:flex; width:38px; height:38px; align-items:center; justify-content:center; border-radius:50%; background:#e4f2d5; color:#5ea315; font-size:16px; }
.recipient-summary view:last-child { display:flex; flex-direction:column; gap:4px; font-size:13px; font-weight:700; }
.recipient-summary view:last-child text:last-child { color:#667085; font-size:11px; font-weight:400; }
.amount-entry { display:flex; height:50px; align-items:center; justify-content:space-between; padding:0 14px; border:1px solid #eaecf0; border-radius:12px; }
.amount-entry input { flex:1; font-size:21px; font-weight:700; }
.amount-entry text { color:#667085; font-size:13px; font-weight:700; }
.quick-amounts { display:flex; justify-content:space-between; gap:6px; margin:9px 0 15px; }
.quick-amounts text { flex:1; padding:7px 0; border:1px solid #eaecf0; border-radius:8px; color:#667085; text-align:center; font-size:10px; }
.quick-amounts text.chosen { border-color:#76bc21; background:#f2f9e9; color:#5ea315; }
.remark-label { margin-bottom:6px; }
.remark-input { height:40px; margin-bottom:16px; padding:0 12px; border:1px solid #eaecf0; border-radius:10px; font-size:12px; }
.sheet-actions { display:flex; gap:10px; }
.sheet-actions button { flex:1; margin:0; border:0; border-radius:10px; font-size:12px; }
.cancel-button { background:#f2f4f7; color:#475467; }
.confirm-transfer { background:#0084ff; color:#fff; }
</style>
