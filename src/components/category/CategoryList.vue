<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppSearchInput from '@/components/common/AppSearchInput.vue'
import CategoryItem from './CategoryItem.vue'
import { useCategoryFetch, useSelectedCategory } from '@/composables'
import { create, update, remove } from '@/api/category'
import { Category } from '@/types'
import { MessageType } from '@/constants'
import { reloadPage } from '@/utils'

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

      <p
        v-if="fetchMessage"
        class="w-64 app-message"
      >
        <span>{{ fetchMessage.text }}</span>
        <span v-if="fetchMessage.type === MessageType.Error">
          Please <a @click="reloadPage">reload the page</a>.
        </span>
      </p>

      <CategoryItem
        v-else
        :categories="foundedCategories"
        @delete-category="deleteCategoryHandler"
        @update-category="updateCategoryHandler"
      />
    </template>
  </div>
</template>
