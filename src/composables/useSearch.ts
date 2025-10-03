import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export function useSearch() {
  const searchString: Ref<string> = ref('')
  const hasActiveSearch = computed<boolean>(() => {
    return !!searchString.value.length
  })
  const clearSearch = (): void => {
    searchString.value = ''
  }

  return {
    searchString,
    hasActiveSearch,
    clearSearch
  }
}
