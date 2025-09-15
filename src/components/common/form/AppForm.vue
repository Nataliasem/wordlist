<template>
  <form @submit="$emit('submit')">
    <div class="app-form__header">
      <h2>
        <slot name="app-form__header" />
      </h2>
    </div>

    <div class="app-form__fields-wrapper">
      <slot />
    </div>

    <div class="app-form__footer">
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

<script setup>
defineEmits(['submit', 'cancel'])
</script>

<style>
.app-form__fields-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.app-form__field {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.app-form__header {
  position: sticky;
  top: 0;
  padding: 32px 0;
  background-color: white;
  z-index: 100;
}

.app-form__footer {
  display: flex;
  gap: 16px;
  justify-content: end;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 32px 0;
}
</style>
