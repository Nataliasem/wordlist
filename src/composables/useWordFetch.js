import { useSearch, useCustomFetch } from '@/composables/index.js'
import { getWordlist } from '@/api/word.ts'
import { computed, ref, watch } from 'vue'
import { DEFAULT_FETCH_LIMIT, DEFAULT_WORD_SORT, FETCH_WORD_MESSAGE } from '@/constants.js'
import { useCategoryStore } from '@/stores/index.js'

export function useWordFetch() {
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
    if (hasError.value) return FETCH_WORD_MESSAGE.error
    if (!hasActiveSearch.value && isEmpty.value) return FETCH_WORD_MESSAGE.empty
    if (hasActiveSearch.value && isEmpty.value) return FETCH_WORD_MESSAGE.emptySearch

    return null
  })

  const currentPage = ref(1)
  const sortedBy = ref({
    sortColumn: DEFAULT_WORD_SORT.column,
    sortDirection: DEFAULT_WORD_SORT.direction,
  })
  const queryParams = computed(() => ({
    word: searchString.value,
    offset: currentPage.value - 1,
    sortColumn: sortedBy.value.sortColumn,
    sortDirection: sortedBy.value.sortDirection,
    limit: DEFAULT_FETCH_LIMIT
  }))
  const resetQueryParams = () => {
    searchString.value = ''
    currentPage.value = 1
    sortedBy.value.sortColumn = DEFAULT_WORD_SORT.column
    sortedBy.value.sortDirection = DEFAULT_WORD_SORT.direction
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

  return {
    sortedBy,
    currentPage,
    searchString,
    fetchMessage,
    clearSearch,
    wordList,
    fetchWordList
  }
}


