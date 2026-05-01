<template>
  <div class="favorites page-container">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="page-title">我的收藏</h2>
      <button v-if="favoritesStore.favorites.length > 0" class="clear-btn" @click="handleClear">
        清空
      </button>
    </div>

    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'favorites' }"
        @click="activeTab = 'favorites'"
      >
        我的收藏
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'history' }"
        @click="router.push('/history')"
      >
        浏览历史
      </button>
    </div>

    <div v-if="favoritesStore.favorites.length > 0" class="favorites-content">
      <div class="grid-container">
        <div 
          v-for="item in favoritesStore.favorites" 
          :key="item.id"
          class="favorite-item card"
          @click="goToDetail(item.solarTermId)"
        >
          <div class="favorite-image">
            <img :src="item.image" :alt="item.name" />
            <button class="favorite-remove" @click.stop="handleRemove(item.solarTermId)">
              <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
          <div class="favorite-info">
            <h4 class="favorite-name">{{ item.name }}</h4>
            <p class="favorite-brief">{{ item.brief }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
      <p class="empty-text">暂无收藏</p>
      <p class="empty-hint">去发现喜欢的节气吧</p>
      <button class="empty-btn" @click="router.push('/home')">去逛逛</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import { useUserStore } from '@/stores/user'
import { getSolarTermById } from '@/data/solarTerms'
import { useHistoryStore } from '@/stores/history'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const userStore = useUserStore()
const historyStore = useHistoryStore()

const activeTab = ref('favorites')

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
  if (confirm('确定要取消收藏吗？')) {
    favoritesStore.removeFavorite(solarTermId)
  }
}

const handleClear = () => {
  if (confirm('确定要清空所有收藏吗？')) {
    favoritesStore.clearFavorites()
  }
}

onMounted(() => {
  userStore.checkLoginAndExecute(() => {
    favoritesStore.loadFromStorage()
  })
})
</script>

<style lang="css" scoped>
.favorites {
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

.favorites-content {
  padding: var(--spacing-md);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.favorite-item {
  position: relative;
  overflow: hidden;
}

.favorite-image {
  position: relative;
  width: 100%;
  height: 120px;
}

.favorite-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-remove {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.favorite-remove svg {
  width: 16px;
  height: 16px;
}

.favorite-info {
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
}

.favorite-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.favorite-brief {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
