import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

import { CATEGORY_URL } from '../constants.js'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      isFetching: false,
      error: null,
      categories: [],
      selectedCategory: null
    }
  },
  getters: {
    isEmpty: (state) => {
      return !state?.isFetching && (state?.error || !state?.categories.length)
    },
    selectedCategoryId: (state) => state?.selectedCategory?.id || null
  },
  actions: {
    async fetchCategories() {
      const { isFetching, error, data } =  await useFetch(CATEGORY_URL).get().json()
      this.isFetching = isFetching
      this.error = error
      this.categories = data
    },
    selectCategory(category) {
      this.selectedCategory = category
    }
  }
})
