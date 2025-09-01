<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <div class="table-actions__wrapper">
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


        <div v-if="readyForRemovalWords.length">
          <button  class="remove-button" type="button" @click="removeAll">
            Remove selected words
          </button>

          <button class="remove-button cancel" type="button" @click="cancelRemoval">
            Cancel
          </button>
        </div>
      </div>

      <table class="word-table" ref="word-table">
        <thead>
        <tr>
          <th v-for="item in columnConfig" :key="item">
            <span :class="{'required-field': item === 'Word'}">{{ item }}</span>
          </th>
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
          v-model:readyForRemovalWords="readyForRemovalWords"
          :key="item.id"
          :word="item"
          @update-word="updateWord(item)"
          @remove-word="removeWord(item.id)"
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
import { useCategoryStore, useWordStore } from '../../stores/index.js'
import { reloadPage, filterBySearchString } from '../../utils/index.js'
import { computed, ref } from 'vue'
import { useModal } from '../../composables/index.js'

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

const readyForRemovalWords = ref([])
const removeWord = async (id) => {
  await wordStore.removeWord(id)
}
const removeAll = () => {
  readyForRemovalWords.value.forEach((wordId) => {
    removeWord(wordId)
  })
  cancelRemoval()
}
const cancelRemoval = () => {
  readyForRemovalWords.value = []
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

.word-table {
  width: 100%;
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

.table-actions__wrapper {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-word-input__wrapper {
  display: flex;
  align-items: center;
}

.search-word-input {
  padding: 9px;
  min-width: 300px;
  margin-right: 8px;
  border: 2px solid lavender;
  border-radius: 4px;
}

.table-actions__wrapper .icon-button_filled {
  border: 2px solid lavender;
  padding: 4px 8px;
}

.remove-button {
  margin-left: 8px;
  border: 2px solid orange;
  padding: 8px;
}
.remove-button.cancel {
  background-color: orange;
}
</style>
