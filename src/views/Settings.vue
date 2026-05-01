<template>
  <div class="settings page-container">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="page-title">系统设置</h2>
      <div class="placeholder"></div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">通用设置</h3>
      <div class="setting-item">
        <span class="setting-label">推送通知</span>
        <div class="setting-switch" :class="{ active: settings.notification }" @click="toggleSetting('notification')">
          <div class="switch-dot"></div>
        </div>
      </div>
      <div class="setting-item">
        <span class="setting-label">深色模式</span>
        <div class="setting-switch" :class="{ active: settings.darkMode }" @click="toggleSetting('darkMode')">
          <div class="switch-dot"></div>
        </div>
      </div>
      <div class="setting-item" @click="showClearConfirm = true">
        <span class="setting-label">清除缓存</span>
        <svg class="setting-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">关于</h3>
      <div class="setting-item">
        <span class="setting-label">当前版本</span>
        <span class="setting-value">v1.0.0</span>
      </div>
      <div class="setting-item">
        <span class="setting-label">检查更新</span>
        <svg class="setting-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      <div class="setting-item">
        <span class="setting-label">用户协议</span>
        <svg class="setting-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      <div class="setting-item">
        <span class="setting-label">隐私政策</span>
        <svg class="setting-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      <div class="setting-item">
        <span class="setting-label">联系我们</span>
        <svg class="setting-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>

    <div class="settings-footer">
      <p class="footer-text">© 2024 四季风物节气图鉴</p>
      <p class="footer-text">传承中华传统文化</p>
    </div>

    <div v-if="showClearConfirm" class="confirm-overlay" @click="showClearConfirm = false">
      <div class="confirm-dialog" @click.stop>
        <h3 class="confirm-title">清除缓存</h3>
        <p class="confirm-content">确定要清除所有缓存数据吗？这将清除本地存储的收藏、历史等数据。</p>
        <div class="confirm-actions">
          <button class="confirm-btn cancel" @click="showClearConfirm = false">取消</button>
          <button class="confirm-btn confirm" @click="clearCache">确定清除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import { useHistoryStore } from '@/stores/history'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const historyStore = useHistoryStore()

const settings = ref({
  notification: true,
  darkMode: false
})

const showClearConfirm = ref(false)

const toggleSetting = (key: 'notification' | 'darkMode') => {
  settings.value[key] = !settings.value[key]
  localStorage.setItem('settings', JSON.stringify(settings.value))
}

const loadSettings = () => {
  const stored = localStorage.getItem('settings')
  if (stored) {
    settings.value = { ...settings.value, ...JSON.parse(stored) }
  }
}

const clearCache = () => {
  localStorage.removeItem('favorites')
  localStorage.removeItem('history')
  favoritesStore.favorites = []
  historyStore.history = []
  showClearConfirm.value = false
  alert('缓存已清除')
}

loadSettings()
</script>

<style lang="css" scoped>
.settings {
  background: var(--bg-secondary);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn svg {
  width: 24px;
  height: 24px;
  color: var(--text-primary);
}

.page-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.placeholder {
  width: 32px;
}

.settings-section {
  background: var(--bg-card);
  margin-bottom: var(--spacing-md);
}

.section-title {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
  font-weight: 500;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.setting-value {
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
}

.setting-arrow {
  width: 20px;
  height: 20px;
  color: var(--text-placeholder);
}

.setting-switch {
  width: 44px;
  height: 26px;
  background: var(--border-color);
  border-radius: 13px;
  position: relative;
  transition: background 0.2s;
}

.setting-switch.active {
  background: var(--primary-color);
}

.switch-dot {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.setting-switch.active .switch-dot {
  transform: translateX(18px);
}

.settings-footer {
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
}

.footer-text {
  font-size: var(--font-size-xs);
  color: var(--text-placeholder);
  line-height: 1.6;
}

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.confirm-dialog {
  width: 100%;
  max-width: 320px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.confirm-title {
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-md);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
}

.confirm-content {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  text-align: center;
}

.confirm-actions {
  display: flex;
  border-top: 1px solid var(--border-color);
}

.confirm-btn {
  flex: 1;
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
}

.confirm-btn.cancel {
  color: var(--text-secondary);
  border-right: 1px solid var(--border-color);
}

.confirm-btn.confirm {
  color: var(--primary-color);
  font-weight: 600;
}
</style>
