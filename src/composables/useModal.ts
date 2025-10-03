import { ref } from 'vue'
import type { Ref } from 'vue'

export function useModal() {
  const isModalOpen: Ref<boolean> = ref(false)

  const openModal = (): void => {
      isModalOpen.value = true
  }
  const closeModal = (): void => {
      isModalOpen.value = false
  }

  return {
    isModalOpen,
    openModal,
    closeModal
  }
}
