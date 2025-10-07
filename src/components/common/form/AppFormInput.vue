<script setup lang="ts">
import { useTemplateRef, defineExpose } from 'vue'
import { useFieldValidation } from '@/composables'

const model = defineModel<string>()

interface Props {
  id: string
  is?: string
  name?: string
  rows?: number
  label?: string
  required?: boolean
}
const { is = 'input', name = '', rows = 3, label = '', required = false } = defineProps<Props>()

defineEmits<{
  focus: [],
  blur: []
}>()

const target = useTemplateRef<HTMLInputElement>('app-input')
const { hasError, validate } = useFieldValidation(target, model, required)
defineExpose({
  hasError,
  validate
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <label
      v-if="label"
      :for="id"
    >
      <span :class="{'required-field-title': required}">{{ label }}:</span>
    </label>

    <slot />

    <Component
      :is="is"
      :id="id"
      v-model="model"
      ref="app-input"
      class="app-input"
      :class="{'invalid': required && hasError }"
      :rows="rows"
      :name="name"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
  </div>
</template>
