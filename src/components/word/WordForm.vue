<template>
  <AppForm
    @submit="submit"
    @cancel="$emit('cancel')"
  >
    <template #app-form__header>
      <span v-if="title">Edit the word <span class="word-name">{{ title }}</span></span>
      <span v-else>Add a new word</span>
    </template>

    <template
      v-for="item in WORD_FORM_CONFIG"
      :key="item"
    >
      <div v-if="item === 'category'">
        <AppSelect
          :id="item"
          v-model="updatedWord.category"
          :name="item"
          :label="item"
          :options="categoryStore.data"
        />
      </div>

      <div v-else-if="item === 'examples'">
        <WordExamplesInput v-model="updatedWord.examples" />
      </div>

      <div v-else>
        <AppTextarea
          :id="item"
          :ref="(el) => { inputRefs[item] = el }"
          v-model="updatedWord[item]"
          :label="item"
          :rows="5"
          :required="item === 'word'"
        />
      </div>
    </template>
  </AppForm>
</template>

<script setup lang="ts">
import { AppForm, AppSelect, AppTextarea } from '@/components/common'
import WordExamplesInput from './WordExamplesInput.vue'
import { computed, ref, watch } from 'vue'
import { useCategoryStore } from '@/stores/index.js'
import cloneDeep from 'lodash/cloneDeep'
import { useFormValidation } from '@/composables/index.js'
import { WORD_FORM_CONFIG } from '@/constants.js'
import { Word } from '@/types/word.ts'

const props = defineProps<{
  word: Word
}>()
const emit = defineEmits<{
  submit: [data: Word],
  cancel: []
}>()

const categoryStore = useCategoryStore()

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

const inputRefs = ref({})
const { validateForm, hasFormError } = useFormValidation(inputRefs)
const submit = () => {
  validateForm()
  if (hasFormError.value) return
  emit('submit', updatedWord.value)
}
</script>

<style scoped>
.word-name {
  font-style: italic;
  font-weight: 400;
}
</style>

