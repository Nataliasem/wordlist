import { computed } from 'vue'
import { useCustomFetch, useSearch } from '@/composables'
import { filterBySearchString } from '@/utils'
import { getCategories } from '@/api/category'
import { FETCH_CATEGORY_MESSAGE } from '@/constants'

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
    fetchData: fetchCategories,
  } = useCustomFetch(getCategories)

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
    categories,
    fetchCategories
  }
}
