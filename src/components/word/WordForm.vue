<script setup lang="ts">
import CategorySelect from '@/components/category/CategorySelect.vue'
import AppForm  from '@/components/common/form/AppForm.vue'
import AppTextarea from '@/components/common/form/AppTextarea.vue'
import WordExamplesInput from './WordExamplesInput.vue'
import { computed, ref, watch, toRaw } from 'vue'
import { useFormValidation } from '@/composables'
import { EMPTY_WORD, WORD_FORM_CONFIG } from '@/constants'
import { UpdatedWord, WordStringKeys, FormFieldExposed} from '@/types'

const props = defineProps<{
  word: UpdatedWord
}>()
const emit = defineEmits<{
  submit: [data: UpdatedWord],
  cancel: []
}>()

const updatedWord = ref(EMPTY_WORD as UpdatedWord)
watch(() => props.word, async () => {
  updatedWord.value = structuredClone(toRaw(props.word))
}, {
  immediate: true,
  deep: true
})
const title = computed(() => {
  return updatedWord.value?.word || ''
})

const inputRefs = ref<Record<string, FormFieldExposed>>({})
const setRefs = (key: string, element: FormFieldExposed): void => {
  inputRefs.value[key] = element
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
        <AppTextarea
          :id="item"
          :ref="(el: FormFieldExposed) => setRefs(item, el)"
          v-model="updatedWord[item as WordStringKeys]"
          :label="item"
          :rows="5"
          :required="item === 'word'"
        />
      </div>
    </template>
  </AppForm>
</template>
