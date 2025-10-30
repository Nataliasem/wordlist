<script setup lang="ts">
import { ref } from 'vue'
import AppSearchInput from '@/components/common/AppSearchInput.vue'
import CategoryItem from './CategoryItem.vue'
import { useCategoryFetch } from '@/composables'
import { MessageType } from '@/constants'
import { reloadPage } from '@/utils'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const isExpanded = ref(true)
const TABLET_SCREEN_SIZE = 1024
if(width.value < TABLET_SCREEN_SIZE) {
  isExpanded.value = false
}

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
  <div
    class="h-full bg-gray-100 p-4 shadow-xl/20 lg:static"
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
    </template>
  </div>
</template>
