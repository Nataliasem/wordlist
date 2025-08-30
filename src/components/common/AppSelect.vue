<template>
  <label v-if="label" :for="id" class="form-field__label">{{ label }}: </label>
  <select v-model="model" :name="name" :id="id" class="app-select">
    <option
      v-for="item in options"
      :key="item[valueProp]"
      :value="item[valueProp]"
      :selected="item[valueProp] === model"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<script setup>
const model = defineModel({ required: true })

defineProps({
  id: String,
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  valueProp: {
    type: String,
    default: 'id'
  },
  nameProp: {
    type: String,
    default: 'name'
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.app-select {
  min-height: 32px;
}
</style>
