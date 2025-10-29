import { ref } from 'vue'
import type { Ref } from 'vue'

export function useTableRows(tableDataIds: Ref<number[] | string[]>) {
  const selectedRows: Ref<Set<number | string>> = ref(new Set())
  const allSelected: Ref<boolean> = ref(false)
  const clearSelectedRowsList = () => {
    selectedRows.value.clear()
    allSelected.value = false
  }
  const selectAllRows = (): void => {
    selectedRows.value = allSelected.value ? new Set([...tableDataIds.value]) : new Set()
  }

  return {
    selectedRows,
    allSelected,
    clearSelectedRowsList,
    selectAllRows
  }
}
