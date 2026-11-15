<template>
  <view class="login-page">
    <view class="login-top">
      <view class="login-logos">
        <image src="/static/images/ethio_logo.png" mode="aspectFit" />
        <image src="/static/images/telebirr_logo.png" mode="aspectFit" />
      </view>
      <text class="login-language" @click="toggleLanguage">{{ language }}　⌄</text>
    </view>
    <view class="login-content">
      <text class="welcome-title">Welcome to telebirr SuperApp!</text>
      <text class="welcome-subtitle">All-in-One</text>
      <view class="login-heading"><text>Login</text><view /></view>
      <view class="phone-form">
        <text class="form-label">Mobile Number</text>
        <view class="phone-input">
          <text>+251</text>
          <input v-model="mobileNumber" type="number" placeholder="905410217" maxlength="9" />
        </view>
        <button class="next-button" @click="handleNext">Next</button>
        <view class="create-account">
          <text>Don't have an account?</text>
          <text class="green-text" @click="toast('Create New Account')">Create New Account</text>
        </view>
        <view class="login-links">
          <text @click="toast('teleHub')">teleHub</text><text @click="toast('Help')">Help</text>
        </view>
      </view>
    </view>
    <view class="login-footer">
      <text @click="toast('Terms and Conditions')">Terms and Conditions</text>
      <text>@2026 Ethio telecom. All rights reserved 1.3.3</text>
      <text>version</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const mobileNumber = ref('905410217')
const language = ref('English')

function toast(title) {
  uni.showToast({ title, icon: 'none' })
}
function toggleLanguage() {
  language.value = language.value === 'English' ? 'አማርኛ' : 'English'
  toast(`Language: ${language.value}`)
}
function handleNext() {
  const phone = mobileNumber.value.trim()
  if (!phone) {
    toast('Please enter your mobile number')
    return
  }
  uni.navigateTo({ url: `/pages/login-finger/index?mobile=${encodeURIComponent(phone)}` })
}
</script>

<style scoped>
.login-page { display:flex; min-height:100vh; flex-direction:column; justify-content:space-between; background:#f7f9f2; }
.login-top { padding:34px 20px 0; }
.login-logos { display:flex; align-items:center; justify-content:space-between; padding:8px 0; }
.login-logos image:first-child { width:120px; height:32px; }
.login-logos image:last-child { width:85px; height:32px; }
.login-language { display:block; margin-top:10px; text-align:right; font-size:13px; font-weight:700; }
.login-content { display:flex; flex:1; flex-direction:column; align-items:center; justify-content:center; padding:0 24px; }
.welcome-title { color:#0084ff; text-align:center; font-size:21px; font-style:italic; font-weight:700; }
.welcome-subtitle { margin-top:8px; color:#0084ff; font-size:14px; font-weight:600; }
.login-heading { display:flex; flex-direction:column; align-items:center; margin-top:22px; }
.login-heading text { font-size:25px; font-weight:700; }
.login-heading view { width:48px; height:4px; margin-top:6px; border-radius:4px; background:#76bc21; }
.phone-form { width:100%; margin-top:28px; }
.form-label { display:block; margin-bottom:8px; color:#667085; font-size:12px; }
.phone-input { display:flex; height:48px; align-items:center; padding:0 14px; border:1px solid #eaecf0; border-radius:12px; background:#fff; }
.phone-input text { margin-right:12px; font-size:15px; font-weight:600; }
.phone-input input { flex:1; font-size:15px; }
.next-button { margin-top:22px; border:0; border-radius:12px; background:#0084ff; color:#fff; font-size:15px; }
.create-account { display:flex; justify-content:center; margin-top:20px; font-size:12px; }
.green-text { margin-left:5px; color:#76bc21; }
.login-links { display:flex; justify-content:space-between; margin:24px 38px 0; color:#76bc21; font-size:14px; }
.login-footer { display:flex; flex-direction:column; align-items:center; padding:0 12px 24px; color:#98a2b3; font-size:10px; line-height:17px; }
.login-footer text:first-child { margin-bottom:6px; color:#76bc21; font-size:12px; }
</style>
