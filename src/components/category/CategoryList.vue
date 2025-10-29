<script setup lang="ts">
import AppSearchInput from '@/components/common/AppSearchInput.vue'
import CategoryItem from './CategoryItem.vue'
import { useCategoryFetch } from '@/composables'
import { MessageType } from '@/constants'
import { reloadPage } from '@/utils'

const {
  searchString,
  filteredData: foundedCategories,
  fetchMessage,
  createCategory,
  updateCategory,
  removeCategory
} = useCategoryFetch()
</script>

<template>
  <div class="bg-gray-100 p-4 shadow-xl/20">
    <div class="flex justify-between gap-1 py-2">
      <AppSearchInput
        id="category-search"
        v-model="searchString"
        placeholder="Find or add category"
        @confirm="createCategory"
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
      @delete-category="removeCategory"
      @update-category="updateCategory"
    />
  </div>
</template>
