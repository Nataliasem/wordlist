<script setup lang="ts">
import CategorySelect from '@/components/category/CategorySelect.vue'
import { AppForm, AppFormInput } from '@/components/common'
import WordExamplesInput from './WordExamplesInput.vue'
import { computed, ref, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { useFormValidation } from '@/composables'
import { WORD_FORM_CONFIG } from '@/constants'
import { Word } from '@/types'

const props = defineProps<{
  word: Word
}>()
const emit = defineEmits<{
  submit: [data: Word],
  cancel: []
}>()

const updatedWord = ref(null)
watch(() => props.word, async () => {
  updatedWord.value = cloneDeep(props.word)
}, {
  immediate: true,
  deep: true
})
const title = computed(() => {
  return updatedWord.value?.word || ''
})

const inputRefs = ref([])
const setInputRef = (el) => {
  if (el) {
    inputRefs.value.push(el);
  }
}

const { validateForm, hasFormError } = useFormValidation(inputRefs)
const submit = () => {
  validateForm()
  if (hasFormError.value) return
  emit('submit', updatedWord.value)
}
</script>

<template>
  <AppForm
    @submit="submit"
    @cancel="$emit('cancel')"
  >
    <template #app-form__header>
      <span v-if="title">Edit the word <span class="italic font-light">{{ title }}</span></span>
      <span v-else>Add a new word</span>
    </template>

    <template
      v-for="item in WORD_FORM_CONFIG"
      :key="item"
    >
      <div
        v-if="item === 'category'"
        class="mb-8"
      >
        <CategorySelect
          v-model="updatedWord.category"
          use-label
        />
      </div>

      <div v-else-if="item === 'examples'">
        <WordExamplesInput v-model="updatedWord.examples" />
      </div>

      <div
        v-else
        class="mb-8"
      >
        <AppFormInput
          :is="item === 'definition' ? 'textarea' : 'input'"
          :id="item"
          :ref="setInputRef"
          v-model="updatedWord[item]"
          :label="item"
          :required="item === 'word'"
        />
      </div>
    </template>
  </AppForm>
</template>
