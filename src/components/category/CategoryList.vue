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
        :disabled="!isFoundedCategoriesEmpty"
        @click="addCategory"
      >
        Add
      </button>
    </div>

    <div
      v-if="categoryStore.hasError || categoryStore.isEmpty"
      class="bg-violet-100 p-8 rounded-sm border-2 border-violet-300"
    >
      <template v-if="categoryStore.hasError">
        <p>Something went wrong.</p>
        <p>Please <a @click="reloadPage">reload the page</a>.</p>
      </template>

      <template v-if="categoryStore.isEmpty">
        <p>Category`s list is empty.</p>
        <p>Add the first category</p>
      </template>
    </div>

    <CategoryItem
      v-else
      :categories="foundedCategories"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryItem from './CategoryItem.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/index.js'
import { reloadPage } from '@/utils/index.js'
import { useFilterBySearch } from '@/composables/index.js'

const categoryStore = useCategoryStore()

const {
  searchString: searchCategory,
  filteredData: foundedCategories,
  clearSearch,
  isFilteredDataEmpty: isFoundedCategoriesEmpty
} = useFilterBySearch(categoryStore, 'name')

const addCategory = async () => {
  if (!searchCategory.value) return
  await categoryStore.createCategory(searchCategory.value)
  clearSearch()
}

onMounted(async () => {
  await categoryStore.fetchData()
  categoryStore.selectFirstCategoryAsDefault()
})
</script>
