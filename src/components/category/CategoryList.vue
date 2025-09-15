<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <AppSearch
        v-model="filteredCategories"
        :list="categoryStore.data"
        search-by-field="name"
        placeholder="Find or add category"
        @confirm-search="addCategory"
      >
        <!-- TODO: icon instead of text-->
        <!-- TODO: disabled="isAddingCategoryDisabled"-->
        <template #confirm-button>
          Add
        </template>
      </AppSearch>
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
      :categories="filteredCategories"
    />
  </div>
</template>

<script setup>
import { AppSearch } from '@/components/common'
import CategoryItem from './CategoryItem.vue'
// import { ref, onMounted, computed } from 'vue'
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/index.js'
import { reloadPage } from '@/utils/index.js'


const categoryStore = useCategoryStore()

const addCategory = async (category) => {
  if (!category) return
  await categoryStore.createCategory(category)
}

const filteredCategories = ref([])
// const isAddingCategoryDisabled = computed(() => {
//   return filteredCategories.value.length > 0
// })
onMounted(async () => {
  await categoryStore.fetchData()
  filteredCategories.value = categoryStore.data
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

.fetching-message {
  background-color: lavender;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #e7e6e9;
}
</style>
