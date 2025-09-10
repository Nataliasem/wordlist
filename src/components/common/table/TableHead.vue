<template>
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
</template>

<script setup>
const hiddenColumns = defineModel('hiddenColumns', {
  type: Object,
  default: () => {}
})

defineProps({
  columnConfig: {
    type: Array,
    required: true
  }
})

const toggleColumnVisibility = (columnKey) => {
  hiddenColumns.value[columnKey]
    ? delete hiddenColumns.value[columnKey]
    : hiddenColumns.value[columnKey] = true
}
</script>


<style scoped>

</style>
