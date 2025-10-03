import { computed } from 'vue'
import { useCustomFetch, useSearch } from '@/composables/index.js'
import { filterBySearchString } from '@/utils/index.js'
import { getCategories } from '@/api/category.js'
import { FETCH_CATEGORY_MESSAGE } from '@/constants.js'

export function useCategoryFetch() {
  const {
    searchString,
    hasActiveSearch,
    clearSearch
  } = useSearch()

  const {
    isEmpty,
    hasError,
    data: categories,
    fetchData,
  } = useCustomFetch(getCategories)

  const fetchCategories = async () => {
    await fetchData()
  }
  const filteredData = computed(() => {
    return filterBySearchString(categories.value, 'name', searchString.value)
  })
  const fetchMessage = computed(() => {
    if (hasError.value) return FETCH_CATEGORY_MESSAGE.error
    if (!hasActiveSearch.value && isEmpty.value) return FETCH_CATEGORY_MESSAGE.empty
    if (hasActiveSearch.value && !filteredData.value.length) return FETCH_CATEGORY_MESSAGE.emptySearch
    return null
  })

  return {
    fetchMessage,
    searchString,
    filteredData,
    clearSearch,
    isEmpty,
    hasError,
    fetchCategories
  }
}
