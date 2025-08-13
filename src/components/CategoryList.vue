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
      <button class="add-category__button" @click="addCategory">Add</button>
    </div>

    <div class="divider" />

    <div class="category-list__wrapper">
      <template v-for="item in categories" :key="item.id">
        <CategoryItem
          :category="item"
          :selected-category-id="selectedCategory?.id"
          @select-category="selectCategory"
          @update-categories="$emit('update-categories')"
        />
      </template>
    </div>

    <div class="divider" />
    <div
      class="category-name"
      :class="{ 'category-name__selected' : !selectedCategory }"
      @click="selectCategory(null)"
    >
      no category
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createCategory } from '../api/category.js'
import CategoryItem from './CategoryItem.vue'

defineProps({
  categories: Array,
  selectedCategory: Object
})
const emit = defineEmits(['select-category', 'update-categories'])

const selectCategory = (category) => {
  emit('select-category', category)
}

const category = ref('')
const addCategory = async () => {
  if(!category.value) return
  const newCategory = await createCategory(category.value)
  selectCategory(newCategory)
  emit('update-categories')
  category.value = ''
}
</script>

<style>
.category-list {
  position: fixed;
  top: 0;
  height: 100%;
  background-color: #f1f0f2;
  padding: 16px;
  -webkit-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}

.category-list__wrapper {
  overflow-y: scroll;
  height: 75%;
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
  padding: 8px 0;
}

.category-input {
  flex-grow: 1;
  border: 2px solid #e7e6e9;
  border-radius: 4px;
  font-size: 16px;
}

.add-category__button {
  margin-left: 8px;
  border-radius: 4px;
}


.divider {
  height: 2px;
  min-width: 100%;
  background-color: #e7e6e9;
  margin: 8px 0;
  border-radius: 1px;
}
</style>
