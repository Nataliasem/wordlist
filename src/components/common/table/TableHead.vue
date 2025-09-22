<template>
  <thead>
    <tr>
      <th class="required-column-header">
        <input
          id="select-all"
          v-model="allSelected"
          type="checkbox"
          title="Select all rows"
          @change="$emit('select-all')"
        >
      </th>

      <th
        v-for="item in columnConfig"
        :key="item.key"
      >
        <span :class="{'required-field': item.required}">{{ item.title }}</span>

        <span class="display-icon__wrapper">
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
        </span>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
const hiddenColumns = defineModel<Set<string>>('hiddenColumns')

const allSelected = defineModel<boolean>('all-selected', {default: false})

defineProps<{
  columnConfig: Array<{
    key: string
    title: string
    required: boolean
  }>
}>()

defineEmits(['select-all'])

const toggleColumnVisibility = (columnKey: string) => {
  hiddenColumns.value.has(columnKey)
    ? hiddenColumns.value.delete(columnKey)
    : hiddenColumns.value.add(columnKey)
}
</script>

<style scoped>
.display-icon__wrapper {
  padding: 4px;
}

th.required-column-header {
  width: 32px;
  text-align: center;
}
</style>
