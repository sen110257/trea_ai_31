<template>
  <div class="detail" v-if="solarTerm">
    <div class="detail-header">
      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="header-title">{{ solarTerm.name }}</h2>
      <div class="placeholder"></div>
    </div>

    <div class="detail-image">
      <img :src="solarTerm.image" :alt="solarTerm.name" />
      <div class="image-overlay">
        <span class="season-tag" :style="{ background: seasonMap[solarTerm.season]?.color }">
          {{ solarTerm.seasonName }}季
        </span>
      </div>
    </div>

    <div class="detail-info card">
      <h1 class="detail-name">{{ solarTerm.name }}</h1>
      <div class="detail-dates">
        <span class="date-item">
          <span class="date-label">公历</span>
          <span class="date-value">{{ solarTerm.solarDate }}</span>
        </span>
        <span class="date-divider"></span>
        <span class="date-item">
          <span class="date-label">农历</span>
          <span class="date-value">{{ solarTerm.lunarDate }}</span>
        </span>
      </div>
      <p class="detail-brief">{{ solarTerm.brief }}</p>
    </div>

    <div class="detail-sections">
      <div class="section card" v-for="(section, index) in sections" :key="index">
        <div class="section-header">
          <span class="section-icon" :style="{ background: section.color }">{{ section.icon }}</span>
          <h3 class="section-title">{{ section.title }}</h3>
        </div>
        <div class="section-content">
          <div v-for="(item, idx) in section.items" :key="idx" class="section-item">
            <span class="item-bullet" :style="{ background: section.color }"></span>
            <span class="item-text">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="stories-section">
      <div class="section-header">
        <h3 class="section-title">相关小故事</h3>
      </div>
      <div v-if="stories.length > 0">
        <StoryCard v-for="story in stories" :key="story.id" :item="story" />
      </div>
      <div v-else class="empty-stories">
        <svg class="empty-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
        </svg>
        <p>暂无相关小故事</p>
        <button class="empty-btn" @click="goToPublish">去发布一个</button>
      </div>
    </div>

    <div class="bottom-actions">
      <button class="action-btn" :class="{ active: isFavorited }" @click="handleFavorite">
        <svg viewBox="0 0 24 24" :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
        <span>{{ isFavorited ? '已收藏' : '收藏' }}</span>
      </button>
      <button class="action-btn" @click="handleCopy">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
        <span>复制文案</span>
      </button>
      <button class="action-btn" @click="handleShare">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <span>分享</span>
      </button>
    </div>

    <div v-if="showSharePopup" class="share-overlay" @click="showSharePopup = false">
      <div class="share-popup" @click.stop>
        <h4 class="share-title">分享到</h4>
        <div class="share-options">
          <button class="share-option" v-for="option in shareOptions" :key="option.name">
            <span class="share-icon" :style="{ background: option.color }">
              {{ option.icon }}
            </span>
            <span class="share-label">{{ option.name }}</span>
          </button>
        </div>
        <button class="share-cancel" @click="showSharePopup = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { SolarTerm } from '@/data/solarTerms'
import { getSolarTermById, seasonMap } from '@/data/solarTerms'
import { storyApi } from '@/api'
import type { Story } from '@/data/stories'
import { useFavoritesStore } from '@/stores/favorites'
import { useUserStore } from '@/stores/user'
import { useHistoryStore } from '@/stores/history'
import StoryCard from '@/components/StoryCard.vue'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const userStore = useUserStore()
const historyStore = useHistoryStore()

const solarTermId = computed(() => route.params.id as string)
const solarTerm = ref<SolarTerm | null>(null)
const stories = ref<Story[]>([])
const showSharePopup = ref(false)

const isFavorited = computed(() => favoritesStore.isFavorite(solarTermId.value))

const sections = computed(() => {
  if (!solarTerm.value) return []
  return [
    {
      title: '民俗习俗',
      icon: '🎊',
      color: '#c9a86c',
      items: solarTerm.value.customs
    },
    {
      title: '传统饮食',
      icon: '🍜',
      color: '#e64a19',
      items: solarTerm.value.food
    },
    {
      title: '忌讳禁忌',
      icon: '⚠️',
      color: '#ff9800',
      items: solarTerm.value.taboos
    },
    {
      title: '节气养生',
      icon: '💚',
      color: '#5a7c65',
      items: solarTerm.value.health
    }
  ]
})

