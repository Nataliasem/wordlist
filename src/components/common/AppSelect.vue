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

<template>
  <div class="flex flex-col gap-4">
    <label
      v-if="label"
      :for="id"
    >
      {{ label }}:
    </label>
    <select
      :id="id"
      v-model="model"
      :name="name"
      class="app-input py-2"
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
