<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <div class="search-word-input__wrapper">
<!--        <label for="search-word-input">-->
<!--          Search word or add new one-->
<!--        </label>-->
        <input v-model="searchWord" id="search-word-input" type="text" class="search-word-input">

        <button v-if="isEmptySearch" class="icon-button_filled" type="button">
          <v-icon name="ri-play-list-add-fill" title="Add new word" fill="purple" />
        </button>
        <button v-else class="icon-button_filled" type="button">
          <v-icon name="ri-file-search-line" title="Search word" fill="purple" />
        </button>
      </div>

      <table>
<!--        <caption>-->
<!--          <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>-->
<!--        </caption>-->

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

        <tr v-else-if="isEmptySearch">
          <td :colspan="columnLength" class="table-message empty">
            <p>No such word was found. Try changing the search criteria or adding a new word.</p>
          </td>
        </tr>

        <WordRow
          v-for="item in filteredWords"
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
import { computed, ref } from 'vue'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const columnConfig = [
  'Word',
  'Transcription',
  'Definition',
  'Translation',
  'Add/edit',
  'Clear/delete'
]
const columnLength = computed(() => columnConfig.length)

const searchWord = ref('')
const filteredWords = computed(() => {
  return wordStore.words.filter(word => (word.word.toLowerCase().includes(searchWord.value.toLowerCase())))
})
const isEmptySearch = computed(() => {
  return filteredWords.value.length === 0
})
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

.search-word-input__wrapper {
  margin-bottom: 32px;
}

.search-word-input {
  padding: 8px;
  min-width: 300px;
  margin-right: 8px;
}
</style>
