import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => {
    return {
      isOpen: false
    }
  },
  actions: {
    openModal () {
      this.isOpen = true
    },
    closeModal () {
      this.isOpen = false
    }
  }
})
