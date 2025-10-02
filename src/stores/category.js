import { defineStore } from 'pinia'
import { create, update, remove, getCategories } from '@/api/category.ts'
import { computed, ref } from 'vue'
import { useCustomFetch } from '@/composables/index.js'

export const useCategoryStore = defineStore('category', () => {
  const {
    isFetching,
    isEmpty,
    hasError,
    data,
    fetchData
  } = useCustomFetch(getCategories)

  const createCategory = async (category) => {
    await create(category)
    selectCategory(category)
    await fetchData()
  }
  const updateCategory = async (category) => {
    await update(category)
    selectCategory(category)
    await fetchData()
  }
  const deleteCategory = async (id) => {
    await remove(id)
    await fetchData()
  }

  const selectedCategory = ref(null)
  const selectedCategoryId = computed(() => selectedCategory.value?.id || null)
  const selectedCategoryName = computed(() => selectedCategory.value?.name || '')
  const selectCategory = (category) => {
    selectedCategory.value= category
  }
  const selectFirstCategoryAsDefault = () => {
    if(!isEmpty.value) {
      selectCategory(data.value[0])
    }
  }

  return {
    isFetching,
    data,
    isEmpty,
    hasError,
    fetchData,
    createCategory,
    updateCategory,
    deleteCategory,
    selectedCategory,
    selectedCategoryId,
    selectedCategoryName,
    selectCategory,
    selectFirstCategoryAsDefault
  }
})
