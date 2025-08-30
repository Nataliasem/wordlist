<template>
  <tr class="add-word-row">
    <td v-for="(_, key) in word">
      <AppTextarea
        v-model="word[key]"
        :id="key"
        :required="key === 'word'"
        :ref="(el) => { inputRefs[key] = el }"
      />
    </td>

    <td class="td-action">
      <button class="icon-button_filled" type="button" @click="addWordToCategory">
        <v-icon name="ri-play-list-add-fill" title="Add to wordlist" fill="purple" />
      </button>
    </td>

    <td class="td-action">
      <button class="icon-button_filled" type="button" @click="clearUserInput">
        <v-icon name="ri-delete-back-2-line" title="Clear inputs" fill="purple" />
      </button>
    </td>
  </tr>
</template>

<script setup>
import AppTextarea from '../common/AppTextarea.vue'
import { ref } from 'vue'
import { useCategoryStore, useWordStore } from '../../stores/index.js'
import { useFormValidation } from '../../composables/index.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const EMPTY_WORD = {
  word: '',
  transcription: '',
  definition: '',
  translation: ''
}
const word = ref({...EMPTY_WORD})
const clearUserInput = () => {
  word.value = {...EMPTY_WORD}
}

const inputRefs = ref({})
const { validateForm, hasFormError } = useFormValidation(inputRefs)
const addWordToCategory = async () => {
  validateForm()
  if (hasFormError.value) return

  await wordStore.createWord({
    ...word.value,
    category: categoryStore.selectedCategoryId
  })
  clearUserInput()
}
</script>

<style scoped>
.add-word-row {
  background-color: lavender;
}

.add-word-row {
  transition: background-color 0.3s ease;
}

.add-word-row:hover {
  background-color: rgba(147, 112, 219, 0.4);
}

.add-word-row:hover .icon-button_filled {
  background-color: white;
}
</style>

