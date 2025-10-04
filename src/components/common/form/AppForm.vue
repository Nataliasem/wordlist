<script setup lang="ts">
defineEmits<{
  submit: []
  cancel: []
}>()
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <div class="sticky top-0 py-8 bg-white z-100">
      <h2 class="font-bold text-xl">
        <slot name="app-form__header" />
      </h2>
    </div>

    <div class="flex flex-col gap-x-8 mb-8">
      <slot />
    </div>

    <div class="sticky bottom-0 flex gap-4 bg-white py-8">
      <slot name="confirm">
        <button
          type="submit"
          class="app-button app-button__confirm"
        >
          Save changes
        </button>
      </slot>

      <slot name="cancel">
        <button
          type="button"
          class="app-button app-button__cancel"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
      </slot>
    </div>
  </form>
</template>
