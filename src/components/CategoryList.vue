<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <input
        v-model="category"
        class="category-input"
        type="text"
        placeholder="New category"
        name="add-category"
      >
      <button class="icon-button_filled" @click="addCategory">Add</button>
    </div>

    <div class="divider" />

    <div v-if="categoryStore.isFetching" class="fetching-message">Categories are fetching...</div>
    <div v-else-if="categoryStore.isEmpty" class="fetching-message">
      <p>Something went wrong.</p>
      <p>Please <a @click="reloadPage">reload the page</a>.</p>
    </div>

    <CategoryItem v-else />

    <div class="divider" />
    <div
      class="category-name"
      :class="{ 'category-name__selected' : !categoryStore.selectedCategory }"
      @click="selectCategory(null)"
    >
      no category
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CategoryItem from './CategoryItem.vue'
import { useCategoryStore } from '../stores/category.js'
import { reloadPage } from '../utils/index.js'

const categoryStore = useCategoryStore()
const selectCategory = (category) => {
  categoryStore.selectCategory(category)
}

const category = ref('')
const addCategory = async () => {
  if (!category.value) return
  await categoryStore.createCategory(category.value)
  category.value = ''
}

onMounted(async () => {
  await categoryStore.fetchCategories()
  if (categoryStore.categories.length > 1) {
    selectCategory(categoryStore.categories[0])
  }
})
</script>

<style>
.category-list {
  background-color: #f1f0f2;
  padding: 16px;
  -webkit-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}

.category-name {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-weight: bold;
  border: 2px solid transparent;
  width: 220px;
}

.category-name:hover {
  background-color: #e7e6e9;
}

.category-name__selected {
  background-color: lavender;
  border-radius: 4px;
  border: 2px solid purple;
}

.add-category__wrapper {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 0;
}

.add-category__wrapper .icon-button_filled {
  border: 2px solid #e7e6e9;
}

.category-input {
  flex-grow: 1;
  border: 2px solid #e7e6e9;
  border-radius: 4px;
  font-size: 16px;
  padding: 2px 4px;
  cursor: pointer;
}

.add-category__wrapper .category-input:hover {
  background-color: lavender;
}

.divider {
  height: 2px;
  min-width: 100%;
  background-color: #e7e6e9;
  margin: 8px 0;
  border-radius: 1px;
}

.fetching-message {
  background-color: lavender;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #e7e6e9;
}
</style>
