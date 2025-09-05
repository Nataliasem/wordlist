<template>
  <tr :class="{'ready-to-deletion': isReadyForRemoval}">
    <template v-for="item in columnConfig">
      <td v-if="item.display"><p>{{ rowData[item.key] }}</p></td>
    </template>

    <td class="table-row-action">
      <button class="icon-button_filled" @click="prepareToUpdate">
        <v-icon name="ri-pencil-line" title="Edit row" />
      </button>
    </td>
    <td class="table-row-action" >
      <button class="icon-button_filled" @click="switchToRemove">
        <v-icon name="ri-delete-bin-2-line" title="Delete row" />
      </button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'

const readyForRemovalRows = defineModel('readyForRemovalRows', {
  type: Array,
  default: []
})

const props = defineProps({
  columnConfig: Array,
  rowData: Object
})

const emit = defineEmits(['edit-row'])

const isReadyForRemoval = computed(() => {
  return readyForRemovalRows.value.includes(props.rowData.id)
})

const addToRemovalList = () => {
  readyForRemovalRows.value.push((props.rowData.id))
}
const deleteFromRemovalList = () => {
  readyForRemovalRows.value = readyForRemovalRows.value.filter(item => item !== props.rowData.id)
}
const switchToRemove = () => {
  isReadyForRemoval.value
    ? deleteFromRemovalList()
    : addToRemovalList()
}

const prepareToUpdate = () => {
  if(isReadyForRemoval.value) {
    deleteFromRemovalList()
  }
  emit('edit-row')
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
