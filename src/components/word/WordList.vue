<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <AppTable
        v-model="word"
        search-criteria="word"
        :column-config="columnConfig"
        :table-data="wordStore.words"
        @open-add-row-modal="openAddWordModal"
        @add-row="addWord"
        @edit-row="updateWord"
        @remove-rows="removeWords"
      >
        <template v-if="wordStore.isFetching" #fetching >
          <p>Words are fetching...</p>
        </template>

        <template v-else-if="wordStore.hasError" #fetchingError>
          <p>Something went wrong fetching words.</p>
        </template>

        <template v-else-if="wordStore.isEmpty" #emptyData>
          <p>No words in this category</p>
        </template>

        <template #emptySearch>
          <p>No such word was found. Try changing the search criteria or add a new word.</p>
        </template>
      </AppTable>
    </div>
  </div>

  <WordModal v-if="isModalOpen" :word="updatedWord" @closeModal="closeModal" />
</template>

<script setup>
import WordModal from './WordModal.vue'
import AppTable from '../common/table/AppTable.vue'
import { ref } from 'vue'
import { useModal } from '../../composables/index.js'
import { useCategoryStore, useWordStore } from '../../stores/index.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const { isModalOpen, openModal, closeModal } = useModal()

const columnConfig = [
  {title: 'Word', key: 'word', isRequired: true, display: true},
  {title: 'Transcription', key: 'transcription', isRequired: false, display: true},
  {title: 'Definition', key: 'definition', isRequired: false, display: true},
  {title: 'Translation', key: 'translation', isRequired: false, display: true},
  {title: 'Add/edit', key: '', isRequired: false, display: false},
  {title: 'Clear/delete', key: '', isRequired: false, display: false},
]

const updatedWord = ref(null)
const openAddWordModal = (word) => {
  updatedWord.value = {
    word: word,
    transcription: '',
    definition: '',
    translation: '',
    examples: [],
    category: categoryStore.selectedCategoryId
  }
  openModal()
}

const word = ref({
  word: '',
  transcription: '',
  definition: '',
  translation: ''
})
const addWord = async () => {
  await wordStore.createWord({
    ...word.value,
    category: categoryStore.selectedCategoryId
  })
}

const updateWord = (word) => {
  updatedWord.value = {
    ...word,
    category: categoryStore.selectedCategoryId
  }
  openModal()
}

const removeWords = (wordsIds) => {
  wordsIds.forEach(async (wordId) => {
   await wordStore.removeWord(wordId)
  })
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

.scrollable-table-container {
  max-height: 95vh;
  width: 75vw;
  overflow-y: auto;
}
</style>
