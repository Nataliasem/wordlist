import { defineStore } from 'pinia'
import { getCategories } from '../api/category.js'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: [],
      selectedCategory: null
    }
  },
  actions: {
    async fetchCategories() {
      this.categories = await getCategories()
    },
    selectCategory(category) {
      this.selectedCategory = category
    }
  }
})
