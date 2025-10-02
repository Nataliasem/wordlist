<template>
  <div class="word-list flex-1 p-4">
    <div>
      <h2 class="text-3xl mb-8">
        Category: {{ categoryStore.selectedCategoryName }}
      </h2>

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
            class="app-input p-1 h-10 min-w-xs"
            placeholder="Enter a word here..."
          >
          <button
            id="add-word-button"
            class="app-button border-violet-200 hover:bg-violet-100 hover:border-violet-200 focus:border-violet-300"
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
            class="app-button border-violet-200 hover:bg-violet-100 hover:border-violet-200 focus:border-violet-300"
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
            <div class="flex items-center gap-2 pr-4 ml-2 border-r-2 border-r-violet-200">
              <AppSelect
                id="select-category"
                v-model="selectedCategory"
                name="select-category"
                :options="categoryStore.data"
                class="select-category"
              />

              <button
                class="app-button bg-violet-100 border-violet-200"
                type="button"
                @click="changeCategory(selectedRows)"
              >
                Change category
              </button>
            </div>

            <button
              class="app-button border-amber-500 bg-orange-200 ml-4"
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
          <span :class="fetchMessage.style">
            <span>{{ fetchMessage.text }}</span>
            <span v-if="fetchMessage.type === 'error'">
              Please <a @click="reloadPage">reload the page</a>.
            </span>
          </span>
        </template>
      </AppTable>
    </div>
  </div>

  <AppView
    :show="isWordViewShown"
    :ignore-el-selectors="['#table-row', '#add-word-button']"
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
import { useWordsFetch, useWordView, useWordService } from '@/composables/index.js'
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
  fetchWordList
} = useWordsFetch()

const {
  removeWords,
  changeWordsCategory,
  updateWord,
  createWord
} = useWordService()

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
    await fetchWordList()
  } else {
    await createWord(updatedWord)
    await fetchWordList()
  }
  toggleWordView()
}

const table = useTemplateRef('app-table')
const removeSelectedWords = async (wordsIds: number[]) => {
  await removeWords(wordsIds)
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
  await changeWordsCategory(selectedCategory.value, wordsIds)
  await fetchWordList()
  selectedCategory.value = null
  table.value?.clearSelectedRowsList()
}
</script>
