<template>
  <div class="h-8 mb-8 flex items-center justify-between">
    <div
      v-if="$slots.search"
      class="flex gap-2 items-center"
    >
      <slot name="search" />
    </div>

    <div class="flex">
      <slot
        name="selected-rows-action"
        :selected-rows="selectedRows"
      />

      <button
        v-if="selectedRows.length"
        class="app-button bg-amber-500 border-amber-500 ml-2"
        type="button"
        @click="clearSelectedRowsList"
      >
        Cancel
      </button>
    </div>
  </div>

  <table class="app-table w-full">
    <TableHead
      v-model:hidden-columns="hiddenColumns"
      v-model:all-selected="allSelected"
      :sorted-by="sortedBy"
      :column-config="columnConfig"
      @select-all="selectAllRows"
    />

    <tbody>
      <tr v-if="!tableData.length">
        <td :colspan="columnLength">
          <p class="w-full text-center">
            <slot name="table-message" />
          </p>
        </td>
      </tr>

      <template v-else>
        <TableRow
          v-for="row in tableData"
          :key="row.id"
          v-model:selected-rows="selectedRows"
          :column-config="columnConfig"
          :row-data="row"
          :hidden-columns="hiddenColumns"
          @click-row="$emit('click-row', row)"
        />
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts" generic="T extends { id: number }">
import TableHead from './TableHead.vue'
import TableRow from './TableRow.vue'
import { computed, defineExpose, ref } from 'vue'

const props = defineProps<{
  tableData: T[]
  columnConfig: {
    title: string
    key: string
    required: boolean
    sortable: boolean
  }[]
  sortedBy: {
    sortColumn: string
    sortDirection: string
  }
}>()

defineEmits<{
  'click-row': [row: T]
}>()

const FIXED_COLUMN_NUMBER = 1
const columnLength = computed(() => props.columnConfig.length + FIXED_COLUMN_NUMBER)

const hiddenColumns = ref(new Set<string>())

const selectedRows = ref([])
const allSelected = ref(false)
const clearSelectedRowsList = () => {
  selectedRows.value = []
  allSelected.value = false
}
const tableDataIds = computed(() => {
  return props.tableData.map(item => item.id)
})
const selectAllRows = () => {
  selectedRows.value = allSelected.value ? tableDataIds.value : []
}
defineExpose({
  clearSelectedRowsList
})
</script>
