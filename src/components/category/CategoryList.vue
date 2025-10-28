<script setup lang="ts">
import { AppMessage, AppSearchInput } from '@/components/common'
import CategoryItem from './CategoryItem.vue'
import { useCategoryFetch, useSelectedCategory } from '@/composables'
import { create, update, remove } from '@/api/category'
import { onMounted } from 'vue'
import { Category } from '@/types'

const { selectCategory, selectedCategoryId } = useSelectedCategory()

const {
  searchString: searchCategory,
  filteredData: foundedCategories,
  fetchMessage,
  fetchCategories,
  clearSearch
} = useCategoryFetch()

const addCategoryHandler = async () => {
  if (!searchCategory.value) return
  const category = await create(searchCategory.value)
  await fetchCategories()
  selectCategory(category)
  clearSearch()
}

const updateCategoryHandler = async (category: Category) => {
  await update(category)
  selectCategory(category)
  await fetchCategories()
}

const deleteCategoryHandler = async () => {
  await remove(selectedCategoryId.value as number)
  await fetchCategories()
  selectCategory(foundedCategories.value[0])
}

onMounted(async () => {
  await fetchCategories()
  selectCategory(foundedCategories.value[0])
})
</script>

<template>
  <div class="bg-gray-100 p-4 shadow-xl/20">
    <div class="flex justify-between gap-1 py-2">
      <AppSearchInput
        id="category-search"
        v-model="searchCategory"
        placeholder="Find or add category"
        @confirm="addCategoryHandler"
      >
        <template #confirm>
          Add
        </template>
      </AppSearchInput>
    </div>

    <AppMessage
      v-if="fetchMessage"
      :message="fetchMessage"
      class="w-64"
    />

    <CategoryItem
      v-else
      :categories="foundedCategories"
      @delete-category="deleteCategoryHandler"
      @update-category="updateCategoryHandler"
    />
  </div>
</template>
