<template>
  <form @submit="$emit('submit')">
    <h2>
      <slot name="app-form__header" />
    </h2>

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
  overflow: scroll;
  max-height: 80%;
}

.app-form__field {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.app-form__footer {
  display: flex;
  gap: 16px;
  justify-content: end;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding-bottom: 32px;
}
</style>
