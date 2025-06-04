<template>
  <div class="word-list">

    <table>
      <tr>
        <th>Word</th>
        <th>Transcription</th>
        <th>Definition</th>
        <th>Translation</th>
        <td>Add/edit</td>
        <td>Delete</td>
      </tr>

      <AddWordRow
        v-if="selectedCategoryId"
        :selected-category-id="selectedCategoryId"
        @update-words="getWordListByCategory"
      />

      <tr v-for="item in wordList" :key="item.id">
        <td>{{ item.word }}</td>
        <td>{{ item.transcription }}</td>
        <td>{{ item.definition }}</td>
        <td>{{ item.translation }}</td>

        <td>
          <button>✎</button>
        </td>
        <td>
          <button @click="deleteWord(item.id)">❌</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import AddWordRow from './AddWordRow.vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  selectedCategoryId: Number
})

watch(() => props.selectedCategoryId, () => {
  props.selectedCategoryId
    ? getWordListByCategory()
    : getWordList()

})

const wordList = ref([])
const getWordList = async () => {
  const response = await fetch('http://192.168.1.67:8080/api/v1/words')
  if (response.ok) {
    wordList.value = await response.json()
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

const getWordListByCategory = async () => {
  if (!props.selectedCategoryId) {
    return
  }
  const response = await fetch(`http://192.168.1.67:8080/api/v1/words/categories/${ props.selectedCategoryId }`)
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
  if(!props.selectedCategoryId) {
    getWordList()
  }
})
</script>

<style scoped>
.word-list {
  flex-grow: 1;
  padding: 32px;
}
</style>
