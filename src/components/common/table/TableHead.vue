<script setup lang="ts">
const hiddenColumns = defineModel<Set<string>>('hiddenColumns')
const sortedBy = defineModel<{
  sortColumn: string
  sortDirection: string
}>('sortedBy')

const allSelected = defineModel<boolean>('all-selected', {default: false})

defineProps<{
  columnConfig: {
    key: string
    title: string
    required: boolean
    sortable: boolean
  }[]
}>()

defineEmits(['select-all'])

const toggleColumnVisibility = (columnKey: string) => {
  if( hiddenColumns.value.has(columnKey)) {
    hiddenColumns.value.delete(columnKey)
  } else {
    hiddenColumns.value.add(columnKey)
  }
}

const sortByColumn = (column: string) => {
  sortedBy.value.sortColumn = column
  sortedBy.value.sortDirection = sortedBy.value.sortDirection === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <thead>
    <tr>
      <th class="w-8 text-center p-1">
        <input
          id="select-all"
          v-model="allSelected"
          type="checkbox"
          title="Select all rows"
          class="accent-white w-4 h-4"
          @change="$emit('select-all')"
        >
      </th>

      <th
        v-for="item in columnConfig"
        :key="item.key"
        class="p-1"
      >
        <span :class="{'required-field-title': item.required}">{{ item.title }}</span>

        <span class="p-2">
          <button
            v-if="hiddenColumns.has(item.key)"
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

          <span
            v-if="item.sortable"
            class="sort-icon__wrapper"
          >
            <button
              v-if="sortedBy.sortDirection === 'asc'"
              type="button"
              @click="sortByColumn(item.key)"
            >
              <v-icon
                name="ri-sort-asc"
                title="Sort ascending"
                fill="orange"
              />
            </button>

            <button
              v-else
              type="button"
              @click="sortByColumn(item.key)"
            >
              <v-icon
                name="ri-sort-desc"
                title="Sort descending"
                fill="mediumpurple"
              />
            </button>
          </span>
        </span>
      </th>
    </tr>
  </thead>
</template>
