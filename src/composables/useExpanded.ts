import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

const TABLET_SCREEN_SIZE = 1024

export function useExpanded() {
  const { width } = useWindowSize()

  const isExpanded = ref(true)
  if (width.value < TABLET_SCREEN_SIZE) {
    isExpanded.value = false
  }

  return {
    isExpanded
  }
}
