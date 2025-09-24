import { useSearch, useCustomFetch } from '@/composables/index.js'
import { getWordlist, create, update, remove, changeCategory, removeMany } from '@/api/word.ts'
import { computed, ref, watch } from 'vue'
import { DEFAULT_FETCH_LIMIT, DEFAULT_WORD_SORT, WORD_TABLE_MESSAGE } from '@/constants.js'
import { useCategoryStore } from '@/stores/index.js'

export const useWordsFetch = () => {
  const categoryStore = useCategoryStore()

  const {
    searchString,
    hasActiveSearch,
    clearSearch
  } = useSearch()

  const {
    isEmpty,
    hasError,
    data: wordList,
    fetchData,
  } = useCustomFetch(getWordlist)

  const fetchMessage = computed(() => {
    if (hasError.value) return WORD_TABLE_MESSAGE.error
    if (!hasActiveSearch.value && isEmpty.value) return WORD_TABLE_MESSAGE.empty
    if (hasActiveSearch.value && isEmpty.value) return WORD_TABLE_MESSAGE.emptySearch

    return null
  })

  const currentPage = ref(1)
  const queryParams = computed(() => ({
    word: searchString.value,
    offset: currentPage.value - 1,
    sortColumn: DEFAULT_WORD_SORT.column,
    sortDirection: DEFAULT_WORD_SORT.direction,
    limit: DEFAULT_FETCH_LIMIT
  }))
  const resetQueryParams = () => {
    searchString.value = ''
    currentPage.value = 1
  }
  const fetchWordList = async () => {
    await fetchData(categoryStore.selectedCategoryId, queryParams.value)
  }

  watch(searchString, () => {
    if (searchString.value.length) {
      currentPage.value = 1
    }
  })

  watch(() => categoryStore.selectedCategoryId, async () => {
    resetQueryParams()
    await fetchWordList()
  })

  watch(queryParams, async () => {
    await fetchWordList()
  }, { immediate: true })

  const createWord = async (word) => {
    await create(word)
    await fetchWordList()
  }
  const updateWord = async (word) => {
    await update(word)
    await fetchWordList()
  }
  const removeWord = async (id) => {
    await remove(id)
    await fetchWordList()
  }
  const removeWords = async (ids) => {
    await removeMany(ids)
    await fetchWordList()
  }
  const changeWordsCategory = async (categoryId, updatedWords) => {
    await changeCategory(categoryId, updatedWords)
    await fetchWordList()
  }

  return {
    currentPage,
    searchString,
    fetchMessage,
    clearSearch,
    wordList,
    fetchWordList,
    createWord,
    updateWord,
    removeWord,
    removeWords,
    changeWordsCategory
  }
}


