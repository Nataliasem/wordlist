import { defineStore } from 'pinia'
import { getWordlist, create, update, remove } from '../api/word.js'
import { watch } from 'vue'
import { useCategoryStore } from './category'
import { useCustomFetch } from '../composables/index.js'

export const useWordStore = defineStore('word', () => {
  const {
    isFetching,
    isEmpty,
    hasError,
    data: words,
    fetchData: fetchWords
  } = useCustomFetch(getWordlist)

  const categoryStore = useCategoryStore()
  // watch full object, not only id
  watch(() => categoryStore.selectedCategory, async () => {
    await fetchWords(categoryStore.selectedCategoryId)
  })

  const createWord = async (word) => {
    await create(word)
    await fetchWords(categoryStore.selectedCategoryId)
  }
  const updateWord = async (word) => {
    await update(word)
    await fetchWords(categoryStore.selectedCategoryId)
  }
  const deleteWord = async (id) => {
    await remove(id)
    await fetchWords(categoryStore.selectedCategoryId)
  }

  return {
    words,
    isFetching,
    hasError,
    isEmpty,
    createWord,
    updateWord,
    deleteWord
  }
})
