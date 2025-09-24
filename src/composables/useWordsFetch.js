import { useSearch, useCustomFetch } from '@/composables/index.js'
import { getWordlist } from '@/api/word.js'
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
  watch(searchString, () => {
    if (searchString.value.length) {
      currentPage.value = 1
    }
  })

  const resetQueryParams = () => {
    searchString.value = ''
    currentPage.value = 1
  }

  const fetchWordList = async () => {
    await fetchData(categoryStore.selectedCategoryId, queryParams.value)
  }

  watch(() => categoryStore.selectedCategoryId, async () => {
    resetQueryParams()
    await fetchWordList()
  })

  watch(queryParams, async () => {
    await fetchWordList()
  }, { immediate: true })

  return {
    currentPage,
    searchString,
    fetchMessage,
    clearSearch,
    wordList,
    fetchWordList
  }
}


