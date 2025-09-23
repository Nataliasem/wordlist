<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <AppTable
        ref="app-table"
        :column-config="WORD_TABLE_CONFIG"
        :table-data="wordList"
        @click-row="toggleShowWord"
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
              @click="removeWords(selectedRows)"
            >
              Remove selected
            </button>
          </template>

          <AppPagination
            v-else
            v-model="currentPage"
            :total-items="1000"
          />
        </template>

        <template
          v-if="tableMessage"
          #table-message
        >
          <p :class="`table-message__${tableMessage.type}`">
            <span>{{ tableMessage.text }}</span>
            <span v-if="tableMessage.type === 'error'">
              Please <a @click="reloadPage">reload the page</a>.
            </span>
          </p>
        </template>
      </AppTable>
    </div>
  </div>

  <WordView
    :show="isWordShown"
    :word="word"
    @hide-word="word = null"
  />
</template>

<script setup lang="ts">
import { AppPagination } from '@/components/common'
import WordView from './WordView.vue'
import { AppSelect, AppTable } from '@/components/common'
import { computed, watch, ref, useTemplateRef } from 'vue'
import { useSearch } from '@/composables/index.js'
import { useCategoryStore, useWordStore } from '@/stores/index.js'
import { WORD_TABLE_CONFIG, EMPTY_WORD, WORD_TABLE_MESSAGE } from '@/constants.js'
import { reloadPage } from '@/utils/index.js'
import { Word } from '@/types/word'
import { useCustomFetch } from '@/composables/index.js'
import { getWordlist } from '@/api/word'
import { DEFAULT_FETCH_LIMIT, DEFAULT_WORD_SORT } from '@/constants'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const word = ref(null)
const isWordShown = computed(() => {
  return Boolean(word.value)
})
const toggleShowWord = (data: Word) => {
  word.value = isWordShown.value ? null : {
    ...data,
    category: categoryStore.selectedCategoryId
  }
}

const {
  searchString,
  hasActiveSearch,
  clearSearch
} = useSearch()

const addWord = () => {
  toggleShowWord({
    ...EMPTY_WORD,
    word: searchString.value,
    category: categoryStore.selectedCategoryId
  })
}

const table = useTemplateRef('app-table')
const removeWords = async (wordsIds: number[]) => {
  await wordStore.removeWords(wordsIds)
  await fetchWordList()
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
  await wordStore.changeWordsCategory(selectedCategory.value, wordsIds)
  await fetchWordList()
  selectedCategory.value = null
  table.value?.clearSelectedRowsList()
}

const currentPage = ref(1)
const queryParams = computed(() => ({
  word: searchString.value,
  offset: currentPage.value - 1,
  sortColumn: DEFAULT_WORD_SORT.column,
  sortDirection: DEFAULT_WORD_SORT.direction,
  limit: DEFAULT_FETCH_LIMIT
}))
watch(searchString, () => {
  if (searchString.value.length) {
    currentPage.value = 1
  }
})

const resetQueryParams = () => {
  searchString.value = ''
  currentPage.value = 1
}

const tableMessage = computed(() => {
  if (hasError.value) return WORD_TABLE_MESSAGE.error
  if (!hasActiveSearch.value && isEmpty.value) return WORD_TABLE_MESSAGE.empty
  if (hasActiveSearch.value && isEmpty.value) return WORD_TABLE_MESSAGE.emptySearch

  return null
})

const {
  isEmpty,
  hasError,
  data: wordList,
  fetchData,
} = useCustomFetch(getWordlist)


const fetchWordList = async () => {
  await fetchData(categoryStore.selectedCategoryId, queryParams.value)
}

watch(() => categoryStore.selectedCategoryId, () => {
  resetQueryParams()
  fetchWordList()
})

watch(queryParams, () => {
  fetchWordList()
}, { immediate: true })
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

.wordlist-pagination-wrapper {
  margin-top: 32px;
}
</style>
