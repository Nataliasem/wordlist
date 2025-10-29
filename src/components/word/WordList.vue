<script setup lang="ts">
import { defineAsyncComponent, computed, watch, ref, useTemplateRef } from 'vue'
import AppTable from '@/components/common/table/AppTable.vue'
import AppPagination from '@/components/common/AppPagination.vue'
import AppView from '@/components/common/AppView.vue'
import AppSearchInput  from '@/components/common/AppSearchInput.vue'
import { useWordFetch, useWordView, useWordService } from '@/composables'
import { useCategoryStore } from '@/stores'
import { WORD_TABLE_CONFIG, EMPTY_WORD, MessageType } from '@/constants'
import { TableRow, Word, UpdatedWord } from '@/types'
import type { Ref } from 'vue'
import { reloadPage } from '@/utils'

const WordForm = defineAsyncComponent(() => import('./WordForm.vue'))
const CategorySelect = defineAsyncComponent(() => import('@/components/category/CategorySelect.vue'))

type WordRow = Word & TableRow

// TODO: fix after backend WL-54
const TEMPORARY_TOTAL_PAGES = 1000

const categoryStore = useCategoryStore()

const {
  sortedBy,
  currentPage,
  searchString,
  wordList,
  fetchMessage,
  fetchWordList
} = useWordFetch()

const {
  removeWords,
  changeWordsCategory,
  updateWord,
  createWord
} = useWordService()

const { isWordViewShown, toggleWordView } = useWordView()
const word: Ref<UpdatedWord> = ref(EMPTY_WORD)
const editWord = (data: WordRow) => {
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
const createOrUpdateWord = async (updatedWord: UpdatedWord) => {
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

const initialCategory = computed<number | null>(() => {
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

<template>
  <div class="word-list flex-1 p-4">
    <div>
      <h2 class="text-3xl mb-8">
        Category: {{ categoryStore.selectedCategoryName }}
      </h2>

      <AppTable
        ref="app-table"
        :column-config="WORD_TABLE_CONFIG"
        :table-data="wordList as WordRow[]"
        :sorted-by="sortedBy"
        @click-row="editWord"
      >
        <template #search>
          <AppSearchInput
            id="word-search"
            v-model="searchString"
            placeholder="Enter a word here"
            show-clear
            @confirm="addWord"
          />
        </template>

        <template #selected-rows-action="{ selectedRows }">
          <template v-if="selectedRows.length > 0">
            <div class="flex items-center gap-2 pr-4 ml-2 border-r-2 border-r-violet-200">
              <CategorySelect v-model="selectedCategory" />

              <button
                class="app-button bg-violet-100 border-violet-200"
                type="button"
                @click="changeCategory(selectedRows as number[])"
              >
                Change category
              </button>
            </div>

            <button
              class="app-button border-amber-500 bg-orange-200 ml-4"
              type="button"
              @click="removeSelectedWords(selectedRows as number[])"
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
          <p class="w-full app-message">
            <span>{{ fetchMessage.text }}</span>
            <span v-if="fetchMessage.type === MessageType.Error">
              Please <a @click="reloadPage">reload the page</a>.
            </span>
          </p>
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
