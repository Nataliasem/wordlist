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
        class="app-button border-violet-100 hover:bg-violet-100 hover:border-violet-200 focus:border-violet-300"
        @click="addCategoryHandler"
      >
        Add
      </button>
    </div>

    <div
      v-if="fetchMessage"
      class="bg-violet-100 p-8 rounded-sm border-2 border-violet-300 w-64"
    >
      <span :class="fetchMessage.style">
        <span>{{ fetchMessage.text }}</span>
        <span v-if="fetchMessage.type === 'error'">
          Please <a @click="reloadPage">reload the page</a>.
        </span>
      </span>
    </div>

    <CategoryItem
      v-else
      :categories="foundedCategories"
      @delete-category="deleteCategoryHandler"
      @update-category="updateCategoryHandler"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryItem from './CategoryItem.vue'
import { useCategoryStore } from '@/stores/index.js'
import { reloadPage } from '@/utils/index.js'
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
