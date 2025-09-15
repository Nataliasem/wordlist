<template>
  <input
    id="app-search__input"
    v-model="searchString"
    type="text"
    class="app-search__input"
    placeholder="Enter a word here..."
  >
  <button
    class="icon-button_filled app-search__button"
    type="button"
    @click="$emit('confirm-search', searchString)"
  >
    <v-icon
      name="ri-play-list-add-fill"
      :scale="1.3"
      title="Add new"
      fill="purple"
    />
  </button>

  <button
    class="icon-button_filled app-search__button"
    type="button"
    @click="clearSearch"
  >
    <v-icon
      name="ri-delete-back-2-line"
      :scale="1.3"
      title="Clear input"
      fill="purple"
    />
  </button>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useSearch } from '@/composables/index.js'
import { filterBySearchString } from '@/utils/index.js'

const model = defineModel({
  type: Array,
  required: true
})

defineEmits(['confirm-search'])

const searchString = ref('')
const filteredData = computed(() => {
  return filterBySearchString(data, searchByField, searchString.value)
})
const isFilteredDataEmpty = computed(() => {
  return filteredData.value.length === 0
})
const clearSearch = () => {
  searchString.value = ''
}


watch(searchString, () => {
  model.value = filteredData.value
})
</script>

<style scoped>
.app-search__input {
  padding: 9px;
  min-width: 300px;
  margin-right: 8px;
  border: 2px solid lavender;
  border-radius: 4px;
  outline: none;
}

.app-search__input:focus {
  border-color: purple;
}

.app-search__button  {
  border: 2px solid lavender;
  padding: 4px 8px;
  outline: none;
}

.app-search__button:focus {
  border-color: purple;
}
</style>
