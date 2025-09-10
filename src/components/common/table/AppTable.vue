<template>
  <div class="table-actions__wrapper">
    <div
      v-if="$slots.search"
      class="table-search__wrapper"
    >
      <slot name="search" />
    </div>

    <div v-if="selectedRows.length">
      <button
        v-if="$slots['selected-rows-title']"
        class="selected-button"
        type="button"
        @click="confirmSelectedRows"
      >
        <slot name="selected-rows-title" />
      </button>

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
    <thead>
      <tr>
        <th class="fixed-width" />
        <th
          v-for="item in columnConfig"
          :key="item.key"
        >
          <span :class="{'required-field': item.required}">{{ item.title }}</span>

          <span class="display-icon__wrapper">
            <button
              v-if="hiddenColumns[item.key]"
              type="button"
              @click="toggleColumnVisibility(item.key)"
            >
              <v-icon
                name="ri-eye-line"
                title="Display column data"
                fill="orange"
              />
            </button>

            <button
              v-else
              type="button"
              @click="toggleColumnVisibility(item.key)"
            >
              <v-icon
                name="ri-eye-off-line"
                title="Hide column data"
                fill="lightgrey"
              />
            </button>
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="userMessage">
        <td
          :colspan="columnLength"
          class="table-message"
        >
          <p :class="userMessage.type">
            {{ userMessage.text }}
          </p>
          <p v-if="userMessage.type === 'error'">
            Please <a @click="reloadPage">reload the page</a>.
          </p>
        </td>
      </tr>

      <TableRow
        v-for="row in tableData"
        :key="row.id"
        v-model:selected-rows="selectedRows"
        :column-config="columnConfig"
        :row-data="row"
        :hidden-columns="hiddenColumns"
        @click-row="$emit('click-row', row)"
      />
    </tbody>
  </table>
</template>

<script setup>
import TableRow from './TableRow.vue'
import { computed, ref } from 'vue'
import { reloadPage } from '@/utils/index.js'

const props = defineProps({
  rowModel: {
    type: Object,
    required: true
  },
  tableData: {
    type: Array,
    required: true
  },
  columnConfig: {
    type: Array,
    required: true
  },
  userMessage: {
    type: [ Object, null ],
    default: null
  }
})

const emit = defineEmits([ 'click-row', 'edit-row', 'select-rows' ])

const columnLength = computed(() => props.columnConfig.length + 1)

const hiddenColumns = ref({})
const toggleColumnVisibility = (columnKey) => {
  hiddenColumns.value[columnKey]
    ? delete hiddenColumns.value[columnKey]
    : hiddenColumns.value[columnKey] = true
}

const selectedRows = ref([])
const confirmSelectedRows = () => {
  emit('select-rows', selectedRows.value)
  clearSelectedRowsList()
}
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

.table-message .fetching {
  color: purple;
}

.table-message .empty {
  color: blue;
}

.table-message .error {
  color: red;
}

.selected-button {
  margin-left: 8px;
  border: 2px solid orange;
  padding: 8px;
}

.selected-button.cancel {
  background-color: orange;
}

.display-icon__wrapper {
  padding: 4px;
}

th.fixed-width {
  width: 32px;
}
</style>
