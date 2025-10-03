import { ref } from 'vue'
import type { Ref } from 'vue'

export function useWordView() {
  const isWordViewShown: Ref<boolean> = ref(false)
  const toggleWordView = (): void => {
    isWordViewShown.value = !isWordViewShown.value
  }

  return {
    isWordViewShown,
    toggleWordView
  }
}
