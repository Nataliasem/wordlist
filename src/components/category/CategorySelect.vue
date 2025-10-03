<script setup lang="ts">
import { AppSelect } from '@/components/common'
import { onMounted, watch } from 'vue'
import { useCategoryFetch } from '@/composables'
import type { Category } from '@/types/category'
import { useCategoryStore } from '@/stores/index.js'

const model = defineModel<Category>()

const { useLabel = false } = defineProps<{
  useLabel?: boolean
}>()

const { categories, fetchCategories } = useCategoryFetch()
onMounted(() => {
  fetchCategories()
})

const categoryStore = useCategoryStore()
watch(() => categoryStore.selectedCategory, () => {
  fetchCategories()
})
</script>

<template>
  <AppSelect
    id="select-category"
    v-model="model"
    name="select-category"
    :label="useLabel ? 'category' : ''"
    :options="categories"
  />
</template>
