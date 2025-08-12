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
      :categories="categories"
      :selected-category="selectedCategory"
      @close="isModalOpen = false"
      @update-words="updateWords"
    />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import WordModal from './WordModal.vue'
import { deleteWord } from '../api/word.js'

const props = defineProps({
  selectedCategory: Object,
  categories: Array,
  word: Object
})

const emit = defineEmits([ 'update-words' ])
const updateWords = () => {
  emit('update-words')
}

const deleteWordFromCategory = async () => {
  await deleteWord(props.word.id)
  updateWords()
}

const isModalOpen = ref(false)
</script>
