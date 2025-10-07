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

<template>
  <tr
    id="table-row"
    class="cursor-pointer transition-all duration-300 ease-in"
    :class="isSelected ? 'bg-amber-500 hover:bg-amber-600' : 'hover:bg-violet-200'"
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
      <p
        class="p-1 overflow-hidden text-ellipsis whitespace-nowrap"
        :class="{ 'blur-sm': hiddenColumns.has(item.key) }"
      >
        {{ rowData[item.key] }}
      </p>
    </td>
  </tr>
</template>

