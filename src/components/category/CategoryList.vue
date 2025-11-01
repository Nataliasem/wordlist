<script setup lang="ts">
import AppSearchInput from '@/components/common/AppSearchInput.vue'
import CategoryItem from './CategoryItem.vue'
import { useCategoryFetch } from '@/composables'
import { MessageType } from '@/constants'
import { reloadPage } from '@/utils'

const {
  searchString,
  categories,
  fetchMessage,
  createCategory,
  updateCategory,
  removeCategory
} = useCategoryFetch()
</script>

<template>
  <div class="h-full bg-gray-100 p-4 border-r border-gray-200 fixed lg:static">
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
      :categories="categories"
      @delete-category="removeCategory"
      @update-category="updateCategory"
    />
  </div>
</template>
