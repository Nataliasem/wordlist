<template>
  <label v-if="label" :for="id" class="form-field__label">
    <span :class="{'required-field': required}">{{ label }}:</span>
  </label>

  <slot />

  <textarea
    v-model="model"
    ref="app-textarea"
    :rows="rows"
    :name="id"
    :id="id"
    :class="{'invalid-field': required && hasError }"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const model = defineModel({ required: true })
const emit = defineEmits(['blur'])

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

const target = useTemplateRef('app-textarea')
onClickOutside(target, () => emit('blur'))
</script>

<style scoped>
textarea {
  border-radius: 2px;
}
</style>
