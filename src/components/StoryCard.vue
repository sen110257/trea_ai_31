<template>
  <div class="story-card card" @click="handleClick">
    <div class="story-card-header">
      <img class="story-avatar" :src="item.author.avatar" :alt="item.author.nickname" />
      <div class="story-author-info">
        <span class="story-author-name">{{ item.author.nickname }}</span>
        <span class="story-time">{{ formatTime(item.createdAt) }}</span>
      </div>
    </div>
    <div class="story-card-content">
      <h4 class="story-title">{{ item.title }}</h4>
      <p class="story-content text-ellipsis-2">{{ item.content }}</p>
    </div>
    <div v-if="item.image" class="story-card-image">
      <img :src="item.image" alt="故事配图" />
    </div>
    <div class="story-card-footer">
      <span class="story-tag">{{ item.solarTermName }}</span>
      <div class="story-actions">
        <button class="story-action-btn" :class="{ liked: item.isLiked }" @click.stop="handleLike">
          <svg viewBox="0 0 24 24" :fill="item.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          <span>{{ item.likes }}</span>
        </button>
        <button v-if="showDelete" class="story-action-btn delete" @click.stop="handleDelete">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Story } from '@/data/stories'
import { storyApi } from '@/api'
import { useUserStore } from '@/stores/user'

interface Props {
  item: Story
  showDelete?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDelete: false
})

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'delete'): void
}>()

const userStore = useUserStore()

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

const handleClick = () => {
  emit('click')
}

const handleLike = async () => {
  userStore.checkLoginAndExecute(async () => {
    const res = await storyApi.toggleLike(props.item.id)
    if (res.data !== undefined) {
      props.item.isLiked = res.data
      props.item.likes += res.data ? 1 : -1
    }
  })
}

const handleDelete = () => {
  if (confirm('确定要删除这个故事吗？')) {
    emit('delete')
  }
}
</script>

<style lang="css" scoped>
.story-card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.story-card-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.story-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: var(--spacing-sm);
}

.story-author-info {
  display: flex;
  flex-direction: column;
}

.story-author-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.story-time {
  font-size: var(--font-size-xs);
  color: var(--text-placeholder);
}

.story-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.story-content {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.story-card-image {
  margin-top: var(--spacing-sm);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.story-card-image img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.story-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.story-tag {
  padding: 2px 10px;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: var(--font-size-xs);
  color: var(--primary-color);
}

.story-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.story-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.story-action-btn svg {
  width: 16px;
  height: 16px;
}

.story-action-btn.liked {
  color: #e64a19;
}

.story-action-btn.delete {
  color: #e64a19;
}
</style>
