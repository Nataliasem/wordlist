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
</template>

<script setup>
const hiddenColumns = defineModel('hiddenColumns', {
  type: Object,
  default: () => {}
})

const allSelected = defineModel('all-selected', {
  type: Object,
  default: () => {}
})

defineProps({
  columnConfig: {
    type: Array,
    required: true
  }
})

defineEmits(['select-all'])

const toggleColumnVisibility = (columnKey) => {
  hiddenColumns.value[columnKey]
    ? delete hiddenColumns.value[columnKey]
    : hiddenColumns.value[columnKey] = true
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
