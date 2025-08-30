<template>
  <AppModal
    @confirm="save"
    @cancel="$emit('close-modal')"
  >
    <template #header>
      <span v-if="word.word">Edit the word <span class="word-name">{{ word.word }}</span></span>
      <span v-else>Add a new word</span>
    </template>

    <template #content>
      <form @submit.prevent class="word-form">
        <template v-for="key in FORM_CONFIG">
          <div v-if="key === 'category'" class="form-field">
            <AppSelect
              v-model="updatedWord.category"
              :id="key"
              :name="key"
              :label="key"
              :options="categoryStore.categories"
            />
          </div>

          <div v-else-if="key === 'examples'" class="form-field">
            <WordExamplesInput v-model="updatedWord.examples" />
          </div>

          <div v-else class="form-field">
            <AppTextarea
              v-model="updatedWord[key]"
              :label="key"
              :id="key"
              :rows="5"
              :required="key === 'word'"
              :ref="(el) => { inputRefs[key] = el }"
            />
          </div>
        </template>
      </form>
    </template>

    <template #confirm-text>Save</template>
  </AppModal>
</template>

<script setup>
import AppSelect from './reusable/AppSelect.vue'
import AppModal from './reusable/AppModal.vue'
import AppTextarea from './reusable/AppTextarea.vue'
import WordExamplesInput from './WordExamplesInput.vue'
import { ref, watch } from 'vue'
import { useWordStore } from '../stores/word.js'
import { useCategoryStore } from '../stores/category.js'
import cloneDeep from 'lodash/cloneDeep'
import { useFormValidation } from '../composables/useFormValidation.js'

const props = defineProps({
  word: Object
})
const emit = defineEmits([ 'close-modal' ])

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const FORM_CONFIG = [
  'category',
  'word',
  'transcription',
  'definition',
  'translation',
  'examples'
]

const updatedWord = ref(null)
watch(() => props.word, async () => {
  updatedWord.value = cloneDeep(props.word)
}, {
  immediate: true,
  deep: true
})

const inputRefs = ref({})
const { validateForm, hasFormError } = useFormValidation(inputRefs)
const save = async () => {
  validateForm()
  if (hasFormError.value) return

  await updatedWord.value.id
    ? wordStore.updateWord(updatedWord.value)
    : wordStore.createWord(updatedWord.value)

  emit('close-modal')
}
</script>

<style>
.word-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field__label {
  font-weight: bold;
  margin-bottom: 6px;
}

.word-name {
  font-style: italic;
  font-weight: normal;
}
</style>
