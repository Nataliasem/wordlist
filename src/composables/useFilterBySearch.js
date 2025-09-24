import { computed } from 'vue'
import { useSearch } from '@/composables/index.js'
import { filterBySearchString } from '@/utils/index.js'

const {
  searchString,
  clearSearch
} = useSearch()

export function useFilterBySearch(store, filteredField) {
  const filteredData = computed(() => {
    return filterBySearchString(store.data, filteredField, searchString.value)
  })
  const isFilteredDataEmpty = computed(() => {
    return filteredData.value.length === 0
  })

  return {
    searchString,
    filteredData,
    isFilteredDataEmpty,
    clearSearch
  }
}
