import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { Category } from '@/types'

export const useCategoryStore = defineStore('category', () => {
  const selectedCategory: Ref<Category | null> = ref(null)
  const selectedCategoryId = computed<number | null>(() => selectedCategory.value?.id || null)
  const selectedCategoryName = computed(() => selectedCategory.value?.name || '')
  const selectCategory = (category: Category): void => {
    selectedCategory.value= category
  }

  return {
    selectedCategory,
    selectedCategoryId,
    selectedCategoryName,
    selectCategory
  }
})
