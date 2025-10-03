<template>
  <div class="bg-gray-100 p-4 shadow-xl/20">
    <div class="flex justify-between gap-1 py-2">
      <input
        v-model="searchCategory"
        class="app-input"
        type="text"
        placeholder="Find or add category"
        name="add-category"
      >
      <button
        type="button"
        class="app-button app-button__bordered"
        @click="addCategoryHandler"
      >
        Add
      </button>
    </div>

    <AppMessage
      v-if="fetchMessage"
      :message="fetchMessage"
      class="w-64"
    />

    <CategoryItem
      v-else
      :categories="foundedCategories"
      @delete-category="deleteCategoryHandler"
      @update-category="updateCategoryHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { AppMessage } from '@/components/common'
import CategoryItem from './CategoryItem.vue'
import { useCategoryStore } from '@/stores/index.js'
import { useCategoryFetch } from '@/composables'
import { create, update, remove } from '@/api/category.ts'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

const {
  searchString: searchCategory,
  filteredData: foundedCategories,
  fetchMessage,
  fetchCategories,
  clearSearch
} = useCategoryFetch()

const addCategoryHandler = async () => {
  if (!searchCategory.value) return
  const category = await create(searchCategory.value)
  await fetchCategories()
  categoryStore.selectCategory(category)
  clearSearch()
}

const updateCategoryHandler = async (category) => {
  await update(category)
  categoryStore.selectCategory(category)
  await fetchCategories()
}

const deleteCategoryHandler = async () => {
  await remove(categoryStore.selectedCategoryId)
  await fetchCategories()
  categoryStore.selectCategory(foundedCategories.value[0])
}

onMounted(async () => {
  await fetchCategories()
  categoryStore.selectCategory(foundedCategories.value[0])
})
</script>
