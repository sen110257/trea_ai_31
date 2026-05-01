<template>
  <div class="history page-container">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="page-title">浏览历史</h2>
      <button v-if="historyStore.history.length > 0" class="clear-btn" @click="handleClear">
        清空
      </button>
    </div>

    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'favorites' }"
        @click="router.push('/favorites')"
      >
        我的收藏
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'history' }"
        @click="activeTab = 'history'"
      >
        浏览历史
      </button>
    </div>

    <div v-if="historyStore.history.length > 0" class="history-content">
      <div 
        v-for="item in historyStore.history" 
        :key="item.id"
        class="history-item card"
        @click="goToDetail(item.solarTermId)"
      >
        <img class="history-image" :src="item.image" :alt="item.name" />
        <div class="history-info">
          <h4 class="history-name">{{ item.name }}</h4>
          <p class="history-brief">{{ item.brief }}</p>
          <span class="history-time">{{ formatTime(item.viewedAt) }}</span>
        </div>
        <button class="history-remove" @click.stop="handleRemove(item.solarTermId)">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <p class="empty-text">暂无浏览历史</p>
      <p class="empty-hint">去探索更多节气知识吧</p>
      <button class="empty-btn" @click="router.push('/home')">去逛逛</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHistoryStore } from '@/stores/history'
import { useUserStore } from '@/stores/user'
import { getSolarTermById } from '@/data/solarTerms'

const router = useRouter()
const historyStore = useHistoryStore()
const userStore = useUserStore()

const activeTab = ref('history')

const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  
  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < day * 7) {
    return `${Math.floor(diff / day)}天前`
  } else {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}-${date.getDate()}`
  }
}

const goToDetail = (id: string) => {
  const term = getSolarTermById(id)
  if (term) {
    historyStore.addHistory({
      solarTermId: term.id,
      name: term.name,
      season: term.season,
      image: term.image,
      brief: term.brief
    })
  }
  router.push(`/detail/${id}`)
}

const handleRemove = (solarTermId: string) => {
  historyStore.removeHistory(solarTermId)
}

const handleClear = () => {
  if (confirm('确定要清空所有浏览历史吗？')) {
    historyStore.clearHistory()
  }
}

onMounted(() => {
  userStore.checkLoginAndExecute(() => {
    historyStore.loadFromStorage()
  })
})
</script>

<style lang="css" scoped>
.history {
  background: var(--bg-primary);
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

.clear-btn {
  font-size: var(--font-size-sm);
  color: #e64a19;
}

.nav-tabs {
  display: flex;
  background: var(--bg-card);
  padding: 0 var(--spacing-md);
}

.nav-tab {
  flex: 1;
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  position: relative;
}

.nav-tab.active {
  color: var(--primary-color);
  font-weight: 600;
}

.nav-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
}

.history-content {
  padding: var(--spacing-md);
}

.history-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  position: relative;
}

.history-image {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  object-fit: cover;
  margin-right: var(--spacing-md);
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.history-brief {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.history-time {
  font-size: var(--font-size-xs);
  color: var(--text-placeholder);
}

.history-remove {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-placeholder);
}

.history-remove svg {
  width: 18px;
  height: 18px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) * 2;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: var(--text-placeholder);
  margin-bottom: var(--spacing-md);
}

.empty-text {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
  margin-bottom: var(--spacing-lg);
}

.empty-btn {
  padding: var(--spacing-sm) var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: #fff;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
}
</style>
