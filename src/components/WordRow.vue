<template>
  <tr>
    <th scope="row"><p>{{ word.word }}</p></th>
    <td><p>{{ word.transcription }}</p></td>
    <td><p>{{ word.definition }}</p></td>
    <td><p>{{ word.translation }}</p></td>

    <td class="td-action">
      <button class="icon-button_filled" @click="openModal">
        <v-icon name="ri-pencil-line" title="Edit word" />
      </button>
    </td>
    <td class="td-action">
      <button class="icon-button_filled" @click="deleteWordFromCategory">
        <v-icon name="ri-delete-bin-2-line" title="Delete from category" />
      </button>
    </td>
  </tr>

  <WordModal v-if="isModalOpen" :word="word" @closeModal="closeModal" />
</template>

<script setup>
import WordModal from './WordModal.vue'
import { useWordStore } from '../stores/word.js'
import { useModal } from '../composables/useModal.js'

const props = defineProps({
  word: Object
})

const { isModalOpen, closeModal, openModal } = useModal()

const wordStore = useWordStore()
const deleteWordFromCategory = async () => {
  await wordStore.deleteWord(props.word.id)
}
</script>
