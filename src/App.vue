<template>
  <div class="page-layout">
    <CategoryList @selectCategoryId="selectCategory" />
    <WordList :selected-category-id="selectedCategoryId"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryList from './components/CategoryList.vue'
import WordList from './components/WordList.vue'

const selectedCategoryId = ref(null)
const selectCategory = (id) => {
  selectedCategoryId.value = id
}
</script>

<style scoped>
.page-layout {
  display: flex;
  height: 100%;
}
</style>

