<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal-mask"
      >
        <div class="modal-body">
          <h2 class="sticky top-0 bg-white pt-8">
            <slot name="header" />
          </h2>

          <div class="mt-8">
            <slot name="content" />
          </div>

          <div class="flex justify-end gap-4 sticky bottom-0 bg-white py-8">
            <button
              type="button"
              class="app-button text-white font-bold bg-violet-700 hover:bg-violet-600 focus:border-violet-800"
              @click="$emit('confirm')"
            >
              <slot name="confirm-text" />
            </button>
            <button
              type="button"
              class="app-button text-white font-bold bg-red-800 hover:bg-red-700 focus:border-red-900"
              @click="$emit('cancel')"
            >
              <slot name="cancel-text">
                Cancel
              </slot>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{show: boolean}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<style scoped>
.modal-mask {
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px;
  transition: opacity 0.3s ease;
}

.modal-body {
  background-color: white;
  min-height: 30%;
  max-height: 80%;
  width: 40%;
  overflow: scroll;
  border-radius: 4px;
  padding: 0 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Special styles for Transition component */
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
