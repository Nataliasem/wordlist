<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useFieldValidation } from '@/composables'

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

const target = useTemplateRef<HTMLInputElement>('app-textarea')
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

    <textarea
      :id="id"
      ref="app-textarea"
      v-model="model"
      class="app-input"
      :rows="rows"
      :name="name"
      :class="{'invalid': required && hasError }"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
  </div>
</template>
