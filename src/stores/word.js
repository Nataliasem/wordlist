import { defineStore } from 'pinia'
import { getWordlist, create, update, remove } from '../api/word.js'
import { computed, ref, watch } from 'vue'
import { useCategoryStore } from './category'

export const useWordStore = defineStore('word', () => {
  const isFetching = ref(false)
  const hasError = ref(false)
  const words = ref([])
  const isEmpty = computed(() => {
    return !isFetching.value && (hasError.value || words.value.length === 0)
  })
  const fetchWords = async (categoryId = null) => {
    isFetching.value = true
    hasError.value = false
    try {
      words.value = await getWordlist(categoryId)
    } catch {
      hasError.value = true
    } finally {
      isFetching.value = false
    }
  }

  const categoryStore = useCategoryStore()
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
    isEmpty,
    fetchWords,
    createWord,
    updateWord,
    deleteWord
  }
})
