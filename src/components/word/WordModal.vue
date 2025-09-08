<template>
  <AppModal
    :show="show"
    @confirm="save"
    @cancel="$emit('close-modal')"
  >
    <template #header>
      <span v-if="word.word">Edit the word <span class="word-name">{{ word.word }}</span></span>
      <span v-else>Add a new word</span>
    </template>

    <template #content>
      <form
        class="word-form"
        @submit.prevent
      >
        <template
          v-for="item in WORD_FORM_CONFIG"
          :key="item"
        >
          <div
            v-if="item === 'category'"
            class="form-field"
          >
            <AppSelect
              :id="item"
              v-model="updatedWord.category"
              :name="item"
              :label="item"
              :options="categoryStore.data"
            />
          </div>

          <div
            v-else-if="item === 'examples'"
            class="form-field"
          >
            <WordExamplesInput v-model="updatedWord.examples" />
          </div>

          <div
            v-else
            class="form-field"
          >
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
      </form>
    </template>

    <template #confirm-text>
      Save
    </template>
  </AppModal>
</template>

<script setup>
import { AppSelect, AppModal, AppTextarea } from '@/components/common'
import WordExamplesInput from './WordExamplesInput.vue'
import { ref, watch } from 'vue'
import { useWordStore, useCategoryStore } from '@/stores/index.js'
import cloneDeep from 'lodash/cloneDeep'
import { useFormValidation } from '@/composables/index.js'
import { WORD_FORM_CONFIG } from '@/constants.js'

const props = defineProps({
  show: Boolean,
  word: Object
})
const emit = defineEmits([ 'close-modal' ])

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

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
