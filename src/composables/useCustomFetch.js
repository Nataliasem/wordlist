import { computed, ref } from 'vue'

export function useCustomFetch(apiMethod) {
  const isFetching = ref(false)
  const hasError = ref(false)
  const data = ref([])
  const isEmpty = computed(() => {
    return !isFetching.value && (hasError.value || data.value.length === 0)
  })

  const fetchData = async (...params) => {
    isFetching.value = true
    try {
      data.value = await apiMethod(...params)
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
