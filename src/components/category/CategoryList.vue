<script setup lang="ts">
import AppSearchInput from '@/components/common/AppSearchInput.vue'
import CategoryItem from './CategoryItem.vue'
import { useCategoryFetch, useExpanded } from '@/composables'
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

const { isExpanded } = useExpanded()
</script>

<template>
  <div
    class="h-full border-r border-gray-200"
    :class="isExpanded ? 'w-(--sidebar-expanded)' : 'w-(--sidebar-compressed)'"
  >
    <div class="h-16 border-b border-gray-200 flex items-center pl-4">
      <button
        class="app-button app-button__bordered"
        type="button"
        @click="isExpanded = !isExpanded"
      >
        <v-icon
          :name="isExpanded ? 'ri-arrow-left-line' : 'ri-arrow-right-line'"
          :scale="1.3"
          title="toggle category list"
          fill="purple"
        />
      </button>
    </div>

    <div
      v-if="isExpanded"
      class="h-full bg-gray-100 p-4"
    >
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
  </div>
</template>
