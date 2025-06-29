<template>
  <div class="page-layout">
    <CategoryList @selectCategory="selectCategory" />
    <WordList :selected-category="selectedCategory" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryList from './components/CategoryList.vue'
import WordList from './components/WordList.vue'

const selectedCategory = ref(null)
const selectCategory = (category) => {
  selectedCategory.value = category
}
</script>

<style scoped>
.page-layout {
  display: flex;
  height: 100%;
}
</style>

