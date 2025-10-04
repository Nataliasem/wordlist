<script setup lang="ts">
defineProps<{show: boolean}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

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
              class="app-button app-button__confirm"
              @click="$emit('confirm')"
            >
              <slot name="confirm-text" />
            </button>
            <button
              type="button"
              class="app-button app-button__cancel"
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

<style scoped>
@reference "tailwindcss";

.modal-mask {
  @apply absolute z-999 w-full h-full transition-opacity duration-300 ease-in;
  @apply flex justify-center items-center p-16 bg-black/85;
}

.modal-body {
  @apply w-lg bg-white shadow-2xl overflow-scroll rounded-sm px-8 flex flex-col justify-between;
}

/* Special styles for Transition component */
.modal-enter-from {
  @apply opacity-0
}

.modal-leave-to {
  @apply opacity-0
}
</style>
