import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

const isExpanded = ref(true)

export function useExpanded() {
  const { width } = useWindowSize()
  const TABLET_SCREEN_SIZE = 1024
  if (width.value < TABLET_SCREEN_SIZE) {
    isExpanded.value = false
  }

  return {
    isExpanded
  }
}
