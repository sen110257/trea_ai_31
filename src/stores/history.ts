import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface HistoryItem {
  id: string
  solarTermId: string
  name: string
  season: string
  image: string
  brief: string
  viewedAt: number
}

export const useHistoryStore = defineStore('history', () => {
  const history = ref<HistoryItem[]>([])

  const loadFromStorage = () => {
    const stored = localStorage.getItem('history')
    if (stored) {
      history.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('history', JSON.stringify(history.value))
  }

  const addHistory = (item: Omit<HistoryItem, 'id' | 'viewedAt'>) => {
    const index = history.value.findIndex(h => h.solarTermId === item.solarTermId)
    if (index > -1) {
      history.value.splice(index, 1)
    }
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      viewedAt: Date.now()
    }
    history.value.unshift(newItem)
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
    saveToStorage()
  }

  const removeHistory = (solarTermId: string) => {
    const index = history.value.findIndex(item => item.solarTermId === solarTermId)
    if (index > -1) {
      history.value.splice(index, 1)
      saveToStorage()
    }
  }

  const clearHistory = () => {
    history.value = []
    saveToStorage()
  }

  return {
    history,
    loadFromStorage,
    addHistory,
    removeHistory,
    clearHistory
  }
})
