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

<script setup>
import TableHead from './TableHead.vue'
import TableRow from './TableRow.vue'
import { computed, ref } from 'vue'
import { reloadPage } from '@/utils/index.js'

const props = defineProps({
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

defineEmits([ 'click-row', 'select-rows' ])

const columnLength = computed(() => props.columnConfig.length + 1)

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
