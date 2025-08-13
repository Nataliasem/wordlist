import { defineStore } from 'pinia'
import { getCategories } from '../api/category.js'

export const useCategoryStore = defineStore('categories', {
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
