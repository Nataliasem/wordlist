<template>
  <div class="flex flex-col gap-4">
    <label
      v-if="label"
      :for="id"
    >
      <span :class="{'required-field': required}">{{ label }}:</span>
    </label>

    <slot />

    <textarea
      :id="id"
      ref="app-textarea"
      v-model="model"
      class="app-input"
      :rows="rows"
      :name="name"
      :class="{'invalid-field': required && hasError }"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef, defineExpose, watch } from 'vue'

const model = defineModel<string>()

interface Props {
  id: string
  name?: string
  rows?: number
  label?: string
  required?: boolean
}
const { name = '', rows = 1, label = '', required = false } = defineProps<Props>()

defineEmits<{
  focus: [],
  blur: []
}>()

const hasError = ref(false)
const validate = () => {
  hasError.value = required && !model.value.length
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
