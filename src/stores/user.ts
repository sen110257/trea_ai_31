import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  nickname: string
  avatar: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const showLoginModal = ref(false)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  const loadFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser)
      token.value = storedToken
    }
  }

  const login = (userData: User, userToken: string) => {
    user.value = userData
    token.value = userToken
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', userToken)
    showLoginModal.value = false
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const openLoginModal = () => {
    showLoginModal.value = true
  }

  const closeLoginModal = () => {
    showLoginModal.value = false
  }

  const checkLoginAndExecute = (action: () => void) => {
    if (isLoggedIn.value) {
      action()
    } else {
      openLoginModal()
    }
  }

  return {
    user,
    token,
    showLoginModal,
    isLoggedIn,
    loadFromStorage,
    login,
    logout,
    openLoginModal,
    closeLoginModal,
    checkLoginAndExecute
  }
})
