<template>
  <div class="tabbar">
    <div 
      class="tabbar-item" 
      :class="{ active: isActive('/home') }"
      @click="navigate('/home')"
    >
      <svg class="tabbar-icon" viewBox="0 0 24 24">
        <path :d="isActive('/home') ? homeActivePath : homePath" :fill="isActive('/home') ? 'currentColor' : 'none'" :stroke="isActive('/home') ? 'none' : 'currentColor'" stroke-width="2"/>
      </svg>
      <span class="tabbar-label">首页</span>
    </div>
    <div 
      class="tabbar-item" 
      :class="{ active: isActive('/favorites') }"
      @click="navigate('/favorites')"
    >
      <svg class="tabbar-icon" viewBox="0 0 24 24">
        <path :d="heartPath" :fill="isActive('/favorites') ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span class="tabbar-label">收藏</span>
    </div>
    <div 
      class="tabbar-item tabbar-item-center"
      @click="navigate('/publish')"
    >
      <div class="tabbar-add-btn">
        <svg class="tabbar-icon" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <span class="tabbar-label">发布</span>
    </div>
    <div 
      class="tabbar-item" 
      :class="{ active: isActive('/profile') }"
      @click="navigate('/profile')"
    >
      <svg class="tabbar-icon" viewBox="0 0 24 24">
        <path :d="isActive('/profile') ? profileActivePath : profilePath" :fill="isActive('/profile') ? 'currentColor' : 'none'" :stroke="isActive('/profile') ? 'none' : 'currentColor'" stroke-width="2"/>
      </svg>
      <span class="tabbar-label">我的</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const homePath = 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
const homeActivePath = 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 00-.293.707V19a2 2 0 002 2h3.5a1 1 0 001-1v-5a1 1 0 011-1h3a1 1 0 011 1v5a1 1 0 001 1H20a2 2 0 002-2V9.999a1 1 0 00-.293-.706l-11-11z'

const heartPath = 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'

const profilePath = 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
const profileActivePath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'

const isActive = (path: string) => {
  if (path === '/profile') {
    return ['/profile', '/my-stories', '/settings'].some(p => route.path.startsWith(p))
  }
  if (path === '/favorites') {
    return ['/favorites', '/history'].some(p => route.path.startsWith(p))
  }
  return route.path === path || route.path.startsWith(path + '/')
}

const navigate = (path: string) => {
  router.push(path)
}
</script>

<style lang="css" scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--bg-card);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  z-index: 100;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  color: var(--text-placeholder);
  transition: color 0.2s;
  cursor: pointer;
}

.tabbar-item.active {
  color: var(--primary-color);
}

.tabbar-item-center {
  position: relative;
  margin-top: -20px;
}

.tabbar-add-btn {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(90, 124, 101, 0.3);
  color: #fff;
}

.tabbar-item-center .tabbar-label {
  margin-top: 4px;
}

.tabbar-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
}

.tabbar-label {
  font-size: var(--font-size-xs);
}
</style>
