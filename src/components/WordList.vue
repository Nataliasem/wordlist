<template>
  <div class="word-list">
    <form class="word-form">
      <input v-for="(_, key) in word"
        v-model="word[key]"
        class="word-input"
        type="text"
        :placeholder="key"
      >
      <button type="button" @click="addWordToCategory">Add word to category</button>
    </form>

    <div v-if="!wordList.length">
      ⚠ Select category
    </div>

    <table v-else>
      <tr>
        <th>Word</th>
        <th>Transcription</th>
        <th>Definition</th>
        <th>Translation</th>
      </tr>

      <tr v-for="item in wordList" :key="item.id">
        <td>{{ item.word }}</td>
        <td>{{ item.transcription }}</td>
        <td>{{ item.definition }}</td>
        <td>{{ item.translation }}</td>
        <td>
          <button @click="deleteWord(item.id)">❌</button>
        </td>
        <td>
          <button>✏</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  selectedCategoryId: Number
})

watch(() => props.selectedCategoryId, () => {
  getWordListByCategory()
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

const word = ref({
  word: '',
  transcription: '',
  translation: '',
  definition: ''
})
const addWordToCategory = async () => {
  if (!word.value.word) {
    return
  }

  const response = await fetch('http://192.168.1.67:8080/api/v1/words', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...word.value,
      category: props.selectedCategoryId
    })
  })

  if (response.ok) {
    await getWordListByCategory()
    word.value = {
      word: '',
      transcription: '',
      translation: '',
      definition: ''
    }
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
</script>

<style scoped>
.word-form {
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 450px;
}

.word-input {
  padding: 8px;
  margin-bottom: 16px;
}

.word-list {
  flex-grow: 1;
  padding: 32px;
}

table, th, td {
  border:1px solid black;
}

th, td {
  padding: 4px;
}
</style>
