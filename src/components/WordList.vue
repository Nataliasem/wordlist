<template>
  <div class="word-list">
    <table>
      <caption>
        <h2>Category: {{ selectedCategoryName }}</h2>
      </caption>

      <thead>
      <tr>
        <th>Word</th>
        <th>Transcription</th>
        <th>Definition</th>
        <th>Translation</th>
        <th>Category</th>
        <th>Add/edit</th>
        <th>Clear</th>
      </tr>
      </thead>

      <tbody>
      <AddWordRow
        :categories="categories"
        :selected-category="selectedCategory"
        @update-words="updateWords"
      />

      <template v-for="item in wordList" :key="item.id">
        <WordRow
          :word="item"
          :categories="categories"
          :selected-category="selectedCategory"
          @update-words="updateWords"
        />
      </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AddWordRow from './AddWordRow.vue'
import WordRow from './WordRow.vue'
import { computed, ref, watch } from 'vue'
import { getWordlist} from '../api/word.js'

const props = defineProps({
  categories: Array,
  selectedCategory: Object
})

watch(() => props.selectedCategory, () => {
  updateWords()
})

const selectedCategoryName = computed(() => props.selectedCategory?.name || 'No category')

const wordList = ref([])
const updateWords = async () => {
  wordList.value = await getWordlist(props.selectedCategory?.id || '')
}
</script>

<style scoped>
.word-list {
  position: fixed;
  top: 0;
  left: 300px;
  flex-grow: 1;
  padding: 16px;
}
</style>
