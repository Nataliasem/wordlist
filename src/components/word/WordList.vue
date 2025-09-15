<template>
  <div class="word-list">
    <div class="scrollable-table-container">
      <h2>Category: {{ categoryStore.selectedCategoryName }}</h2>

      <AppTable
        :column-config="WORD_TABLE_CONFIG"
        :table-data="filteredWords"
        @click-row="toggleShowWord"
      >
        <template #search>
          <div class="word-list-search">
            <AppSearch
              v-model="filteredWords"
              search-by-field="word"
              :list="wordStore.data"
              @confirm-search="addWord"
            />
          </div>
        </template>

        <template #selected-rows-action="{ selectedRows }">
          <button
            class="selected-button"
            type="button"
            @click="removeWords(selectedRows)"
          >
            Remove selected words
          </button>
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

<script setup>
import WordView from './WordView.vue'
import { AppSearch, AppTable } from '@/components/common'
import { computed, onMounted, ref } from 'vue'
import { useCategoryStore, useWordStore } from '@/stores/index.js'
import { WORD_TABLE_CONFIG, EMPTY_WORD, WORD_TABLE_MESSAGE } from '@/constants.js'
import { reloadPage } from '@/utils/index.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const word = ref(null)
const isWordShown = computed(() => {
  return Boolean(word.value)
})
const toggleShowWord = (data) => {
  word.value = isWordShown.value ? null : {
    ...data,
    category: categoryStore.selectedCategoryId
  }
}

const addWord = (word) => {
  toggleShowWord({
    ...EMPTY_WORD,
    word: word,
    category: categoryStore.selectedCategoryId
  })
}

const removeWords = (wordsIds) => {
  wordsIds.forEach(async (wordId) => {
    await wordStore.removeWord(wordId)
  })
}

const filteredWords = ref([])
const tableMessage = computed(() => {
  if(wordStore.isFetching) return WORD_TABLE_MESSAGE.fetching
  if(wordStore.hasError) return WORD_TABLE_MESSAGE.error
  if(wordStore.isEmpty) return WORD_TABLE_MESSAGE.empty
  if(!filteredWords.value?.length) return WORD_TABLE_MESSAGE.emptySearch
  return null
})
onMounted(async () => {
  await wordStore.fetchData(categoryStore.selectedCategoryId)
  filteredWords.value = wordStore.data
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

.table-message__fetching {
  color: purple;
}

.table-message__empty {
  color: blue;
}

.table-message__error {
  color: red;
}

.word-list-search {
  min-width: 300px;
}
</style>
