<script setup lang="ts">
import AppSearchInput from '@/components/common/AppSearchInput.vue';
import { useCategoryFetch, useModal, useSelectedCategory, useUpdatedCategory } from '@/composables';
import { MessageType } from '@/constants';
import { reloadPage } from '@/utils';
import CategoryItem from '@/components/category/CategoryItem.vue';
import { Category } from '@/types';
import { defineAsyncComponent, ref } from 'vue';
const AppModal = defineAsyncComponent(() => import('@/components/common/AppModal.vue'));

const {
  searchString,
  categories,
  fetchMessage,
  createCategory,
  updateCategory,
  removeCategory
} = useCategoryFetch();

const { selectedCategoryId, selectedCategoryName, selectCategory } = useSelectedCategory();
const { updatedCategoryId, toggleUpdatingMode, } = useUpdatedCategory();
const { isModalOpen, closeModal, openModal: openConfirmDeleteModal } = useModal();

const onSelectCategory = (category: Category) => {
  if ([selectedCategoryId.value, updatedCategoryId.value].includes(category.id)) {
    return;
  }
  selectCategory(category);
  toggleUpdatingMode(null);
};

const onDeleteCategory = () => {
  removeCategory();
  closeModal();
};

// Use function template refs because of re-rendering items when props changes
const itemRefs = ref<Record<string, HTMLElement>>({});
const setRefs = (elementId: number | string | null, element: HTMLElement): void => {
  const key = String(elementId);
  itemRefs.value[key] = element;
};
const navigateUp = async (currentIndex: number) => {
  const prevElId = String(categories.value[currentIndex - 1]?.id);
  itemRefs.value[prevElId]?.focus();
};
const navigateDown = async (currentIndex: number) => {
  const nextElId = String(categories.value[currentIndex + 1]?.id);
  itemRefs.value[nextElId]?.focus();
};
</script>

<template>
  <div class="h-full bg-gray-100 p-4">
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

    <p v-if="fetchMessage" class="w-64 app-message">
      <span data-test-id="fetch-message-text">{{ fetchMessage.text }}</span>
      <span
        v-if="fetchMessage.type === MessageType.Error"
        data-test-id="reload-page-link"
      >
        Please <a @click="reloadPage">reload the page</a>.
      </span>
    </p>

    <div v-else class="category-items__wrapper">
      <ul>
        <li
          v-for="(item, index) in categories"
          :ref="(el) => setRefs(item.id, el as HTMLElement)"
          :key="String(item.id)"
          :tabindex="index"
          class="outline-none"
          @click="onSelectCategory(item)"
          @focus="onSelectCategory(item)"
          @keyup.enter="toggleUpdatingMode(item)"
          @keyup.up="navigateUp(index)"
          @keyup.down="navigateDown(index)"
        >
          <CategoryItem
            :category="item"
            @delete-category="openConfirmDeleteModal"
            @update-category="updateCategory"
          />
        </li>
      </ul>
    </div>
  </div>

  <AppModal
    v-if="isModalOpen"
    :show="isModalOpen"
    @confirm="onDeleteCategory"
    @cancel="closeModal"
  >
    <template #header>
      Want to remove category <em>{{ selectedCategoryName }}</em>?
    </template>

    <template #content>
      <p>All words in this category will be moved to <b>No category</b> tab.</p>
    </template>

    <template #confirm-text>
      Confirm removal
    </template>
  </AppModal>
</template>

<style scoped>
@reference "tailwindcss";

.category-items__wrapper {
  height: calc(100vh - 148px);
  @apply pt-8 w-[272px];
  @apply overflow-y-scroll;
  @apply fixed top-32;
}

.category-items__wrapper::-webkit-scrollbar {
  display: none;
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
