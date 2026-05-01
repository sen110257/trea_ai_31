<template>
  <div class="category page-container">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="page-title">节气分类</h2>
      <div class="placeholder"></div>
    </div>

    <div class="season-tabs">
      <button 
        v-for="(season, key) in seasonList" 
        :key="key"
        class="season-tab"
        :class="{ active: activeSeason === key }"
        @click="activeSeason = key"
      >
        <span class="season-dot" :style="{ background: season.color }"></span>
        {{ season.name }}
      </button>
    </div>

    <div class="season-content">
      <div v-for="(season, key) in groupedTerms" :key="key" v-show="activeSeason === key" class="season-section">
        <div class="season-header">
          <h3 class="season-name" :style="{ color: seasonMap[key]?.color }">
            {{ seasonMap[key]?.name }}
          </h3>
          <span class="season-count">{{ season.length }} 个节气</span>
        </div>
        
        <div class="grid-container">
          <SolarTermCard 
            v-for="term in season" 
            :key="term.id" 
            :item="term"
            :showFavorite="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { solarTerms, seasonMap } from '@/data/solarTerms'
import { useFavoritesStore } from '@/stores/favorites'
import SolarTermCard from '@/components/SolarTermCard.vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const activeSeason = ref('spring')

const seasonList = computed(() => {
  return [
    { key: 'spring', name: '春季', color: seasonMap.spring.color },
    { key: 'summer', name: '夏季', color: seasonMap.summer.color },
    { key: 'autumn', name: '秋季', color: seasonMap.autumn.color },
    { key: 'winter', name: '冬季', color: seasonMap.winter.color }
  ]
})

const groupedTerms = computed(() => {
  const grouped: Record<string, typeof solarTerms> = {
    spring: [],
    summer: [],
    autumn: [],
    winter: []
  }
  
  solarTerms.forEach(st => {
    grouped[st.season].push(st)
  })
  
  return grouped
})

onMounted(() => {
  favoritesStore.loadFromStorage()
})
</script>

<style lang="css" scoped>
.category {
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

.placeholder {
  width: 32px;
}

.season-tabs {
  display: flex;
  padding: var(--spacing-md);
  background: var(--bg-card);
  gap: var(--spacing-sm);
}

.season-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  transition: all 0.2s;
}

.season-tab.active {
  background: var(--primary-color);
  color: #fff;
}

.season-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.season-section {
  padding: var(--spacing-md);
}

.season-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.season-name {
  font-size: var(--font-size-xl);
  font-weight: 600;
}

.season-count {
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}
</style>
