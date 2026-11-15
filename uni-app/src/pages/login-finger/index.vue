<template>
  <view class="finger-page">
    <view class="finger-top"><image src="/static/images/icon_arrow_back.png" mode="aspectFit" @click="goBack" /></view>
    <view class="finger-center">
      <image class="gold-avatar" src="/static/images/avatar_gold_user.png" mode="aspectFit" />
      <text class="masked-phone">+251****{{ mobile.slice(-2) }}</text>
      <view class="finger-action" @click="authenticate">
        <view><image src="/static/images/fingerprint_green.png" mode="aspectFit" /></view>
        <text>Login With Fingerprint</text>
      </view>
      <view class="finger-card" @click="authenticate">
        <view class="spinner"><view v-for="dot in 8" :key="dot" :style="{ transform: `rotate(${dot * 45}deg) translate(0, -13px)`, opacity: 0.2 + (dot / 8) * 0.8 }" /></view>
      </view>
      <text v-if="showNotice" class="security-notice" @click="showNotice = false">Can't take screenshots due to security policy.</text>
    </view>
    <text class="alternate-login" @click="goBack">Log in with another option ›</text>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const mobile = ref('905410217')
const showNotice = ref(true)
const isVerifying = ref(false)

onLoad((options) => {
  if (options?.mobile) mobile.value = String(options.mobile)
})

function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/login/index' }) })
}
function authenticate() {
  if (isVerifying.value) return
  isVerifying.value = true
  uni.showLoading({ title: 'Verifying fingerprint...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: 'Login Successful', icon: 'success' })
    setTimeout(() => uni.reLaunch({ url: '/pages/home/index' }), 600)
  }, 700)
}
</script>

<style scoped>
.finger-page { display:flex; min-height:100vh; flex-direction:column; background:#999; }
.finger-top { height:64px; padding:30px 16px 0; }
.finger-top image { width:22px; height:22px; }
.finger-center { display:flex; flex:1; flex-direction:column; align-items:center; justify-content:center; padding:0 24px; }
.gold-avatar { width:74px; height:74px; }
.masked-phone { margin-top:12px; color:#17212b; font-size:18px; font-weight:600; }
.finger-action { display:flex; flex-direction:column; align-items:center; margin-top:26px; }
.finger-action view { display:flex; width:62px; height:62px; align-items:center; justify-content:center; border-radius:50%; background:#e4ece0; }
.finger-action image { width:34px; height:34px; }
.finger-action text { margin-top:8px; color:#5b823e; font-size:13px; }
.finger-card { display:flex; width:136px; height:136px; align-items:center; justify-content:center; margin-top:24px; border-radius:16px; background:#fff; box-shadow:0 8px 30px rgba(0,0,0,.12); }
.spinner { position:relative; width:40px; height:40px; animation:spin 1.1s linear infinite; }
.spinner view { position:absolute; top:50%; left:50%; width:7px; height:7px; border-radius:50%; background:#76bc21; }
.security-notice { margin-top:42px; padding:11px 20px; border-radius:16px; background:#424242; color:#fff; font-size:12px; text-align:center; }
.alternate-login { padding:0 0 30px; color:#344054; text-align:center; font-size:13px; }
@keyframes spin { to { transform:rotate(360deg); } }
</style>
