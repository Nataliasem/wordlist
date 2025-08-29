<template>
  <label v-if="label" :for="id" class="form-field__label">
    <span :class="{'required-field': required}">{{ label }}:</span>
  </label>

  <slot />

  <textarea
    v-model="model"
    :rows="rows"
    :name="id"
    :id="id"
    :class="{'invalid-field': required && hasError }"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>

<script setup>
const model = defineModel({ required: true })

defineProps({
  id: String,
  rows: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
textarea {
  border-radius: 2px;
}
</style>
