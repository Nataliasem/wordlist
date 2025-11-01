import { computed, ref, shallowRef } from 'vue'
import type { Ref } from 'vue'

export function useCustomFetch<T>(apiMethod: (params?: unknown) => Promise<T[]>) {
  const isFetching = ref(false)
  const hasError = ref(false)
  const data: Ref<T[]> = shallowRef([])
  const isEmpty = computed(() => {
    return !isFetching.value && (hasError.value || data.value.length === 0)
  })

  const fetchData = async (params: unknown): Promise<void> => {
    isFetching.value = true
    try {
      data.value = await apiMethod(params)
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
