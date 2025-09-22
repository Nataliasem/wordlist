<template>
  <div class="table-actions__wrapper">
    <div
      v-if="$slots.search"
      class="table-search__wrapper"
    >
      <slot name="search" />
    </div>

    <div
      v-if="selectedRows.length"
      class="selected-rows-action__wrapper"
    >
      <slot
        name="selected-rows-action"
        :selected-rows="selectedRows"
      />

      <button
        class="selected-button cancel"
        type="button"
        @click="clearSelectedRowsList"
      >
        Cancel
      </button>
    </div>
  </div>

  <table class="app-table">
    <TableHead
      v-model:hidden-columns="hiddenColumns"
      v-model:all-selected="allSelected"
      :column-config="columnConfig"
      @select-all="selectAllRows"
    />

    <tbody>
      <tr v-if="$slots['table-message']">
        <td
          class="table-message"
          :colspan="columnLength"
        >
          <slot name="table-message" />
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
  }[]
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

<style>
.table-actions__wrapper {
  height: 32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-search__wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-table {
  width: 100%;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

th, td {
  padding: 4px;
  height: 28px;
}

th p, td p {
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  margin: 0;
}

tr {
  transition: background-color 0.3s ease;
}

tr:hover:not(thead tr) {
  background-color: lavenderblush;
}

.table-message p {
  width: 100%;
  text-align: center;
}

.selected-button {
  border: 2px solid orange;
  padding: 8px;
}

.selected-button.cancel {
  background-color: orange;
  border-color: orange;
}

.selected-button.confirm {
  background-color: mediumpurple;
  border-color: mediumpurple;
}

.selected-rows-action__wrapper {
  display: flex;
}
</style>
