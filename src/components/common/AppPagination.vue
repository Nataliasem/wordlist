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
@reference "tailwindcss";

.pagination-container {
  @apply flex gap-2;
}

.paginate-buttons {
  @apply cursor-pointer;
  @apply border-2 border-transparent rounded-sm;
  @apply outline-none;
  @apply border-violet-200 h-10 w-10 hover:bg-violet-100 focus:bg-violet-300 focus:text-white focus:border-violet-300;
  @apply transition-all duration-300 ease-in;
}

.active-page {
  @apply bg-amber-500 border-amber-500 text-white;
}

.active-page:hover {
  @apply bg-amber-500 border-amber-500;
}
</style>
