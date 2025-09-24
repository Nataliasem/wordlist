import { computed, ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'

export function useCustomFetch(apiMethod) {
  const isFetching = ref(false)
  const hasError = ref(false)
  const data = ref([])
  const isEmpty = computed(() => {
    return !isFetching.value && (hasError.value || data.value.length === 0)
  })

  const fetchDataNoThrottling = async (...params) => {
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
