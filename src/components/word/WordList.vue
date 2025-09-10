<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <AppTable
        :row-model="EMPTY_WORD"
        :column-config="WORD_TABLE_CONFIG"
        :table-data="foundedWords"
        :user-message="userMessage"
        @click-row="showWord"
        @select-rows="removeWords"
      >
        <template #search>
          <input
            id="table-search__input"
            v-model="searchWord"
            type="text"
            class="table-search__input"
            placeholder="Enter a word here..."
          >
          <button
            class="icon-button_filled table-search__button"
            type="button"
            @click="addSearchWord"
          >
            <v-icon
              name="ri-play-list-add-fill"
              :scale="1.3"
              title="Add new"
              fill="purple"
            />
          </button>

          <button
            class="icon-button_filled table-search__button"
            type="button"
            @click="clearSearch"
          >
            <v-icon
              name="ri-delete-back-2-line"
              :scale="1.3"
              title="Clear input"
              fill="purple"
            />
          </button>
        </template>

        <template #selected-rows-title>
          Remove selected words
        </template>
      </AppTable>
    </div>
  </div>

  <WordModal
    :show="isModalOpen"
    :word="wordModel"
    @close-modal="closeModal"
  />

  <WordView
    :show="isWordShown"
    :word="word"
    @hide-word="word = null"
  />
</template>

<script setup>
import WordModal from './WordModal.vue'
import WordView from './WordView.vue'
import { AppTable } from '@/components/common'
import { computed, ref } from 'vue'
import { useModal, useFilterBySearch } from '@/composables/index.js'
import { useCategoryStore, useWordStore } from '@/stores/index.js'
import { WORD_TABLE_CONFIG, EMPTY_WORD, WORD_TABLE_MESSAGE } from '@/constants.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const word = ref(null)
const isWordShown = computed(() => {
  return Boolean(word.value)
})
const showWord = (data) => {
  word.value = data
}

const { isModalOpen, openModal, closeModal } = useModal()
const wordModel = ref(EMPTY_WORD)
const openWordModal = (word) => {
  wordModel.value = {
    ...word,
    category: categoryStore.selectedCategoryId
  }
  openModal()
}

const { searchString: searchWord, filteredData: foundedWords, clearSearch, isFilteredDataEmpty: isFoundedWordsEmpty } = useFilterBySearch(wordStore, 'word')
const addSearchWord = () => {
  openWordModal({
      ...EMPTY_WORD,
      word: searchWord.value
    })
  clearSearch()
}

const removeWords = (wordsIds) => {
  wordsIds.forEach(async (wordId) => {
    await wordStore.removeWord(wordId)
  })
}

const addWord = async (word) => {
  await wordStore.createWord({
    ...word,
    category: categoryStore.selectedCategoryId
  })
}

const userMessage = computed(() => {
  if(wordStore.isFetching) return WORD_TABLE_MESSAGE.fetching
  if(wordStore.hasError) return WORD_TABLE_MESSAGE.error
  if(wordStore.isEmpty) return WORD_TABLE_MESSAGE.empty
  if(isFoundedWordsEmpty.value) return WORD_TABLE_MESSAGE.emptySearch

  return null
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

.scrollable-table-container {
  max-height: 95vh;
  width: 75vw;
  overflow-y: auto;
}

.table-search__input {
  padding: 9px;
  min-width: 300px;
  margin-right: 8px;
  border: 2px solid lavender;
  border-radius: 4px;
  outline: none;
}

.table-search__input:focus {
  border-color: purple;
}

.table-search__button  {
  border: 2px solid lavender;
  padding: 4px 8px;
  outline: none;
}

.table-search__button:focus {
  border-color: purple;
}
</style>
