import { defineStore } from 'pinia'
import { create, update, remove, getCategories } from '../api/category.js'
import { computed, ref } from 'vue'
import { useCustomFetch } from '../composables/useCustomFetch.js'

export const useCategoryStore = defineStore('category', () => {
  const {
    isFetching,
    isEmpty,
    hasError,
    data: categories,
    fetchData: fetchCategories
  } = useCustomFetch(getCategories)

  const createCategory = async (category) => {
    await create(category)
    await fetchCategories()
  }
  const updateCategory = async (category) => {
    await update(category)
    await fetchCategories()
  }
  const deleteCategory = async (id) => {
    await remove(id)
    await fetchCategories()
  }

  const selectedCategory = ref(null)
  const selectedCategoryId = computed(() => selectedCategory.value?.id || null)
  const selectedCategoryName = computed(() => selectedCategory.value?.name || '')
  const selectCategory = (category) => {
    selectedCategory.value= category
  }
  const selectFirstCategoryAsDefault = () => {
    if(!isEmpty.value) {
      selectCategory(categories.value[0])
    }
  }

  return {
    isFetching,
    categories,
    isEmpty,
    hasError,
    fetchCategories,
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
