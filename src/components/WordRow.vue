<template>
  <tr>
    <th scope="row">{{ word.word }}</th>
    <td>{{ word.transcription }}</td>
    <td>{{ word.definition }}</td>
    <td>{{ word.translation }}</td>
    <td>{{ word.category?.name || 'No category' }}</td>

    <td class="td-action">
      <button @click="isModalOpen = true">
        <v-icon name="ri-pencil-line" title="Edit word" />
      </button>
    </td>
    <td class="td-action">
      <v-icon
        name="ri-delete-bin-2-line"
        title="Delete from category"
        @click="deleteWordFromCategory"
      />
    </td>
  </tr>

  <Teleport to="body">
    <WordModal
      :is-open="isModalOpen"
      :word="word"
      @close="isModalOpen = false"
    />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import WordModal from './WordModal.vue'
import { deleteWord } from '../api/word.js'
import { useWordStore } from '../stores/word.js'

const props = defineProps({
  word: Object
})

const wordStore = useWordStore()
const deleteWordFromCategory = async () => {
  await deleteWord(props.word.id)
  await wordStore.fetchWords()
}

const isModalOpen = ref(false)
</script>
