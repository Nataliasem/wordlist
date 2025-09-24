<template>
  <vue-awesome-paginate
    v-model="model"
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :max-pages-shown="maxPagesShown"
  />
</template>

<script setup lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

const model = defineModel<number>()

interface Props {
  totalItems: number
  itemsPerPage?: number
  maxPagesShown?: number
}
const { itemsPerPage = 10, maxPagesShown = 5} = defineProps<Props>()
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 8px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  border: 2px solid lavender;
  color: black;
}

.paginate-buttons:hover {
  background-color: lavender;
  border-color: mediumpurple;
}

.active-page {
  background-color: mediumpurple;
  color: white;
}

.active-page:hover {
  background-color: purple;
}
</style>
