<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <table>
        <caption>
          <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>
        </caption>

        <thead>
        <tr>
          <th v-for="item in columnConfig" :key="item">{{ item }}</th>
        </tr>
        </thead>

        <tbody>
        <AddWordRow />
        <tr v-if="wordStore.isFetching">
          <td :colspan="columnLength" class="table-message fetching">
            <p>Words are fetching...</p>
          </td>
        </tr>

        <tr v-else-if="wordStore.hasError">
          <td :colspan="columnLength" class="table-message error">
            <p>Something went wrong.</p>
            <p>Please <a @click="reloadPage">reload the page</a>.</p>
          </td>
        </tr>

        <tr v-else-if="wordStore.isEmpty">
          <td :colspan="columnLength" class="table-message empty">
            <p>No words in this category</p>
          </td>
        </tr>

        <WordRow
          v-for="item in wordStore.words"
          :key="item.id"
          :word="item"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import AddWordRow from './AddWordRow.vue'
import WordRow from './WordRow.vue'
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'
import { reloadPage } from '../utils/index.js'
import { computed } from 'vue'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const columnConfig = [
  'Word',
  'Transcription',
  'Definition',
  'Examples',
  'Translation',
  'Category',
  'Add/edit',
  'Clear'
]
const columnLength = computed(() => columnConfig.length)
</script>

<style scoped>
.word-list {
  flex-grow: 1;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.table-message p {
  width: 100%;
  text-align: center;
}

.table-message.fetching {
  color: purple;
}

.table-message.empty {
  color: blue;
}

.table-message.error {
  color: red;
}
</style>
