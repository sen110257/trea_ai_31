<template>
  <div class="publish page-container">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="page-title">发布民俗小故事</h2>
      <div class="placeholder"></div>
    </div>

    <div class="publish-form">
      <div class="form-group">
        <label class="form-label">
          选择相关节气
          <span class="required">*</span>
        </label>
        <div class="form-select" @click="showSolarTermPicker = true">
          <span :class="{ 'form-value': selectedSolarTerm, 'form-placeholder': !selectedSolarTerm }">
            {{ selectedSolarTerm ? selectedSolarTerm.name : '请选择节气' }}
          </span>
          <svg class="form-arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">
          故事标题
          <span class="required">*</span>
        </label>
        <input 
          v-model="form.title" 
          type="text" 
          class="form-input" 
          placeholder="请输入故事标题（10-50字）"
          maxlength="50"
        />
        <div class="form-counter">{{ form.title.length }}/50</div>
      </div>

      <div class="form-group">
        <label class="form-label">
          故事配图
          <span class="optional">（可选）</span>
        </label>
        <div class="image-upload">
          <div v-if="form.image" class="uploaded-image">
            <img :src="form.image" alt="配图" />
            <button class="image-remove" @click.stop="removeImage">
              <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <label v-else class="upload-placeholder">
            <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span>点击上传图片</span>
            <input type="file" accept="image/*" @change="handleImageUpload" hidden />
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">
          故事正文
          <span class="required">*</span>
        </label>
        <textarea 
          v-model="form.content" 
          class="form-textarea" 
          placeholder="请输入故事正文（50-500字）"
          rows="8"
          maxlength="500"
        ></textarea>
        <div class="form-counter">{{ form.content.length }}/500</div>
      </div>

      <div class="form-tips">
        <p class="tip-item">· 请确保故事内容与所选节气相关</p>
        <p class="tip-item">· 内容积极向上，符合民俗文化主题</p>
        <p class="tip-item">· 您发布的故事将显示在对应节气的详情页</p>
      </div>
    </div>

    <div class="publish-footer">
      <button 
        class="publish-btn" 
        :class="{ disabled: !canSubmit || publishing }"
        :disabled="publishing"
        @click="handlePublish"
      >
        {{ publishing ? '发布中...' : '发布故事' }}
      </button>
    </div>

    <div v-if="showSolarTermPicker" class="picker-overlay" @click="showSolarTermPicker = false">
      <div class="picker-content" @click.stop>
        <div class="picker-header">
          <h4 class="picker-title">选择节气</h4>
          <button class="picker-close" @click="showSolarTermPicker = false">
            取消
          </button>
        </div>
        <div class="picker-tabs">
          <button 
            v-for="(season, key) in seasonGroups" 
            :key="key"
            class="picker-tab"
            :class="{ active: selectedSeason === key }"
            @click="selectedSeason = key"
          >
            {{ seasonMap[key]?.name }}
          </button>
        </div>
        <div class="picker-list">
          <button 
            v-for="term in seasonGroups[selectedSeason]" 
            :key="term.id"
            class="picker-item"
            :class="{ active: selectedSolarTerm?.id === term.id }"
            @click="handleSelectSolarTerm(term)"
          >
            {{ term.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { solarTerms, seasonMap } from '@/data/solarTerms'
import type { SolarTerm } from '@/data/solarTerms'
import { storyApi } from '@/api'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  title: '',
  content: '',
  image: ''
})

const selectedSolarTerm = ref<SolarTerm | null>(null)
const showSolarTermPicker = ref(false)
const selectedSeason = ref('spring')
const publishing = ref(false)

const seasonGroups = computed(() => {
  const groups: Record<string, SolarTerm[]> = {
    spring: [],
    summer: [],
    autumn: [],
    winter: []
  }
  solarTerms.forEach(st => {
    groups[st.season].push(st)
  })
  return groups
})

const canSubmit = computed(() => {
  if (!selectedSolarTerm.value) return false
  if (!form.value.title.trim() || form.value.title.length < 10) return false
  if (!form.value.content.trim() || form.value.content.length < 50) return false
  return true
})

const handleImageUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      form.value.image = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  form.value.image = ''
}

const handleSelectSolarTerm = (term: SolarTerm) => {
  selectedSolarTerm.value = term
  showSolarTermPicker.value = false
}

const handlePublish = async () => {
  if (!canSubmit.value) {
    if (!selectedSolarTerm.value) {
      alert('请选择相关节气')
    } else if (!form.value.title.trim() || form.value.title.length < 10) {
      alert('标题至少需要10个字')
    } else if (!form.value.content.trim() || form.value.content.length < 50) {
      alert('正文至少需要50个字')
    }
    return
  }

  userStore.checkLoginAndExecute(async () => {
    publishing.value = true
    try {
      const res = await storyApi.create({
        title: form.value.title,
        content: form.value.content,
        image: form.value.image || null,
        solarTermId: selectedSolarTerm.value!.id,
        solarTermName: selectedSolarTerm.value!.name,
        author: {
          id: userStore.user!.id,
          nickname: userStore.user!.nickname,
          avatar: userStore.user!.avatar
        }
      })
      
      if (res.data) {
        alert('发布成功！')
        router.back()
      }
    } catch (e) {
      alert('发布失败，请重试')
    } finally {
      publishing.value = false
    }
  })
}

onMounted(() => {
  userStore.checkLoginAndExecute(() => {})
})
</script>

<style lang="css" scoped>
.publish {
  background: var(--bg-primary);
  padding-bottom: 100px;
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

.publish-form {
  padding: var(--spacing-md);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: flex;
  align-items: center;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.required {
  color: #e64a19;
  margin-left: 4px;
}

.optional {
  color: var(--text-placeholder);
  margin-left: 4px;
  font-size: var(--font-size-xs);
}

.form-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.form-value {
  color: var(--text-primary);
}

.form-placeholder {
  color: var(--text-placeholder);
}

.form-arrow {
  width: 20px;
  height: 20px;
  color: var(--text-placeholder);
}

.form-input {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

.form-input::placeholder {
  color: var(--text-placeholder);
}

.form-counter {
  text-align: right;
  font-size: var(--font-size-xs);
  color: var(--text-placeholder);
  margin-top: var(--spacing-xs);
}

.image-upload {
  width: 120px;
  height: 120px;
}

.uploaded-image {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.uploaded-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.image-remove svg {
  width: 14px;
  height: 14px;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px dashed var(--border-color);
  color: var(--text-placeholder);
  font-size: var(--font-size-xs);
  cursor: pointer;
}

.upload-placeholder svg {
  width: 32px;
  height: 32px;
  margin-bottom: var(--spacing-xs);
}

.form-textarea {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  resize: none;
  line-height: 1.8;
}

.form-textarea::placeholder {
  color: var(--text-placeholder);
}

.form-tips {
  padding: var(--spacing-md);
  background: rgba(90, 124, 101, 0.1);
  border-radius: var(--radius-md);
}

.tip-item {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  line-height: 1.8;
}

.publish-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-md);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
  background: var(--bg-card);
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
}

.publish-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: #fff;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
  font-weight: 500;
}

.publish-btn.disabled {
  opacity: 0.5;
}

.picker-overlay {
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

.picker-content {
  width: 100%;
  background: var(--bg-card);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.picker-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
}

.picker-close {
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
}

.picker-tabs {
  display: flex;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
}

.picker-tab {
  flex: 1;
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
}

.picker-tab.active {
  background: var(--bg-card);
  color: var(--primary-color);
  font-weight: 500;
}

.picker-list {
  max-height: 300px;
  overflow-y: auto;
  padding: var(--spacing-sm);
}

.picker-item {
  width: 100%;
  padding: var(--spacing-md);
  text-align: center;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
}

.picker-item.active {
  background: rgba(90, 124, 101, 0.1);
  color: var(--primary-color);
  font-weight: 600;
}
</style>
