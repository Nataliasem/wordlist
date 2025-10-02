import { computed } from 'vue'
import { useCustomFetch, useSearch } from '@/composables/index.js'
import { filterBySearchString } from '@/utils/index.js'
import { getCategories } from '@/api/category.js'

const {
  searchString,
  clearSearch
} = useSearch()

const {
  isEmpty,
  hasError,
  data: categories,
  fetchData,
} = useCustomFetch(getCategories)

export function useCategoryFetch() {
  const fetchCategories = async () => {
    await fetchData()
  }
  const filteredData = computed(() => {
    return filterBySearchString(categories.value, 'name', searchString.value)
  })
  const isFilteredDataEmpty = computed(() => {
    return filteredData.value.length === 0
  })

  return {
    searchString,
    filteredData,
    isFilteredDataEmpty,
    clearSearch,
    isEmpty,
    hasError,
    fetchCategories
  }
}
