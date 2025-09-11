<template>
  <form
    class="word-form"
    @submit="save"
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

    <div class="word-form__footer">
      <button
        type="submit"
        class="app-button app-button__confirm"
      >
        Save changes
      </button>
      <button
        type="button"
        class="app-button app-button__cancel"
        @click="$emit('hide')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { AppSelect, AppTextarea } from '@/components/common'
import WordExamplesInput from './WordExamplesInput.vue'
import { ref, watch } from 'vue'
import { useWordStore, useCategoryStore } from '@/stores/index.js'
import cloneDeep from 'lodash/cloneDeep'
import { useFormValidation } from '@/composables/index.js'
import { WORD_FORM_CONFIG } from '@/constants.js'

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['hide'])

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

  emit('hide')
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

.word-form__footer {
  display: flex;
  gap: 16px;
  justify-content: end;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding-bottom: 32px;
}
</style>
