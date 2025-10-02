import { ref } from 'vue'

export function useTableRows(tableDataIds) {
  const selectedRows = ref([])
  const allSelected = ref(false)
  const clearSelectedRowsList = () => {
    selectedRows.value = []
    allSelected.value = false
  }
  const selectAllRows = () => {
    selectedRows.value = allSelected.value ? tableDataIds.value : []
  }

  return {
    selectedRows,
    allSelected,
    clearSelectedRowsList,
    selectAllRows
  }
}
