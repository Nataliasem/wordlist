import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const selectedCategory = ref(null)
  const selectedCategoryId = computed(() => selectedCategory.value?.id || null)
  const selectedCategoryName = computed(() => selectedCategory.value?.name || '')
  const selectCategory = (category) => {
    selectedCategory.value= category
  }

  return {
    selectedCategory,
    selectedCategoryId,
    selectedCategoryName,
    selectCategory
  }
})
