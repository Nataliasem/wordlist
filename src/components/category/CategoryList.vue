<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <input
        v-model="searchCategory"
        class="category-input"
        type="text"
        placeholder="Find or add category"
        name="add-category"
      >
      <button
        class="app-button"
        :disabled="!isFoundedCategoriesEmpty"
        @click="addCategory"
      >
        Add
      </button>
    </div>

    <div
      v-if="categoryStore.hasError"
      class="fetching-message"
    >
      <p>Something went wrong.</p>
      <p>Please <a @click="reloadPage">reload the page</a>.</p>
    </div>
    <div
      v-else-if="categoryStore.isEmpty"
      class="fetching-message"
    >
      <p>Category`s list is empty.</p>
      <p>Add the first category</p>
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

const { searchString: searchCategory, filteredData: foundedCategories, clearSearch, isFilteredDataEmpty: isFoundedCategoriesEmpty } = useFilterBySearch(categoryStore, 'name')

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

<style>
.category-list {
  width: 256px;
  background-color: #f1f0f2;
  padding: 16px;
  -webkit-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}

.add-category__wrapper {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 0;
}

.category-input {
  flex-grow: 1;
  border: 2px solid #e7e6e9;
  border-radius: 4px;
  padding: 2px 4px;
  cursor: pointer;
}

.add-category__wrapper .category-input:hover {
  background-color: lavender;
}

.fetching-message {
  background-color: lavender;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #e7e6e9;
}
</style>
