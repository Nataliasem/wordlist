<template>
  <div class="word-list">
    <table>
      <caption>
        <h2>Category: {{ selectedCategoryName }}</h2>
      </caption>

      <thead>
      <tr>
        <th>Word</th>
        <th>Transcription</th>
        <th>Definition</th>
        <th>Translation</th>
        <th>Category</th>
        <th>Add/edit</th>
        <th>Clear</th>
      </tr>
      </thead>

      <tbody>
      <AddWordRow />

      <WordRow
        v-for="item in wordStore.words"
        :key="item.id"
        :word="item"
      />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AddWordRow from './AddWordRow.vue'
import WordRow from './WordRow.vue'
import { computed, watch } from 'vue'
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'

const categoryStore = useCategoryStore()
watch(() => categoryStore.selectedCategory, () => {
  updateWords()
})
const selectedCategoryName = computed(() => categoryStore.selectedCategory?.name || 'No category')

const wordStore = useWordStore()
const updateWords = async () => {
  await wordStore.fetchWords()
}
</script>

<style scoped>
.word-list {
  position: fixed;
  top: 0;
  left: 300px;
  flex-grow: 1;
  padding: 16px;
}
</style>
