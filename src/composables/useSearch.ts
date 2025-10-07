import { ref, computed } from 'vue'

export function useSearch() {
  const searchString = ref('')
  const hasActiveSearch = computed(() => {
    return !!searchString.value.length
  })
  const clearSearch = () => {
    searchString.value = ''
  }

  return {
    searchString,
    hasActiveSearch,
    clearSearch
  }
}
