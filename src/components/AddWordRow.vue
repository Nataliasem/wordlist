<template>
  <tr class="add-word-row">
    <td v-for="(_, key) in word">
       <textarea
         rows="1"
         v-model="word[key]"
         :placeholder="key"
       />
    </td>

    <td>
      <button @click="addWordToCategory">✅</button>
    </td>

    <td>
      <button @click="clearUserInput">❌</button>
    </td>
  </tr>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  selectedCategory: Object,
})

const emit = defineEmits(['updateWords'])

const word = ref({
  word: '',
  transcription: '',
  definition: '',
  translation: '',
  category: props.selectedCategory?.name || ''
})
const clearUserInput = () => {
  word.value = {
    word: '',
    transcription: '',
    translation: '',
    definition: '',
    category: null
  }
}

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
      category: props.selectedCategory?.id
    })
  })

  if (response.ok) {
    emit('updateWords')
    clearUserInput()
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

</script>

<style>
.add-word-row {
  background-color: lavender;
}
</style>

