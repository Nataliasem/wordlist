<template>
  <tr class="add-word-row">
    <td v-for="(_, key) in word">
       <textarea
         rows="1"
         v-model="word[key]"
         :name="word[key]"
       />
    </td>

    <td class="td-action">
      <button
        :disabled="!selectedCategory?.id"
        @click="addWordToCategory">
        ✅
      </button>
    </td>

    <td class="td-action">
      <button @click="clearUserInput">❌</button>
    </td>
  </tr>
</template>

<script setup>
import { ref, watch } from 'vue'
import { createWord } from '../api/word.js'

const props = defineProps({
  selectedCategory: Object
})

const emit = defineEmits([ 'update-words' ])

watch(() => props.selectedCategory, () => {
  word.value.category = props.selectedCategory?.name || 'No category'
})

const word = ref({
  word: '',
  transcription: '',
  definition: '',
  translation: '',
  category: ''
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
  emit('update-words')
  clearUserInput()
}

</script>

<style>
.add-word-row {
  background-color: lavender;
}
</style>

