<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <AppTabbar v-if="showTabbar" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppTabbar from '@/components/AppTabbar.vue'
import LoginModal from '@/components/LoginModal.vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()

const showTabbar = computed(() => {
  const noTabbarRoutes = ['/detail', '/publish', '/settings', '/my-stories', '/category']
  return !noTabbarRoutes.some(r => route.path.startsWith(r))
})

const showLoginModal = computed(() => userStore.showLoginModal)

watch(
  () => userStore.showLoginModal,
  (val) => {
    if (val) {
      // 打开登录弹窗时的处理
    }
  }
)
</script>

<style lang="css">
.app {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-primary);
}
</style>
