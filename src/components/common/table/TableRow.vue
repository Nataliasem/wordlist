<template>
  <tr
    class="table-row cursor-pointer"
    :class="{'ready-to-deletion': isReadyForRemoval}"
  >
    <template v-for="item in columnConfig">
      <td
        v-if="item.display"
        :key="item.key"
        @click="$emit('click-row')"
      >
        <p :class="{ blurred: hiddenColumns[item.key] }">
          {{ rowData[item.key] }}
        </p>
      </td>
    </template>

    <td class="text-center">
      <button
        class="icon-button_filled"
        @click="prepareToUpdate"
      >
        <v-icon
          name="ri-pencil-line"
          title="Edit row"
        />
      </button>
    </td>
    <td class="text-center">
      <button
        class="icon-button_filled"
        @click="switchToRemove"
      >
        <v-icon
          name="ri-delete-bin-2-line"
          title="Delete row"
        />
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
  columnConfig: {
    type: Array,
    required: true
  },
  rowData: {
    type: Object,
    required: true
  },
  hiddenColumns: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit-row', 'click-row'])

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
.table-row.ready-to-deletion {
  background-color: orange;
}

.table-row.ready-to-deletion:hover {
  background-color: darkorange;
}

.table-row .blurred {
  filter: blur(3px);
}
</style>
