import { defineStore } from 'pinia'
import { getWordlist, create, update, remove, changeCategory, removeMany } from '@/api/word.ts'
import { useCustomFetch } from '@/composables/index.js'

export const useWordStore = defineStore('word', () => {
  const {
    isFetching,
    isEmpty,
    hasError,
    data,
    fetchData
  } = useCustomFetch(getWordlist)

  const createWord = async (word) => {
    await create(word)
  }
  const updateWord = async (word) => {
    await update(word)
  }
  const removeWord = async (id) => {
    await remove(id)
  }
  const removeWords = async (ids) => {
    await removeMany(ids)
  }
  const changeWordsCategory = async (categoryId, updatedWords) => {
    await changeCategory(categoryId, updatedWords)
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
