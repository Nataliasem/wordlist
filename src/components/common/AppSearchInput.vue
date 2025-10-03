<script setup lang="ts">
const model = defineModel<string>()
const { showClear = false, placeholder = 'Type something here' } =  defineProps<{
  showClear?: boolean
  placeholder?: string
}>()
defineEmits<{ confirm: [] }>()

const clearSearch = () => {
  model.value = ''
}
</script>

<template>
  <input
    id="app-search-input"
    v-model="model"
    type="text"
    class="app-input p-1 h-10"
    :placeholder="placeholder"
  >
  <button
    id="add-word-button"
    class="app-button app-button__bordered"
    type="button"
    @click="$emit('confirm')"
  >
    <slot name="confirm">
      <v-icon
        name="ri-play-list-add-fill"
        :scale="1.3"
        title="Add new"
        fill="purple"
      />
    </slot>
  </button>

  <button
    v-if="showClear"
    class="app-button app-button__bordered"
    type="button"
    @click="clearSearch"
  >
    <slot name="clear">
      <v-icon
        name="ri-delete-back-2-line"
        :scale="1.3"
        title="Clear input"
        fill="purple"
      />
    </slot>
  </button>
</template>
