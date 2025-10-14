<script setup lang="ts">
import { computed, watch, ref, useTemplateRef } from 'vue'
import WordForm from './WordForm.vue'
import CategorySelect from '@/components/category/CategorySelect.vue'
import { AppTable, AppPagination, AppView, AppMessage, AppSearchInput } from '@/components/common'
import { useWordFetch, useWordView, useWordService } from '@/composables'
import { useCategoryStore } from '@/stores'
import { WORD_TABLE_CONFIG, EMPTY_WORD } from '@/constants'
import { Word, UpdatedWord } from '@/types/word'
import type { Ref } from 'vue'

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
        :table-data="wordList"
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
          <AppMessage
            :message="fetchMessage"
            class="w-full"
          />
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
