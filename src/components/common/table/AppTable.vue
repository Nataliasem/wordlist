<template>
  <div class="table-actions__wrapper">
    <div
      v-if="$slots.search"
      class="table-search__wrapper"
    >
      <slot name="search" />
    </div>

    <div v-if="selectedRows.length">
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
      :column-config="columnConfig"
    />

    <tbody>
      <template v-if="tableData.length">
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

      <tr v-else>
        <td
          class="table-message"
          :colspan="columnLength"
        >
          <slot name="table-message">No data loaded</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import TableHead from './TableHead.vue'
import TableRow from './TableRow.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  columnConfig: {
    type: Array,
    required: true
  }
})

defineEmits(['click-row'])

const FIXED_COLUMN_NUMBER = 1
const columnLength = computed(() => props.columnConfig.length + FIXED_COLUMN_NUMBER)

const hiddenColumns = ref({})

const selectedRows = ref([])
const clearSelectedRowsList = () => {
  selectedRows.value = []
}
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
  margin-left: 8px;
  border: 2px solid orange;
  padding: 8px;
}

.selected-button.cancel {
  background-color: orange;
}
</style>
