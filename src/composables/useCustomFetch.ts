import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { CategoryId, WordQueryParams } from '@/types'

export function useCustomFetch<T>(apiMethod: (...params: (CategoryId | WordQueryParams)[] ) => Promise<T[]>) {
  const isFetching: Ref<boolean> = ref(false)
  const hasError: Ref<boolean> = ref(false)
  const data: Ref<T[]> = ref([])
  const isEmpty = computed<boolean>(() => {
    return !isFetching.value && (hasError.value || data.value.length === 0)
  })

  const fetchDataNoThrottling = async (...params: (CategoryId | WordQueryParams)[]): Promise<void> => {
    isFetching.value = true
    try {
      data.value = await apiMethod(...params)
    } catch  {
      hasError.value = true
    } finally {
      isFetching.value = false
    }
  }
  const fetchData = useThrottleFn(fetchDataNoThrottling, 100)

  return {
    isFetching,
    hasError,
    data,
    isEmpty,
    fetchData
  }
}
