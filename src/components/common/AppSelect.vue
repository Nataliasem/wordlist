<script setup lang="ts" generic="T">
import { SelectOption } from '@/types'

const model = defineModel<string | number | null>()

interface Props {
  id: string
  name: string
  options: SelectOption[]
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
        :key="String(item[valueProp])"
        :value="item[valueProp]"
        :selected="item[valueProp] === model"
      >
        {{ item[nameProp] }}
      </option>
    </select>
  </div>
</template>
