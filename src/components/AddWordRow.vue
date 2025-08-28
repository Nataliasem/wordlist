<template>
  <tr class="add-word-row">
    <td v-for="(_, key) in word">
      <AppSelect
        v-if="key === 'category'"
        v-model="word.category"
        select-name="category"
        :options="categoryStore.categories"
      />
      <textarea
        v-else
        rows="1"
        v-model="word[key]"
        :name="key"
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
import AppSelect from './reusable/AppSelect.vue'
import { ref, watch } from 'vue'
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const word = ref({
  word: '',
  transcription: '',
  definition: '',
  examples: '',
  translation: '',
  category: null
})

watch(() => categoryStore.selectedCategoryId, () => {
  word.value.category = categoryStore.selectedCategoryId
})

const clearUserInput = () => {
  word.value = {
    word: '',
    transcription: '',
    definition: '',
    examples: '',
    translation: '',
    category: categoryStore.selectedCategoryId
  }
}

const addWordToCategory = async () => {
  if (!word.value.word) return
  await wordStore.createWord({
    ...word.value,
    examples: [word.value.examples],
  })
  clearUserInput()
}

</script>

<style scoped>
tr {
  transition: background-color 0.3s ease;
}

tr:hover {
  background-color: mediumpurple;
}

tr:hover .icon-button_filled {
  background-color: white;
}

.add-word-row {
  background-color: lavender;
}
</style>

