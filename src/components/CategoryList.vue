<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <input v-model="category" class="add-category__input" type="text" placeholder="New category">
      <button class="add-category__button" @click="addCategory">Add</button>
    </div>

    <div class="divider" />

    <div class="category-list__wrapper">
      <template v-for="item in categories" :key="item.id">
        <CategoryItem
          :category="item"
          :selected-category-id="selectedCategory.id"
          @select-category="selectCategory"
          @update-categories="updateCategories"
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
import { onMounted, ref } from 'vue'
import { getCategories, createCategory } from '../api/category.js'
import CategoryItem from './CategoryItem.vue'

const emit = defineEmits(['selectCategory'])

const selectedCategory = ref(null)
const selectCategory = (category) => {
  selectedCategory.value = category
  emit('selectCategory', category)
}

const categories = ref([])
const updateCategories = async () => {
  categories.value = await getCategories()
}

const category = ref('')
const addCategory = async () => {
  if(!category.value) return
  await createCategory(category.value)
  await updateCategories()
}

onMounted(() => {
  updateCategories()
})
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

.add-category__input {
  flex-grow: 1;
  border: 2px solid #e7e6e9;
  border-radius: 4px;
  font-size: 1em;
}

.add-category__button {
  margin-left: 8px;
  border-radius: 4px;
  border: 2px solid #e7e6e9;
}


.divider {
  height: 2px;
  width: 100%;
  background-color: #e7e6e9;
  margin: 8px 0;
  border-radius: 1px;
}
</style>
