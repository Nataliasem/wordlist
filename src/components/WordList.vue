<template>
  <div class="word-list">
    <table>
      <caption>
        <h2>Category: {{ selectedCategory?.name || 'Without category' }}</h2>
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
        @update-words="getWordListByCategory"
      />

      <tr v-for="item in wordList" :key="item.id">
        <th scope="row">{{ item.word }}</th>
        <td>{{ item.transcription }}</td>
        <td>{{ item.definition }}</td>
        <td>{{ item.translation }}</td>
        <td>{{ item.category?.name || 'no category' }}</td>

        <td>
          <button>✎</button>
        </td>
        <td>
          <button @click="deleteWord(item.id)">❌</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AddWordRow from './AddWordRow.vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  selectedCategory: Object
})

watch(() => props.selectedCategory, () => {
  props.selectedCategory?.id
    ? getWordListByCategory()
    : getWordsWithoutCategory()
})

const wordList = ref([])
const getWordsWithoutCategory = async () => {
  const response = await fetch('http://192.168.1.67:8080/api/v1/words/categories/orphan')
  if (response.ok) {
    wordList.value = await response.json()
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

const getWordListByCategory = async () => {
  if (!props.selectedCategory?.id) {
    return
  }
  const response = await fetch(`http://192.168.1.67:8080/api/v1/words/categories/${ props.selectedCategory.id }`)
  if (response.ok) {
    wordList.value = await response.json()
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

const deleteWord = async (id) => {
  const response = await fetch(`http://192.168.1.67:8080/api/v1/words/${ id }`, {
    method: 'DELETE'
  })

  if (response.ok) {
    await getWordListByCategory()
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

onMounted(() => {
  if(!props.selectedCategory?.id) {
    getWordsWithoutCategory()
  }
})
</script>

<style scoped>
.word-list {
  flex-grow: 1;
  padding: 16px;
}
</style>
