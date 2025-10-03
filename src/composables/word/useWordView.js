import { ref } from 'vue'

export function useWordView() {
  const isWordViewShown = ref(false)
  const toggleWordView = () => {
    isWordViewShown.value = !isWordViewShown.value
  }

  return {
    isWordViewShown,
    toggleWordView
  }
}
