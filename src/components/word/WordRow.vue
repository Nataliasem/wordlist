<template>
  <tr>
    <th scope="row"><p>{{ word.word }}</p></th>
    <td><p>{{ word.transcription }}</p></td>
    <td><p>{{ word.definition }}</p></td>
    <td><p>{{ word.translation }}</p></td>

    <td class="td-action">
      <button class="icon-button_filled" @click="$emit('update-word')">
        <v-icon name="ri-pencil-line" title="Edit word" />
      </button>
    </td>
    <td class="td-action">
      <button class="icon-button_filled" @click="$emit('delete-word')">
        <v-icon name="ri-delete-bin-2-line" title="Delete from category" />
      </button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  word: Object
})

defineEmits(['update-word', 'delete-word'])
</script>
