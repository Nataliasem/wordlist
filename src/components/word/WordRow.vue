<template>
  <tr :class="{'ready-to-deletion': isReadyForRemoval}">
    <th scope="row"><p>{{ word.word }}</p></th>
    <td><p>{{ word.transcription }}</p></td>
    <td><p>{{ word.definition }}</p></td>
    <td><p>{{ word.translation }}</p></td>

    <td class="td-action">
      <button class="icon-button_filled" @click="prepareToUpdate(word.id)">
        <v-icon name="ri-pencil-line" title="Edit word" />
      </button>
    </td>
    <td class="td-action" >
      <button class="icon-button_filled" @click="switchToRemove(word.id)">
        <v-icon name="ri-delete-bin-2-line" title="Delete from category" />
      </button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'

const readyForRemovalWords = defineModel('readyForRemovalWords', {
  type: Array,
  default: []
})

const props = defineProps({
  word: Object
})

const emit = defineEmits(['update-word'])

const isReadyForRemoval = computed(() => {
  return readyForRemovalWords.value.includes(props.word?.id)
})

const switchToRemove = (id) => {
  isReadyForRemoval.value
    ? readyForRemovalWords.value = readyForRemovalWords.value.filter(item => item !== id)
    : readyForRemovalWords.value.push(id)
}

const prepareToUpdate = (id) => {
  if(isReadyForRemoval.value) {
    switchToRemove(id)
  }
  emit('update-word')
}
</script>


<style>
tr.ready-to-deletion {
  background-color: orange;
}

tr.ready-to-deletion:hover {
  background-color: darkorange;
}
</style>
