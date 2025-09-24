<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <AppTable
        ref="app-table"
        :column-config="WORD_TABLE_CONFIG"
        :table-data="wordList"
        :sorted-by="sortedBy"
        @click-row="editWord"
      >
        <template #search>
          <input
            id="table-search__input"
            v-model="searchString"
            type="text"
            class="table-search__input"
            placeholder="Enter a word here..."
          >
          <button
            id="add-word-button"
            class="icon-button_filled table-search__button"
            type="button"
            @click="addWord"
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

        <template #selected-rows-action="{ selectedRows }">
          <template v-if="selectedRows.length > 0">
            <div class="select-category__wrapper">
              <AppSelect
                id="select-category"
                v-model="selectedCategory"
                name="select-category"
                :options="categoryStore.data"
              />

              <button
                class="selected-button confirm"
                type="button"
                @click="changeCategory(selectedRows)"
              >
                Change category
              </button>
            </div>

            <button
              class="selected-button remove-button"
              type="button"
              @click="removeSelectedWords(selectedRows)"
            >
              Remove selected
            </button>
          </template>

          <AppPagination
            v-else
            v-model="currentPage"
            :total-items="TEMPORARY_TOTAL_PAGES"
          />
        </template>

        <template
          v-if="fetchMessage"
          #table-message
        >
          <p :class="`table-message__${fetchMessage.type}`">
            <span>{{ fetchMessage.text }}</span>
            <span v-if="fetchMessage.type === 'error'">
              Please <a @click="reloadPage">reload the page</a>.
            </span>
          </p>
        </template>
      </AppTable>
    </div>
  </div>

  <AppView
    :show="isWordViewShown"
    :ignore-el-selectors="['.table-row', '#add-word-button']"
    @hide="toggleWordView"
  >
    <WordForm
      :word="word"
      @submit="createOrUpdateWord"
      @cancel="toggleWordView"
    />
  </AppView>
</template>

<script setup lang="ts">
import { computed, watch, ref, useTemplateRef } from 'vue'
import WordForm from './WordForm.vue'
import { AppSelect, AppTable, AppPagination, AppView } from '@/components/common'
import { useWordsFetch, useWordView } from '@/composables/index.js'
import { useCategoryStore } from '@/stores/index.js'
import { reloadPage } from '@/utils/index.js'
import { WORD_TABLE_CONFIG, EMPTY_WORD } from '@/constants.js'
import { Word } from '@/types/word'

// TODO: fix after backend WL-54
const TEMPORARY_TOTAL_PAGES = 1000

const categoryStore = useCategoryStore()

const {
  sortedBy,
  currentPage,
  searchString,
  clearSearch,
  wordList,
  fetchMessage,
  removeWords,
  changeWordsCategory,
  updateWord,
  createWord
} = useWordsFetch()

const { isWordViewShown, toggleWordView } = useWordView()
const word = ref(null)
const editWord = (data: Word) => {
  word.value = {
    ...data,
    category: categoryStore.selectedCategoryId
  }
  toggleWordView()
}
const addWord = () => {
  word.value = {
    ...EMPTY_WORD,
    word: searchString.value,
    category: categoryStore.selectedCategoryId
  }
  toggleWordView()
}
const createOrUpdateWord = async (updatedWord: Word) => {
  if(updatedWord.id) {
    await updateWord(updatedWord)
  } else {
    await createWord(updatedWord)
  }
  toggleWordView()
}

const table = useTemplateRef('app-table')
const removeSelectedWords = async (wordsIds: number[]) => {
  await removeWords(wordsIds)
  table.value?.clearSelectedRowsList()
}

const initialCategory = computed(() => {
  return categoryStore.selectedCategoryId
})
const selectedCategory = ref(initialCategory.value)
watch(initialCategory, (newValue) => {
  selectedCategory.value = newValue
})
const changeCategory = async (wordsIds: number[]) => {
  await changeWordsCategory(selectedCategory.value, wordsIds)
  selectedCategory.value = null
  table.value?.clearSelectedRowsList()
}
</script>

<style>
.select-category__wrapper .app-select {
  min-height: 38px;
  border: 2px solid mediumpurple;
  border-radius: 4px;
}
</style>

<style scoped>
.word-list {
  flex-grow: 1;
  padding: 16px;

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

.table-search__button {
  border: 2px solid lavender;
  padding: 4px 8px;
  outline: none;
}

.table-search__button:focus {
  border-color: purple;
}

.table-message__fetching {
  color: purple;
}

.table-message__empty {
  color: blue;
}

.table-message__error {
  color: red;
}

.select-category__wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
  border-right: 2px solid lavender;
}

.select-category__wrapper .selected-button {
  color: white;
}

.remove-button {
  margin-left: 16px;
  margin-right: 8px;
}
</style>
