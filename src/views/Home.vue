<template>
  <div class="home page-container">
    <div class="search-section">
      <div class="search-box" @click="showSearch = true">
        <svg class="search-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <span class="search-placeholder">搜索节气名称、民俗关键词</span>
      </div>
    </div>

    <div class="banner-section">
      <div class="banner-container" ref="bannerRef" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <div 
          v-for="(banner, index) in banners" 
          :key="index"
          class="banner-slide"
          :style="{ transform: `translateX(${(index - currentBanner) * 100}%)` }"
        >
          <img :src="banner.image" :alt="banner.title" />
          <div class="banner-overlay">
            <h3 class="banner-title">{{ banner.title }}</h3>
            <p class="banner-desc">{{ banner.desc }}</p>
          </div>
        </div>
      </div>
      <div class="banner-dots">
        <span 
          v-for="(_, index) in banners" 
          :key="index"
          class="banner-dot"
          :class="{ active: index === currentBanner }"
        ></span>
      </div>
    </div>

    <div class="today-section card">
      <div class="section-header">
        <h3 class="section-title">今日节气</h3>
      </div>
      <div v-if="todaySolarTerm" class="today-content" @click="goToDetail(todaySolarTerm.id)">
        <img class="today-image" :src="todaySolarTerm.image" :alt="todaySolarTerm.name" />
        <div class="today-info">
          <div class="today-name-row">
            <h4 class="today-name">{{ todaySolarTerm.name }}</h4>
            <span class="today-season" :style="{ background: seasonMap[todaySolarTerm.season]?.color }">
              {{ todaySolarTerm.seasonName }}
            </span>
          </div>
          <p class="today-date">{{ todaySolarTerm.solarDate }}</p>
          <p class="today-brief">{{ todaySolarTerm.brief }}</p>
        </div>
      </div>
    </div>

    <div class="tags-section">
      <h3 class="section-title">快速浏览</h3>
      <div class="tags-container" ref="tagsRef">
        <button 
          v-for="(term, index) in allSolarTerms" 
          :key="term.id"
          class="tag-btn"
          :class="{ active: activeTagIndex === index }"
          @click="handleTagClick(term, index)"
        >
          {{ term.name }}
        </button>
      </div>
    </div>

    <div class="list-section">
      <div class="section-header">
        <h3 class="section-title">全部节气</h3>
        <button class="section-more" @click="goToCategory">查看全部</button>
      </div>
      <div class="grid-container">
        <SolarTermCard 
          v-for="term in displayTerms" 
          :key="term.id" 
          :item="term"
        />
      </div>
      
      <div v-if="loading" class="loading-more">
        <svg class="loading-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="30" stroke-dashoffset="10"/>
        </svg>
        <span>加载中...</span>
      </div>
      
      <div v-if="hasMore && !loading" class="pull-hint" v-show="isPulling">
        {{ pullText }}
      </div>
    </div>

    <div v-if="showSearch" class="search-overlay" @click.self="showSearch = false">
      <div class="search-panel">
        <div class="search-input-row">
          <input 
            v-model="searchKeyword" 
            class="search-input-full" 
            placeholder="搜索节气名称、民俗关键词"
            @input="handleSearch"
            autofocus
          />
          <button class="search-cancel" @click="showSearch = false">取消</button>
        </div>
        
        <div v-if="searchKeyword" class="search-results">
          <div v-if="searchResults.length === 0" class="empty-state">
            <p>没有找到相关节气</p>
          </div>
          <div v-else class="search-result-list">
            <div 
              v-for="term in searchResults" 
              :key="term.id"
              class="search-result-item"
              @click="goToDetail(term.id)"
            >
              <svg class="search-result-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <div class="search-result-info">
                <span class="search-result-name">{{ term.name }}</span>
                <span class="search-result-brief">{{ term.brief }}</span>
              </div>
              <svg class="search-result-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div v-else class="search-hot">
          <h4 class="search-hot-title">热门搜索</h4>
          <div class="search-hot-tags">
            <button 
              v-for="tag in hotTags" 
              :key="tag"
              class="hot-tag-btn"
              @click="searchKeyword = tag; handleSearch()"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { SolarTerm } from '@/data/solarTerms'
import { solarTerms as allSolarTerms, seasonMap, getSolarTermById } from '@/data/solarTerms'
import { solarTermApi } from '@/api'
import { useHistoryStore } from '@/stores/history'
import SolarTermCard from '@/components/SolarTermCard.vue'

const router = useRouter()
const historyStore = useHistoryStore()

const showSearch = ref(false)
const searchKeyword = ref('')
const searchResults = ref<SolarTerm[]>([])
const hotTags = ['立春', '清明', '夏至', '冬至', '中秋', '饺子', '青团']

const todaySolarTerm = ref<SolarTerm | null>(null)
const currentBanner = ref(0)
const activeTagIndex = ref(0)

const page = ref(1)
const pageSize = ref(6)
const loading = ref(false)
const hasMore = ref(true)
const displayTerms = ref<SolarTerm[]>([])

