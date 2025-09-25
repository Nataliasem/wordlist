<template>
  <tr
    class="table-row cursor-pointer"
    :class="{'selected': isSelected}"
  >
    <td class="text-center">
      <input
        :id="String(rowData.id)"
        v-model="selectedRows"
        :value="rowData.id"
        type="checkbox"
        title="Select row"
        class="accent-white w-4 h-4"
      >
    </td>

    <td
      v-for="item in columnConfig"
      :key="item.key"
      @click="$emit('click-row')"
    >
      <p :class="{ blurred: hiddenColumns.has(item.key) }">
        {{ rowData[item.key] }}
      </p>
    </td>
  </tr>
</template>

<script setup lang="ts" generic="T extends { id: number }">
import { computed } from 'vue'

const selectedRows = defineModel<number[]>('selectedRows', { default: [] })

interface Props {
  rowData: T
  columnConfig: {
    title: string
    key: string
    required: boolean
  }[]
  hiddenColumns: Set<string>
}

const props = defineProps<Props>()

defineEmits<{
  'click-row': []
}>()

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
</style>
