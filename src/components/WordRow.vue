<template>
  <tr>
    <th scope="row">{{ word.word }}</th>
    <td>{{ word.transcription }}</td>
    <td>{{ word.definition }}</td>
    <td>{{ word.translation }}</td>
    <td>{{ word.category?.name || 'No category' }}</td>

    <td class="td-action">
      <button>✎</button>
    </td>
    <td class="td-action">
      <button @click="deleteWordFromCategory">❌</button>
    </td>
  </tr>
</template>

<script setup>
import { deleteWord } from '../api/word.js'

const props = defineProps({
  word: Object
})

const emit = defineEmits([ 'updateWords' ])
const deleteWordFromCategory = async () => {
  await deleteWord(props.word.id)
  emit('updateWords')
}
</script>
