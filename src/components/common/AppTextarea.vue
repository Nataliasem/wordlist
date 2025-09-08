<template>
  <label
    v-if="label"
    :for="id"
    class="form-field__label"
  >
    <span :class="{'required-field': required}">{{ label }}:</span>
  </label>

  <slot />

  <textarea
    :id="id"
    ref="app-textarea"
    v-model="model"
    :rows="rows"
    :name="name"
    :class="{'invalid-field': required && hasError }"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef, defineExpose, watch } from 'vue'

const model = defineModel({
  type: String,
  required: true
})

defineEmits(['focus', 'blur'])

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: '',
  },
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
  }
})

const hasError = ref(false)
const validate = () => {
  hasError.value = props.required && !model.value.length
}
const clearError = () => {
  hasError.value = false
}

const target = useTemplateRef('app-textarea')
onClickOutside(target, () => {
  clearError()
})

watch(() => model.value, (newValue, oldValue) => {
  if(!oldValue.length && newValue.length) {
    clearError()
  }
})

defineExpose({
  validate,
  hasError
})
</script>

<style scoped>
textarea {
  border-radius: 2px;
}
</style>
