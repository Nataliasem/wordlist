import { defineStore } from 'pinia'
import { getWordlist } from '../api/word.js'
import { useCategoryStore } from './category.js'


export const useWordStore = defineStore('word', {
  state: () => {
    return {
      words: []
    }
  }, actions: {
    async fetchWords() {
      const categoryStore = useCategoryStore()
      this.words = await getWordlist(categoryStore.selectedCategory?.id || null)
    }
  }
})
