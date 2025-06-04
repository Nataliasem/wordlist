<template>
  <form class="word-form">
    <input v-for="(_, key) in word"
      v-model="word[key]"
      class="word-input"
      type="text"
      :placeholder="key"
    >
    <button type="button" @click="addWordToCategory">Add word to category</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  selectedCategoryId: Number
})

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
</style>
