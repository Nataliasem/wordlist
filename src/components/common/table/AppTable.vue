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
      <button class="icon-button_filled" type="button" @click="openAddRowModal">
        <v-icon name="ri-play-list-add-fill" :scale="1.3" title="Add new" fill="purple" />
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
    <tr class="add-table-row">
      <td v-for="(_, key) in model">
        <AppTextarea
          v-model="model[key]"
          :id="key"
          :ref="(el) => { inputRefs[key] = el }"
        />
      </td>

      <td class="table-row-action">
        <button class="icon-button_filled" type="button" @click="addRow">
          <v-icon name="ri-play-list-add-fill" title="Add row" fill="purple" />
        </button>
      </td>

      <td class="table-row-action">
        <button class="icon-button_filled" type="button" @click="clearUserInput">
          <v-icon name="ri-delete-back-2-line" title="Clear inputs" fill="purple" />
        </button>
      </td>
    </tr>

    <tr v-if="userMessage">
      <td :colspan="columnLength" class="table-message">
        <p :class="userMessage.type">{{ userMessage.text }}</p>
        <p v-if="userMessage.type === 'error'">Please <a @click="reloadPage">reload the page</a>.</p>
      </td>
    </tr>

    <tr v-else-if="foundedRows.length === 0">
      <td :colspan="columnLength" class="table-message empty">
        <slot name="emptySearch"><p>Nothing was found. Try changing the search criteria.</p></slot>
      </td>
    </tr>

    <TableRow
      v-model:readyForRemovalRows="readyForRemovalRows"
      v-for="row in foundedRows"
      :key="row.id"
      :column-config="columnConfig"
      :row-data="row"
      @edit-row="$emit('edit-row', row)"
    >
    </TableRow>
    </tbody>
  </table>
</template>

<script setup>
import TableRow from './TableRow.vue'
import { computed, ref } from 'vue'
import { filterBySearchString, reloadPage } from '../../../utils/index.js'
import AppTextarea from '../AppTextarea.vue'
import { useFormValidation } from '../../../composables/index.js'

const model = defineModel({ required: true })

const props = defineProps({
  tableData: Array,
  columnConfig: Array,
  searchCriteria: String,
  userMessage: Object
})

const emit = defineEmits(['add-row', 'edit-row', 'remove-rows', 'open-add-row-modal'])

const columnLength = computed(() => props.columnConfig.length)

const searchRow = ref('')
const foundedRows = computed(() => {
  return filterBySearchString(props.tableData, props.searchCriteria, searchRow.value)
})
const openAddRowModal = () => {
  emit('open-add-row-modal', searchRow.value)
}

const readyForRemovalRows = ref([])
const removeSelectedRows = () => {
  emit('remove-rows', readyForRemovalRows.value)
  clearRemovalRowsList()
}
const clearRemovalRowsList = () => {
  readyForRemovalRows.value = []
}

const clearUserInput = () => {
  for (const key in model.value) {
    model.value[key] = ''
  }
}
const inputRefs = ref({})
const { validateForm, hasFormError } = useFormValidation(inputRefs)
const addRow = () => {
  validateForm()
  if (hasFormError.value) return
  clearUserInput()
  emit('add-row')
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

.table-message .fetching {
  color: purple;
}

.table-message .empty {
  color: blue;
}

.table-message .error {
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
