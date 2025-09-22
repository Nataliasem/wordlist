import { defineStore } from 'pinia'
import { getWordlist, create, update, remove, changeCategory, removeMany } from '@/api/word.ts'
import { watch } from 'vue'
import { useCategoryStore } from './category'
import { useCustomFetch } from '@/composables/index.js'

export const useWordStore = defineStore('word', () => {
  const {
    isFetching,
    isEmpty,
    hasError,
    data,
    fetchData
  } = useCustomFetch(getWordlist)

  const categoryStore = useCategoryStore()
  // watch full object, not only id
  watch(() => categoryStore.selectedCategory, async () => {
    await fetchData(categoryStore.selectedCategoryId)
  })

  const createWord = async (word) => {
    await create(word)
    await fetchData(categoryStore.selectedCategoryId)
  }
  const updateWord = async (word) => {
    await update(word)
    await fetchData(categoryStore.selectedCategoryId)
  }
  const removeWord = async (id) => {
    await remove(id)
    await fetchData(categoryStore.selectedCategoryId)
  }
  const removeWords = async (ids) => {
    await removeMany(ids)
    await fetchData(categoryStore.selectedCategoryId)
  }
  const changeWordsCategory = async (categoryId, updatedWords) => {
    await changeCategory(categoryId, updatedWords)
    await fetchData(categoryStore.selectedCategoryId)
  }

  return {
    data,
    isFetching,
    fetchData,
    hasError,
    isEmpty,
    createWord,
    updateWord,
    removeWord,
    removeWords,
    changeWordsCategory
  }
})
