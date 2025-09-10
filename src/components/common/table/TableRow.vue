<template>
  <tr
    class="table-row cursor-pointer"
    :class="{'selected': isSelected}"
  >
    <td>
      <button
        class="icon-button_filled"
        @click="switchSelected"
      >
        <v-icon
          name="ri-checkbox-line"
          title="Select row"
        />
      </button>
    </td>

    <td
      v-for="item in columnConfig"
      :key="item.key"
      @click="$emit('click-row')"
    >
      <p :class="{ blurred: hiddenColumns[item.key] }">
        {{ rowData[item.key] }}
      </p>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'

const selectedRows = defineModel('selectedRows', {
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

defineEmits([ 'click-row' ])

const isSelected = computed(() => {
  return selectedRows.value.includes(props.rowData.id)
})

const addToSelectedRowsList = () => {
  selectedRows.value.push((props.rowData.id))
}
const deleteFromSelectedRowsList = () => {
  selectedRows.value = selectedRows.value.filter(item => item !== props.rowData.id)
}
const switchSelected = () => {
  isSelected.value
    ? deleteFromSelectedRowsList()
    : addToSelectedRowsList()
}
</script>


<style>
.table-row.selected {
  background-color: orange;
}

.table-row.selected:hover {
  background-color: darkorange;
}

.table-row .blurred {
  filter: blur(3px);
}
</style>