const shareOptions = [
  { name: '微信', icon: '微', color: '#07c160' },
  { name: '朋友圈', icon: '朋', color: '#07c160' },
  { name: 'QQ', icon: 'Q', color: '#12b7f5' },
  { name: '微博', icon: '微', color: '#e6162d' },
  { name: '复制链接', icon: '链', color: '#666' }
]

const goToPublish = () => {
  userStore.checkLoginAndExecute(() => {
    router.push('/publish')
  })
}

const handleFavorite = () => {
  userStore.checkLoginAndExecute(() => {
    if (!solarTerm.value) return
    favoritesStore.toggleFavorite({
      solarTermId: solarTerm.value.id,
      name: solarTerm.value.name,
      season: solarTerm.value.season,
      image: solarTerm.value.image,
      brief: solarTerm.value.brief
    })
  })
}

const handleCopy = () => {
  userStore.checkLoginAndExecute(() => {
    if (!solarTerm.value) return
    const text = solarTerm.value.copyText
    navigator.clipboard.writeText(text).then(() => {
      alert('文案已复制到剪贴板')
    }).catch(() => {
      alert('复制失败，请手动复制')
    })
  })
}

const handleShare = () => {
  userStore.checkLoginAndExecute(() => {
    showSharePopup.value = true
  })
}

const loadStories = async () => {
  const res = await storyApi.getBySolarTermId(solarTermId.value, { page: 1, pageSize: 10 })
  if (res.data) {
    stories.value = res.data.list
  }
}

onMounted(() => {
  const term = getSolarTermById(solarTermId.value)
  if (term) {
    solarTerm.value = term
    historyStore.addHistory({
      solarTermId: term.id,
      name: term.name,
      season: term.season,
      image: term.image,
      brief: term.brief
    })
  }
  favoritesStore.loadFromStorage()
  loadStories()
})
</script>

<style lang="css" scoped>
.detail {
  padding-bottom: 80px;
  background: var(--bg-primary);
}

.detail-header {
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

.header-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.placeholder {
  width: 32px;
}

.detail-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
}

.season-tag {
  padding: 4px 16px;
  border-radius: 20px;
  font-size: var(--font-size-sm);
  color: #fff;
  font-weight: 500;
}

.detail-info {
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
}

.detail-name {
  font-size: var(--font-size-xxl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.detail-dates {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.date-item {
  display: flex;
  flex-direction: column;
}

.date-label {
  font-size: var(--font-size-xs);
  color: var(--text-placeholder);
  margin-bottom: 2px;
}

.date-value {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.date-divider {
  width: 1px;
  height: 24px;
  background: var(--border-color);
  margin: 0 var(--spacing-lg);
}

.detail-brief {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.8;
}

.detail-sections {
  padding: 0 var(--spacing-md);
}

.section {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.section-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-md);
  margin-right: var(--spacing-sm);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.section-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.item-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

.item-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.8;
}

.stories-section {
  padding: var(--spacing-md);
}

.empty-stories {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xl);
  background: var(--bg-card);
  border-radius: var(--radius-lg);
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: var(--text-placeholder);
  margin-bottom: var(--spacing-md);
}

.empty-stories p {
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
  margin-bottom: var(--spacing-md);
}

.empty-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--primary-color);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--bg-card);
  padding: var(--spacing-md);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  gap: var(--spacing-sm);
}

.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm);
  color: var(--text-secondary);
  transition: color 0.2s;
}

.action-btn.active {
  color: #e64a19;
}

.action-btn svg {
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
}

.action-btn span {
  font-size: var(--font-size-xs);
}

.share-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.share-popup {
  width: 100%;
  background: var(--bg-card);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: var(--spacing-lg);
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.share-title {
  text-align: center;
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.share-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.share-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.share-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  color: #fff;
}

.share-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.share-cancel {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  color: var(--text-primary);
}
</style>
