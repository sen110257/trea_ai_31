<template>
  <div class="solar-term-card card" @click="handleClick">
    <div class="card-image">
      <img 
        :src="item.image" 
        :alt="item.name"
        :class="{ 'img-error': imgError }"
        @error="handleImgError"
        @load="imgLoaded = true"
      />
      <div v-if="!imgLoaded && !imgError" class="img-loading">
        <svg class="loading-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="30" stroke-dashoffset="10"/>
        </svg>
      </div>
      <div v-if="imgError" class="img-placeholder">
        <svg class="placeholder-icon" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="card-season-tag" :style="{ background: seasonColor }">
        {{ item.seasonName }}
      </div>
      <div v-if="showFavorite && isFavorited" class="card-favorite-icon">
        <svg viewBox="0 0 24 24" fill="#e64a19">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </div>
    </div>
    <div class="card-content">
      <h4 class="card-title">{{ item.name }}</h4>
      <p class="card-brief text-ellipsis-2">{{ item.brief }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { SolarTerm } from '@/data/solarTerms'
import { seasonMap } from '@/data/solarTerms'
import { useFavoritesStore } from '@/stores/favorites'

interface Props {
  item: SolarTerm
  showFavorite?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showFavorite: false
})

const router = useRouter()
const favoritesStore = useFavoritesStore()

const imgError = ref(false)
const imgLoaded = ref(false)

const seasonColor = computed(() => seasonMap[props.item.season]?.color || '#666')

const isFavorited = computed(() => favoritesStore.isFavorite(props.item.id))

const handleClick = () => {
  router.push(`/detail/${props.item.id}`)
}

const handleImgError = () => {
  imgError.value = true
}
</script>

<style lang="css" scoped>
.solar-term-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.solar-term-card:active {
  transform: scale(0.98);
}

.card-image {
  position: relative;
  width: 100%;
  height: 160px;
  background: var(--bg-secondary);
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card-image:hover img {
  transform: scale(1.05);
}

.img-error {
  display: none;
}

.img-loading,
.img-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
}

.loading-icon {
  width: 32px;
  height: 32px;
  color: var(--text-placeholder);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.placeholder-icon {
  width: 48px;
  height: 48px;
  color: var(--text-placeholder);
  opacity: 0.5;
}

.card-season-tag {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: var(--font-size-xs);
  color: #fff;
  font-weight: 500;
}

.card-favorite-icon {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  width: 24px;
  height: 24px;
}

.card-favorite-icon svg {
  width: 100%;
  height: 100%;
}

.card-content {
  padding: var(--spacing-md);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.card-brief {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
