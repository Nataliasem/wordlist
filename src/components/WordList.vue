<template>
  <div class="word-list">
    <table>
      <caption>
        <h2>Category: {{ selectedCategory?.name || 'No category' }}</h2>
      </caption>

      <thead>
      <tr>
        <th>Word</th>
        <th>Transcription</th>
        <th>Definition</th>
        <th>Translation</th>
        <th>Category</th>
        <th>Add/edit</th>
        <th>Delete</th>
      </tr>
      </thead>

      <tbody>
      <AddWordRow
        :selected-category="selectedCategory"
        @update-words="updateWords"
      />

      <tr v-for="item in wordList" :key="item.id">
        <th scope="row">{{ item.word }}</th>
        <td>{{ item.transcription }}</td>
        <td>{{ item.definition }}</td>
        <td>{{ item.translation }}</td>
        <td>{{ item.category?.name || 'No category' }}</td>

        <td>
          <button>✎</button>
        </td>
        <td>
          <button @click="deleteWordFromCategory(item.id)">❌</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AddWordRow from './AddWordRow.vue'
import { ref, watch } from 'vue'
import { getWordlist, deleteWord} from '../api/word.js'

const props = defineProps({
  selectedCategory: Object
})

watch(() => props.selectedCategory, () => {
  updateWords()
})

const wordList = ref([])
const updateWords = async () => {
  wordList.value = await getWordlist(props.selectedCategory?.id || '')
}

const deleteWordFromCategory = async (id) => {
  await deleteWord(id)
  await updateWords()
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