const isPulling = ref(false)
const pullDistance = ref(0)
const pullText = ref('下拉刷新')

const bannerRef = ref<HTMLElement | null>(null)
const tagsRef = ref<HTMLElement | null>(null)

let bannerTimer: number | null = null
let touchStartX = 0
let touchStartY = 0

const banners = computed(() => {
  const bannerTerms = allSolarTerms.filter((_, index) => index % 6 === 0)
  return bannerTerms.map(term => ({
    image: term.image,
    title: term.name,
    desc: term.brief,
    id: term.id
  }))
})

const startBannerTimer = () => {
  bannerTimer = window.setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length
  }, 4000)
}

const stopBannerTimer = () => {
  if (bannerTimer) {
    clearInterval(bannerTimer)
    bannerTimer = null
  }
}

const handleTouchStart = (e: TouchEvent) => {
  stopBannerTimer()
  touchStartX = e.touches[0].clientX
}

const handleTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchStartX - touchEndX
  
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentBanner.value = Math.min(currentBanner.value + 1, banners.value.length - 1)
    } else {
      currentBanner.value = Math.max(currentBanner.value - 1, 0)
    }
  }
  
  startBannerTimer()
}

const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    searchResults.value = []
    return
  }
  searchResults.value = allSolarTerms.filter(st => 
    st.name.includes(searchKeyword.value) ||
    st.relatedKeywords.some(k => k.includes(searchKeyword.value)) ||
    st.customs.some(c => c.includes(searchKeyword.value))
  )
}

const handleTagClick = (term: SolarTerm, index: number) => {
  activeTagIndex.value = index
  goToDetail(term.id)
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

const goToCategory = () => {
  router.push('/category')
}

const loadMore = async () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const res = await solarTermApi.getList({ page: page.value, pageSize: pageSize.value })
    if (res.data) {
      const newTerms = res.data.list
      displayTerms.value = [...displayTerms.value, ...newTerms]
      
      if (newTerms.length < pageSize.value) {
        hasMore.value = false
      } else {
        page.value++
      }
    }
  } finally {
    loading.value = false
  }
}

const initData = async () => {
  const todayRes = await solarTermApi.getToday()
  if (todayRes.data) {
    todaySolarTerm.value = todayRes.data
  }
  
  await loadMore()
  startBannerTimer()
}

onMounted(() => {
  initData()
})

onUnmounted(() => {
  stopBannerTimer()
})
</script>

<style lang="css" scoped>
.home {
  padding-bottom: 80px;
}

.search-section {
  padding: var(--spacing-md);
  background: linear-gradient(180deg, var(--primary-light), var(--bg-primary));
}

.search-box {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.search-icon {
  width: 20px;
  height: 20px;
  color: var(--text-placeholder);
  margin-right: var(--spacing-sm);
}

.search-placeholder {
  color: var(--text-placeholder);
  font-size: var(--font-size-sm);
}

.banner-section {
  margin: var(--spacing-md);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.banner-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.banner-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-lg);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
}

.banner-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: #fff;
  margin-bottom: var(--spacing-xs);
}

.banner-desc {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.85);
}

.banner-dots {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: var(--bg-card);
}

.banner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-placeholder);
  transition: all 0.3s;
}

.banner-dot.active {
  width: 16px;
  border-radius: 3px;
  background: var(--primary-color);
}

.today-section {
  margin: var(--spacing-md);
  padding: var(--spacing-md);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.section-more {
  font-size: var(--font-size-sm);
  color: var(--primary-color);
}

.today-content {
  display: flex;
  gap: var(--spacing-md);
}

.today-image {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.today-info {
  flex: 1;
}

.today-name-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.today-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.today-season {
  padding: 2px 8px;
  border-radius: 20px;
  font-size: var(--font-size-xs);
  color: #fff;
}

.today-date {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.today-brief {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}

.tags-section {
  padding: var(--spacing-md);
}

.tags-container {
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding: var(--spacing-sm) 0;
  scrollbar-width: none;
}

.tags-container::-webkit-scrollbar {
  display: none;
}

.tag-btn {
  flex-shrink: 0;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
}

.tag-btn.active {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: #fff;
}

.list-section {
  padding: var(--spacing-md);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  color: var(--text-placeholder);
  font-size: var(--font-size-sm);
}

.loading-icon {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.pull-hint {
  text-align: center;
  padding: var(--spacing-md);
  color: var(--text-placeholder);
  font-size: var(--font-size-sm);
}

.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  z-index: 200;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.search-panel {
  padding: var(--spacing-md);
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.search-input-full {
  flex: 1;
  height: 44px;
  padding: 0 var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
}

.search-cancel {
  font-size: var(--font-size-md);
  color: var(--primary-color);
}

.search-hot-title {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.search-hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.hot-tag-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  box-shadow: var(--shadow-sm);
}

.search-result-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
}

.search-result-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.search-result-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-result-name {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-primary);
}

.search-result-brief {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.search-result-arrow {
  width: 20px;
  height: 20px;
  color: var(--text-placeholder);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-placeholder);
}
</style>
