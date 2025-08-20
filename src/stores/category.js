import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import { useWordStore } from './word.js'

import { CATEGORY_URL } from '../constants.js'
import { create, update, remove, } from '../api/category.js'

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
    async createCategory(category) {
      const newCategory = await create(category)
      this.selectCategory(newCategory)
      await this.fetchCategories()
    },
    async fetchCategories() {
      const { isFetching, error, data } =  await useFetch(CATEGORY_URL).get().json()
      this.isFetching = isFetching
      this.error = error
      this.categories = data
    },
    async updateCategory(category) {
      const wordStore = useWordStore()
      await update(category)
      await this.fetchCategories()
      await wordStore.fetchWords()
      this.selectCategory(category)
    },
    async deleteCategory(id) {
      await remove(id)
      await this.fetchCategories()
      if (this.categories.length > 0) {
        this.selectCategory(this.categories[0])
      }
    },
    selectCategory(category) {
      this.selectedCategory = category
    }
  }
})
