import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface FavoriteItem {
  id: string
  solarTermId: string
  name: string
  season: string
  image: string
  brief: string
  addedAt: number
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<FavoriteItem[]>([])

  const loadFromStorage = () => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      favorites.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const isFavorite = computed(() => (solarTermId: string) => {
    return favorites.value.some(item => item.solarTermId === solarTermId)
  })

  const addFavorite = (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    const exists = favorites.value.find(f => f.solarTermId === item.solarTermId)
    if (!exists) {
      const newItem: FavoriteItem = {
        ...item,
        id: Date.now().toString(),
        addedAt: Date.now()
      }
      favorites.value.unshift(newItem)
      saveToStorage()
    }
  }

  const removeFavorite = (solarTermId: string) => {
    const index = favorites.value.findIndex(item => item.solarTermId === solarTermId)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveToStorage()
    }
  }

  const toggleFavorite = (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    if (isFavorite.value(item.solarTermId)) {
      removeFavorite(item.solarTermId)
    } else {
      addFavorite(item)
    }
  }

  const clearFavorites = () => {
    favorites.value = []
    saveToStorage()
  }

  return {
    favorites,
    isFavorite,
    loadFromStorage,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites
  }
})
