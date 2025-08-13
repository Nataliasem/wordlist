<template>
  <tr class="add-word-row">
    <td v-for="(_, key) in word">
       <textarea
         rows="1"
         v-model="word[key]"
         :name="key"
       />
    </td>

    <td>
      <select v-model="selectedCategoryId" name="category">
        <option
          v-for="item in categoryStore.categories"
          :key="item.id"
          :value="item.id"
          :selected="selectedCategoryId === item.id"
        >
          {{ item.name }}
        </option>
      </select>
    </td>

    <td class="td-action">
      <button type="button" @click="addWordToCategory">
        <v-icon name="ri-play-list-add-fill" title="Add to wordlist" fill="purple" />
      </button>
    </td>

    <td class="td-action">
      <button type="button" @click="clearUserInput">
        <v-icon name="ri-delete-back-2-line" title="Clear inputs" fill="purple" />
      </button>
    </td>
  </tr>
</template>

<script setup>
import { ref, watch } from 'vue'
import { createWord } from '../api/word.js'
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const selectedCategoryId = ref(null)
watch(() => categoryStore.selectedCategory, () => {
  selectedCategoryId.value = categoryStore.selectedCategory?.id || null
})

const word = ref({
  word: '',
  transcription: '',
  definition: '',
  translation: ''
})

const clearUserInput = () => {
  word.value = {
    word: '',
    transcription: '',
    translation: '',
    definition: ''
  }
}

const addWordToCategory = async () => {
  if (!word.value.word) {
    return
  }
  await createWord({
      ...word.value,
      category: selectedCategoryId.value
    }
  )
  await wordStore.fetchWords()
  clearUserInput()
}

</script>

<style>
.add-word-row {
  background-color: lavender;
}
</style>

