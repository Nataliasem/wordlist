import { computed, ref, shallowRef } from 'vue'
import type { Ref } from 'vue'
import { CategoryId, WordQueryParams } from '@/types'

export function useCustomFetch<T>(apiMethod: (categoryId?: CategoryId, queryParams?: WordQueryParams) => Promise<T[]>) {
  const isFetching = ref(false)
  const hasError = ref(false)
  const data: Ref<T[]> = shallowRef([])
  const isEmpty = computed(() => {
    return !isFetching.value && (hasError.value || data.value.length === 0)
  })

  const fetchData = async (categoryId?: CategoryId, queryParams?: WordQueryParams): Promise<void> => {
    isFetching.value = true
    try {
      data.value = await apiMethod(categoryId, queryParams)
    } catch  {
      hasError.value = true
    } finally {
      isFetching.value = false
    }
  }

  return {
    isFetching,
    hasError,
    data,
    isEmpty,
    fetchData
  }
}
