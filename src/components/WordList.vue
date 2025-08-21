<template>
  <div class="word-list">
    <table>
      <caption>
        <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>
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
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()
</script>

<style scoped>
.word-list {
  flex-grow: 1;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: baseline;
}
</style>
