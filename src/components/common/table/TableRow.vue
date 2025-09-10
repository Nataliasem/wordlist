<template>
  <tr
    class="table-row cursor-pointer"
    :class="{'selected': isSelected}"
  >
    <td class="text-center">
      <input
        v-model="selectedRows"
        :value="rowData.id"
        type="checkbox"
        title="Select row"
      >
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

.table-row input[type="checkbox"] {
  accent-color: white;
  width: 16px;
  height: 16px;
}
</style>
