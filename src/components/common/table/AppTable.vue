<script setup lang="ts">
import AppTableHead from './AppTableHead.vue'
import { computed, defineExpose, ref } from 'vue'
import { useTableRows } from '@/composables'
import { TableRow } from '@/types'

const props = defineProps<{
  tableData: TableRow[]
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
  'click-row': [row: TableRow]
}>()

const FIXED_COLUMN_NUMBER = 1
const columnLength = computed<number>(() => props.columnConfig.length + FIXED_COLUMN_NUMBER)

const hiddenColumns = ref(new Set<string>())

const tableDataIds = computed<number[] | string[]>(() => {
  if(typeof props.tableData[0]?.id === 'string') {
    return props.tableData.map(item => item.id) as string[]
  } else {
    return props.tableData.map(item => item.id) as number[]
  }
})
const { selectedRows, allSelected, clearSelectedRowsList, selectAllRows  } = useTableRows(tableDataIds)

defineExpose({
  clearSelectedRowsList
})
</script>

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
        :clear-selected-rows-list="clearSelectedRowsList"
      />
    </div>
  </div>

  <div class="table-scrollable-container">
    <table class="app-table w-full">
      <AppTableHead
        v-model:hidden-columns="hiddenColumns"
        v-model:all-selected="allSelected"
        :sorted-by="sortedBy"
        :column-config="columnConfig"
        @select-all="selectAllRows"
      />

      <tbody>
        <tr v-if="!tableData.length">
          <td :colspan="columnLength">
            <div class="w-full p-2 flex items-center justify-center">
              <slot name="table-message" />
            </div>
          </td>
        </tr>

        <template v-else>
          <tr
            v-for="row in tableData"
            id="table-row"
            :key="row.id"
            class="cursor-pointer transition-all duration-300 ease-in"
            :class="selectedRows.has(row.id) ? 'bg-amber-500 hover:bg-amber-600' : 'hover:bg-violet-200'"
          >
            <td class="text-center">
              <input
                :id="String(row.id)"
                v-model="selectedRows"
                :value="row.id"
                type="checkbox"
                title="Select row"
                class="accent-white w-4 h-4"
              >
            </td>

            <td
              v-for="item in columnConfig"
              :key="item.key"
              @click="$emit('click-row', row)"
            >
              <p
                class="p-1 overflow-hidden text-ellipsis whitespace-nowrap"
                :class="{ 'blur-sm': hiddenColumns.has(item.key) }"
              >
                {{ row[item.key] }}
              </p>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
.table-scrollable-container {
  height: 80vh;
  overflow-y: scroll;
  padding-bottom: 32px;
}
</style>
