<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <div class="search-word-input__wrapper">
        <input
          v-model="searchWord"
          id="search-word-input"
          type="text"
          class="search-word-input"
          placeholder="Enter a word here..."
        >

        <button class="icon-button_filled" type="button" @click="addWord">
          <v-icon name="ri-play-list-add-fill" :scale="1.3" title="Add new word" fill="purple" />
        </button>
      </div>

      <table>
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

        <tr v-else-if="!foundedWords.length">
          <td :colspan="columnLength" class="table-message empty">
            <p>No such word was found. Try changing the search criteria or add a new word.</p>
          </td>
        </tr>

        <WordRow
          v-for="item in foundedWords"
          :key="item.id"
          :word="item"
          @update-word="updateWord(item)"
          @delete-word="deleteWord(item.id)"
        />
        </tbody>
      </table>
    </div>
  </div>

  <WordModal v-if="isModalOpen" :word="updatedWord" @closeModal="closeModal" />
</template>

<script setup>
import WordModal from './WordModal.vue'
import AddWordRow from './AddWordRow.vue'
import WordRow from './WordRow.vue'
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'
import { reloadPage, filterBySearchString } from '../utils/index.js'
import { computed, ref } from 'vue'
import { useModal } from '../composables/useModal.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const { isModalOpen, openModal, closeModal } = useModal()

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
const foundedWords = computed(() => {
  return filterBySearchString(wordStore.words, 'word', searchWord.value)
})

const updatedWord = ref(null)
const addWord = () => {
  updatedWord.value = {
    word: searchWord.value,
    transcription: '',
    definition: '',
    translation: '',
    examples: [],
    category: categoryStore.selectedCategoryId
  }
  searchWord.value = ''
  openModal()
}

const updateWord = (word) => {
  updatedWord.value = {
    ...word,
    category: categoryStore.selectedCategoryId
  }
  openModal()
}

const deleteWord = async (id) => {
  await wordStore.deleteWord(id)
}
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
  display: flex;
  align-items: center;
}

.search-word-input {
  padding: 8px;
  min-width: 300px;
  margin-right: 8px;
}
</style>
