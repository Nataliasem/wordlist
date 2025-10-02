<template>
  <div
    class="category-items__wrapper"
  >
    <AppNavigation
      v-slot="{ item }"
      :items="categories"
      :selected-item-id="categoryStore.selectedCategoryId"
      @click="selectCategory"
      @enter="toggleUpdatingMode"
    >
      <div
        class="category-name"
        :class="{
          'selected' : item.id === categoryStore.selectedCategoryId,
          'divided': item.id === null
        }"
      >
        <div v-if="updatedCategory && updatedCategory.id === item.id">
          <input
            :id="updatedCategory && `updated-category-${updatedCategory.id}`"
            :ref="(el) => updatedCategoryInputRef = el"
            v-model="updatedCategory.name"
            class="category-input"
            type="text"
            name="update-category"
          >
          <button
            class="px-1 cursor-pointer hover:text-purple-800"
            @click.stop="updateCategory"
          >
            <v-icon
              name="ri-checkbox-line"
              title="Update category"
            />
          </button>
        </div>

        <template v-else>
          <p class="overflow-hidden text-ellipsis">
            {{ item.name }}
          </p>

          <div
            v-if="item.id !== null"
            class="category-actions"
          >
            <button
              class="px-1 cursor-pointer hover:text-purple-800"
              @click.stop="toggleUpdatingMode(item)"
            >
              <v-icon
                name="ri-pencil-line"
                title="Edit category"
              />
            </button>
            <button
              class="px-1 cursor-pointer hover:text-purple-800"
              @click.stop="openModal"
            >
              <v-icon
                name="ri-delete-bin-2-line"
                title="Delete category"
              />
            </button>
          </div>
        </template>
      </div>
    </AppNavigation>
  </div>

  <AppModal
    :show="isModalOpen"
    @confirm="deleteCategoryHandler"
    @cancel="closeModal"
  >
    <template #header>
      Want to remove category <em class="">{{ categoryStore.selectedCategory.name }}</em>?
    </template>

    <template #content>
      <p>All words in this category will be moved to <b>No category</b> tab.</p>
    </template>

    <template #confirm-text>
      Confirm removal
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { AppNavigation, AppModal } from '@/components/common'
import { ref } from 'vue'
import { useCategoryService } from '@/composables'
import { useCategoryStore } from '@/stores/index.js'
import { useModal } from '@/composables/index.js'
import { Category } from '@/types/category.ts'

defineProps<{
  categories: Category[]
}>()

const categoryStore = useCategoryStore()

const { isModalOpen, closeModal, openModal } = useModal()

const updatedCategoryInputRef = ref(null)
const {
  updatedCategory,
  updateCategory,
  selectCategory,
  toggleUpdatingMode,
  deleteCategory
} = useCategoryService(updatedCategoryInputRef)

const deleteCategoryHandler = async () => {
  await deleteCategory()
  closeModal()
}
</script>

<style>
@reference "tailwindcss";

.category-items__wrapper {
  @apply pt-8 pr-4 w-2xs;
  @apply overflow-y-scroll h-9/10;
  @apply fixed top-16;
}

.category-name {
  @apply cursor-pointer flex justify-between items-center py-2 px-4 border-2 border-transparent rounded-sm;
  @apply hover:bg-gray-200;
}

.category-name.selected {
  @apply font-bold bg-violet-100 border-purple-800;
}

.category-name.divided {
  @apply border-y-2 border-y-gray-200;
}

.category-name.selected.divided {
  @apply border-2 border-purple-800;
}

.category-actions {
  @apply hidden;
}

.category-name.selected .category-actions {
  @apply flex gap-1;
}
</style>
