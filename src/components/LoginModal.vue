<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">登录账号</h3>
        <button class="modal-close" @click="handleClose">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="login-tabs">
          <button 
            class="login-tab" 
            :class="{ active: loginType === 'password' }"
            @click="loginType = 'password'"
          >
            密码登录
          </button>
          <button 
            class="login-tab" 
            :class="{ active: loginType === 'code' }"
            @click="loginType = 'code'"
          >
            验证码登录
          </button>
        </div>

        <div class="form-group">
          <label class="form-label">手机号</label>
          <input 
            type="tel" 
            v-model="phone" 
            class="form-input" 
            placeholder="请输入手机号"
            maxlength="11"
          />
        </div>

        <div class="form-group">
          <label class="form-label">{{ loginType === 'password' ? '密码' : '验证码' }}</label>
          <div class="form-input-row">
            <input 
              :type="loginType === 'password' ? 'password' : 'text'" 
              v-model="password" 
              class="form-input" 
              :placeholder="loginType === 'password' ? '请输入密码' : '请输入验证码'"
              maxlength="20"
            />
            <button 
              v-if="loginType === 'code'" 
              class="code-btn"
              :disabled="countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </div>
        </div>

        <button 
          class="login-btn"
          :disabled="!canSubmit"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <p class="login-tip">
          登录后可收藏节气、发布故事、分享文案等
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { userApi } from '@/api'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const userStore = useUserStore()

const loginType = ref<'password' | 'code'>('password')
const phone = ref('')
const password = ref('')
const countdown = ref(0)
const loading = ref(false)

const canSubmit = computed(() => {
  if (!phone.value || phone.value.length !== 11) return false
  if (!password.value) return false
  return true
})

const handleClose = () => {
  emit('close')
}

const sendCode = async () => {
  if (phone.value.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  if (countdown.value > 0) return
  
  try {
    await userApi.sendCode(phone.value)
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    alert('验证码已发送')
  } catch (e) {
    alert('发送失败，请重试')
  }
}

const handleLogin = async () => {
  if (!canSubmit.value) return
  
  loading.value = true
  try {
    let res
    if (loginType.value === 'password') {
      res = await userApi.login(phone.value, password.value)
    } else {
      res = await userApi.loginWithCode(phone.value, password.value)
    }
    
    if (res.data) {
      userStore.login(res.data.user, res.data.token)
      phone.value = ''
      password.value = ''
    }
  } catch (e) {
    alert('登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="css" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  width: 100%;
  max-width: 100%;
  background: var(--bg-card);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: var(--spacing-lg);
  animation: slideUp 0.3s ease;
  max-height: 80vh;
  overflow-y: auto;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

.login-tabs {
  display: flex;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 4px;
  margin-bottom: var(--spacing-lg);
}

.login-tab {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  transition: all 0.2s;
}

.login-tab.active {
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.form-input {
  width: 100%;
  height: 44px;
  padding: 0 var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.form-input::placeholder {
  color: var(--text-placeholder);
}

.form-input-row {
  display: flex;
  gap: var(--spacing-sm);
}

.form-input-row .form-input {
  flex: 1;
}

.code-btn {
  padding: 0 var(--spacing-md);
  height: 44px;
  background: var(--primary-light);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.code-btn:disabled {
  opacity: 0.6;
}

.login-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: #fff;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: 500;
  margin-top: var(--spacing-md);
  transition: opacity 0.2s;
}

.login-btn:disabled {
  opacity: 0.6;
}

.login-tip {
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--text-placeholder);
  margin-top: var(--spacing-md);
}
</style>
