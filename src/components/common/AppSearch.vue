<template>
  <input
    id="app-search__input"
    v-model="searchString"
    type="text"
    class="app-search__input"
    :placeholder="placeholder"
  >
  <button
    class="icon-button_filled app-search__button"
    type="button"
    @click="confirmSearch"
  >
    <slot name="confirm-button">
      <v-icon
        name="ri-play-list-add-fill"
        :scale="1.3"
        title="Add new"
        fill="purple"
      />
    </slot>
  </button>

  <button
    class="icon-button_filled app-search__button"
    type="button"
    @click="clearSearch"
  >
    <slot name="clear-button">
      <v-icon
        name="ri-delete-back-2-line"
        :scale="1.3"
        title="Clear input"
        fill="purple"
      />
    </slot>
  </button>
</template>

<script setup>
import { ref, watch } from 'vue'
import { filterBySearchString } from '@/utils/index.js'

const model = defineModel({
  type: Array,
  required: true
})

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  searchByField: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Enter to search smth...'
  }
})

const emit = defineEmits(['confirm-search'])

const searchString = ref('')
const clearSearch = () => {
  searchString.value = ''
}
const confirmSearch = () => {
  emit('confirm-search', searchString.value)
  clearSearch()
}
watch(searchString, () => {
  model.value = filterBySearchString(props.list, props.searchByField, searchString.value)
})
</script>

<style scoped>
.app-search__input {
  padding: 9px;
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
