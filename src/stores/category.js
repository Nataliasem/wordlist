import { defineStore } from 'pinia'
import { getCategories } from '../api/category.js'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: [],
      selectedCategory: null
    }
  },
  getters: {
    selectedCategoryId: (state) => state?.selectedCategory?.id || null
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
