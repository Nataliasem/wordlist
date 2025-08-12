<template>
  <div class="page-layout">
    <CategoryList
      :categories="categories"
      :selected-category="selectedCategory"
      @select-category="selectCategory"
      @update-categories="updateCategories"
    />
    <WordList :categories="categories" :selected-category="selectedCategory" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CategoryList from './components/CategoryList.vue'
import WordList from './components/WordList.vue'
import { getCategories } from './api/category.js'

const selectedCategory = ref(null)
const selectCategory = (category) => {
  selectedCategory.value = category
}

const categories = ref([])
const updateCategories = async () => {
  categories.value = await getCategories()
}
onMounted(async () => {
  await updateCategories()
  if(categories.value.length > 0){
    selectCategory(categories.value[0])
  }
})
</script>

<style scoped>
.page-layout {
  display: flex;
  height: 100%;
}
</style>

