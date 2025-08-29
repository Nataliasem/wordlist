<template>
  <tr class="add-word-row">
    <td v-for="(_, key) in word">
      <textarea
        v-model="word[key]"
        rows="1"
        :name="key"
        :class="{'invalid-field': key === 'word' && hasError }"
        @focus="hasError = false"
        @blur="hasError = false"
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
import { ref } from 'vue'
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'

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
  hasError.value = false
  word.value = {...EMPTY_WORD}
}

const hasError = ref(false)
const addWordToCategory = async () => {
  if (!word.value.word) {
    hasError.value = true
    return
  }
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

