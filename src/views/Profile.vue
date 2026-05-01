<template>
  <div class="profile page-container">
    <div class="profile-header">
      <div class="profile-info" v-if="userStore.isLoggedIn" @click="() => {}">
        <img class="profile-avatar" :src="userStore.user?.avatar" alt="头像" />
        <div class="profile-detail">
          <h3 class="profile-name">{{ userStore.user?.nickname }}</h3>
          <p class="profile-id">ID: {{ userStore.user?.id }}</p>
        </div>
      </div>
      <div class="profile-info" v-else @click="userStore.openLoginModal()">
        <div class="profile-avatar placeholder-avatar">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div class="profile-detail">
          <h3 class="profile-name">点击登录</h3>
          <p class="profile-hint">登录后可使用更多功能</p>
        </div>
        <svg class="profile-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-item" @click="goToFavorites">
        <div class="menu-icon" style="background: linear-gradient(135deg, #e64a19, #ff7043)">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </div>
        <span class="menu-text">我的收藏</span>
        <svg class="menu-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>

      <div class="menu-item" @click="goToHistory">
        <div class="menu-icon" style="background: linear-gradient(135deg, #03a9f4, #4fc3f7)">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>
        <span class="menu-text">浏览历史</span>
        <svg class="menu-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>

      <div class="menu-item" @click="goToMyStories">
        <div class="menu-icon" style="background: linear-gradient(135deg, #c9a86c, #e6c878)">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <span class="menu-text">我的发布</span>
        <svg class="menu-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>

      <div class="menu-item" @click="goToSettings">
        <div class="menu-icon" style="background: linear-gradient(135deg, #666, #999)">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </div>
        <span class="menu-text">系统设置</span>
        <svg class="menu-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>

    <div class="about-section">
      <div class="about-item">
        <span class="about-label">版本</span>
        <span class="about-value">v1.0.0</span>
      </div>
      <div class="about-item">
        <span class="about-label">关于我们</span>
        <svg class="about-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>

    <button v-if="userStore.isLoggedIn" class="logout-btn" @click="handleLogout">
      退出登录
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const goToFavorites = () => {
  userStore.checkLoginAndExecute(() => {
    router.push('/favorites')
  })
}

const goToHistory = () => {
  userStore.checkLoginAndExecute(() => {
    router.push('/history')
  })
}

const goToMyStories = () => {
  userStore.checkLoginAndExecute(() => {
    router.push('/my-stories')
  })
}

const goToSettings = () => {
  router.push('/settings')
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout()
  }
}

onMounted(() => {
  userStore.loadFromStorage()
})
</script>

<style lang="css" scoped>
.profile {
  background: var(--bg-secondary);
}

.profile-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  padding: var(--spacing-xl) var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.placeholder-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
}

.placeholder-avatar svg {
  width: 32px;
  height: 32px;
  color: #fff;
}

.profile-detail {
  flex: 1;
}

.profile-name {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.profile-id {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.7);
}

.profile-hint {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
}

.profile-arrow {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.menu-section {
  background: var(--bg-card);
  margin-bottom: var(--spacing-md);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-md);
}

.menu-icon svg {
  width: 20px;
  height: 20px;
  color: #fff;
}

.menu-text {
  flex: 1;
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.menu-arrow {
  width: 20px;
  height: 20px;
  color: var(--text-placeholder);
}

.about-section {
  background: var(--bg-card);
  margin-bottom: var(--spacing-md);
}

.about-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.about-item:last-child {
  border-bottom: none;
}

.about-label {
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.about-value {
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
}

.about-arrow {
  width: 20px;
  height: 20px;
  color: var(--text-placeholder);
}

.logout-btn {
  width: calc(100% - var(--spacing-lg) * 2);
  height: 48px;
  margin: var(--spacing-lg);
  background: #fff;
  color: #e64a19;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
}
</style>
