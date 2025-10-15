import { ref } from 'vue'
import type { Ref } from 'vue'

export function useTableRows(tableDataIds: Ref<number[] | string[]>) {
  const selectedRows: Ref<number[] | string[]> = ref([])
  const allSelected: Ref<boolean> = ref(false)
  const clearSelectedRowsList = () => {
    selectedRows.value = []
    allSelected.value = false
  }
  const selectAllRows = (): void => {
    selectedRows.value = allSelected.value ? tableDataIds.value : []
  }

  return {
    selectedRows,
    allSelected,
    clearSelectedRowsList,
    selectAllRows
  }
}
