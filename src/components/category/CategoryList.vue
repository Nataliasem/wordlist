<script setup lang="ts">
import { AppMessage, AppSearchInput } from '@/components/common'
import CategoryItem from './CategoryItem.vue'
import { useCategoryStore } from '@/stores'
import { useCategoryFetch } from '@/composables'
import { create, update, remove } from '@/api/category'
import { onMounted, ref } from 'vue'
import { Category } from '@/types'

const categoryStore = useCategoryStore()

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
  categoryStore.selectCategory(category)
  clearSearch()
}

const updateCategoryHandler = async (category: Category) => {
  await update(category)
  categoryStore.selectCategory(category)
  await fetchCategories()
}

const deleteCategoryHandler = async () => {
  await remove(categoryStore.selectedCategoryId as number)
  await fetchCategories()
  categoryStore.selectCategory(foundedCategories.value[0])
}

onMounted(async () => {
  await fetchCategories()
  categoryStore.selectCategory(foundedCategories.value[0])
})

const isExpanded = ref(false)
</script>

<template>
  <div
    class="h-full bg-gray-100 p-4 shadow-xl/20"
    :class="{'fixed': isExpanded}"
  >
    <button
      class="app-button app-button__bordered"
      type="button"
      @click="isExpanded = !isExpanded"
    >
      <v-icon
        :name="isExpanded ? 'ri-arrow-left-line' : 'ri-arrow-right-line'"
        :scale="1.3"
        title="expand category list"
        fill="purple"
      />
    </button>

    <template v-if="isExpanded">
      <div class="flex justify-between gap-1 py-4">
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
    </template>
  </div>
</template>
