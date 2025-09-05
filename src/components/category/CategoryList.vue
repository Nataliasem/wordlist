<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <input
        v-model="category"
        class="category-input"
        type="text"
        placeholder="Find or add category"
        name="add-category"
      >
      <button class="icon-button_filled" :disabled="!emptyCategories" @click="addCategory">Add</button>
    </div>

    <div v-if="categoryStore.hasError" class="fetching-message">
      <p>Something went wrong.</p>
      <p>Please <a @click="reloadPage">reload the page</a>.</p>
    </div>
    <div v-else-if="categoryStore.isEmpty" class="fetching-message">
      <p>Category`s list is empty.</p>
      <p>Add the first category</p>
    </div>

    <CategoryItem v-else :categories="filteredCategories" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import CategoryItem from './CategoryItem.vue'
import { useCategoryStore } from '@/stores/index.js'
import { reloadPage, filterBySearchString } from '@/utils/index.js'

const categoryStore = useCategoryStore()

const category = ref('')
const filteredCategories = computed(() => {
  return filterBySearchString(categoryStore.categories, 'name', category.value)
})
const emptyCategories = computed(() => {
  return filteredCategories.value.length === 0
})
const addCategory = async () => {
  if (!category.value) return
  await categoryStore.createCategory(category.value)
  category.value = ''
}

onMounted(async () => {
  await categoryStore.fetchCategories()
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

.fetching-message {
  background-color: lavender;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #e7e6e9;
}
</style>
