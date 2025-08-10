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
import { ref } from 'vue'
import { createWord } from '../api/word.js'

const props = defineProps({
  selectedCategory: Object
})

const emit = defineEmits([ 'updateWords' ])

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
  await createWord({
      ...word.value,
      category: props.selectedCategory?.id
    }
  )
  emit('updateWords')
  clearUserInput()
}

</script>

<style>
.add-word-row {
  background-color: lavender;
}
</style>

