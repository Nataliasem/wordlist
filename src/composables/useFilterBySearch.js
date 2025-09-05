import { ref, computed } from 'vue'
import { filterBySearchString } from '@/utils/index.js'

export function useFilterBySearch(store, filteredField) {
  const searchString = ref('')
  const filteredData = computed(() => {
    return filterBySearchString(store.data, filteredField, searchString.value)
  })
  const isFilteredDataEmpty = computed(() => {
    return filteredData.value.length === 0
  })
  const clearSearch = () => {
    searchString.value = ''
  }

  return {
    searchString,
    filteredData,
    isFilteredDataEmpty,
    clearSearch
  }
}
