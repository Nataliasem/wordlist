<script setup lang="ts">
import AppSelect from '@/components/common/AppSelect.vue'
import { onMounted, watch } from 'vue'
import { useCategoryFetch } from '@/composables'
import { useCategoryStore } from '@/stores'
import { SelectOption, Category } from '@/types'

type ExtendedOption = SelectOption & Category

const model = defineModel<number | null>()

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
    :options="categories as ExtendedOption[]"
  />
</template>
