<template>
  <select v-model="model" :name="selectName" :id="selectName" class="app-select">
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
  selectName: {
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
  }
})
</script>

<style scoped>
.app-select {
  min-height: 32px;
}
</style>
