<template>
  <div class="table-actions__wrapper">
    <div class="search-row-input__wrapper">
      <input
        v-model="searchRow"
        id="search-row-input"
        type="text"
        class="search-row-input"
        placeholder="Enter a word here..."
      >
      <button class="icon-button_filled" type="button" @click="$emit('add-row', searchRow)">
        <v-icon name="ri-play-list-add-fill" :scale="1.3" title="Add new word" fill="purple" />
      </button>
    </div>

    <div v-if="readyForRemovalRows.length">
      <button  class="remove-button" type="button" @click="removeSelectedRows">
        Remove selected words
      </button>

      <button class="remove-button cancel" type="button" @click="clearRemovalRowsList">
        Cancel
      </button>
    </div>
  </div>

  <table class="app-table">
    <thead>
    <tr>
      <th v-for="item in columnConfig" :key="item.title">
        <span :class="{'required-field': item.isRequired}">{{ item.title }}</span>
      </th>
    </tr>
    </thead>

    <tbody>
    <AddTableRow />

    <tr v-if="$slots.fetching">
      <td :colspan="columnLength" class="table-message fetching">
        <slot name="fetching"><p>Fetching data...</p></slot>
      </td>
    </tr>

    <tr v-else-if="$slots.fetchingError">
      <td :colspan="columnLength" class="table-message error">
        <slot name="fetchingError"><p>Something went wrong.</p></slot>
        <p>Please <a @click="reloadPage">reload the page</a>.</p>
      </td>
    </tr>

    <tr v-else-if="$slots.emptyData">
      <td :colspan="columnLength" class="table-message empty">
        <slot name="emptyData">
          <p>No data.</p>
        </slot>
      </td>
    </tr>

    <tr v-else-if="foundedRows.length === 0">
      <td :colspan="columnLength" class="table-message empty">
        <slot name="emptySearch"><p>Nothing was found. Try changing the search criteria.</p></slot>
      </td>
    </tr>

    <TableRow
      v-for="row in foundedRows"
      v-model:readyForRemovalRows="readyForRemovalRows"
      :key="row.id"
      :row-config="rowConfig"
      :row-data="row"
      @edit-row="$emit('edit-row', row)"
    >
    </TableRow>
    </tbody>
  </table>
</template>

<script setup>
import AddTableRow from './AddTableRow.vue'
import TableRow from './TableRow.vue'
import { computed, ref } from 'vue'
import { filterBySearchString, reloadPage } from '../../../utils/index.js'

const props = defineProps({
  tableData: Array,
  columnConfig: Array,
  rowConfig: Array,
  searchCriteria: String,
})

const emit = defineEmits(['add-row', 'edit-row', 'remove-rows'])

const columnLength = computed(() => props.columnConfig.length)

const searchRow = ref('')
const foundedRows = computed(() => {
  return filterBySearchString(props.tableData, props.searchCriteria, searchRow.value)
})

const readyForRemovalRows = ref([])
const removeSelectedRows = () => {
  emit('remove-rows', readyForRemovalRows.value)
  clearRemovalRowsList()
}
const clearRemovalRowsList = () => {
  readyForRemovalRows.value = []
}

</script>

<style>
.table-actions__wrapper {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-row-input__wrapper {
  display: flex;
  align-items: center;
}

.search-row-input {
  padding: 9px;
  min-width: 300px;
  margin-right: 8px;
  border: 2px solid lavender;
  border-radius: 4px;
}

.table-actions__wrapper .icon-button_filled {
  border: 2px solid lavender;
  padding: 4px 8px;
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
}

th p, td p {
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  margin: 0;
}

.table-row-action {
  text-align: center;
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

.table-message.fetching {
  color: purple;
}

.table-message.empty {
  color: blue;
}

.table-message.error {
  color: red;
}

.remove-button {
  margin-left: 8px;
  border: 2px solid orange;
  padding: 8px;
}
.remove-button.cancel {
  background-color: orange;
}
</style>
