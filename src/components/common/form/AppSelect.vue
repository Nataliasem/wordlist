<template>
  <div class="app-form__field">
    <label
      v-if="label"
      :for="id"
      class="form-field__label"
    >
      {{ label }}:
    </label>
    <select
      :id="id"
      v-model="model"
      :name="name"
      class="app-select"
    >
      <option
        v-for="item in options"
        :key="item[valueProp]"
        :value="item[valueProp]"
        :selected="item[valueProp] === model"
      >
        {{ item[nameProp] }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts" generic="T">
const model = defineModel<string | number | null>()

interface Props {
  id: string
  name: string
  options: T[]
  valueProp?: string
  nameProp?: string
  label?: string
}

const { valueProp = 'id', nameProp = 'name', label = ''} = defineProps<Props>()
</script>

<style scoped>
.app-select {
  min-height: 32px;
}
</style>
