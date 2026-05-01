<template>
  <div class="my-stories page-container">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="page-title">我的发布</h2>
      <div class="placeholder"></div>
    </div>

    <div v-if="stories.length > 0" class="stories-list">
      <StoryCard 
        v-for="story in stories" 
        :key="story.id" 
        :item="story"
        :showDelete="true"
        @delete="handleDelete(story.id)"
      />
    </div>

    <div v-else class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
      </svg>
      <p class="empty-text">暂无发布的故事</p>
      <p class="empty-hint">分享你的节气小故事吧</p>
      <button class="empty-btn" @click="goToPublish">去发布</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storyApi } from '@/api'
import type { Story } from '@/data/stories'
import { useUserStore } from '@/stores/user'
import StoryCard from '@/components/StoryCard.vue'

const router = useRouter()
const userStore = useUserStore()

const stories = ref<Story[]>([])

const loadStories = async () => {
  if (!userStore.user) return
  
  const res = await storyApi.getByUserId(userStore.user.id, { page: 1, pageSize: 20 })
  if (res.data) {
    stories.value = res.data.list
  }
}

const handleDelete = async (storyId: string) => {
  const res = await storyApi.delete(storyId)
  if (res.data) {
    stories.value = stories.value.filter(s => s.id !== storyId)
  }
}

const goToPublish = () => {
  router.push('/publish')
}

onMounted(() => {
  userStore.checkLoginAndExecute(() => {
    loadStories()
  })
})
</script>

<style lang="css" scoped>
.my-stories {
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

.stories-list {
  padding: var(--spacing-md);
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
