<template>
  <div class="page-layout">
    <CategoryList />
    <WordList />
  </div>
</template>

<script setup>
import CategoryList from './components/CategoryList.vue'
import WordList from './components/WordList.vue'
</script>

<style scoped>
.page-layout {
  display: flex;
  height: 100%;
}
</style>

