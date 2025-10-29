<script setup lang="ts">
import { defineAsyncComponent, computed, nextTick, type Ref, ref } from 'vue'
import AppNavigation from '@/components/common/AppNavigation.vue'
import { useSelectedCategory } from '@/composables'
import { useModal } from '@/composables'
import { Category } from '@/types'

const AppModal = defineAsyncComponent(() => import('@/components/common/AppModal.vue'))
defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  'update-category': [category: Category | null]
  'delete-category': []
}>()

const { selectedCategoryId, selectedCategoryName, selectCategory } = useSelectedCategory()
const { isModalOpen, closeModal, openModal } = useModal()

// Use function template refs because an input element is initially hidden
const updatedCategoryInputRef = ref<HTMLInputElement | null>(null)
const updatedCategory:Ref<Category | null> = ref(null)
const updatedCategoryId = computed(() => {
  return updatedCategory.value?.id || null
})

const onSelectCategory = (category: Category) => {
  if([selectedCategoryId, updatedCategory.value?.id].includes(category.id)) {
    return
  }
  selectCategory(category)
  toggleUpdatingMode(null)
}
const toggleUpdatingMode = async (category: Category | null) => {
  if(!category || !category.id) {
    updatedCategory.value = null
    return
  }

  // this category is already in updating mode - do nothing
  if(category.id === updatedCategory.value?.id) {
    return
  }

  updatedCategory.value = {...category}
  await nextTick()
  if(updatedCategoryInputRef.value) {
    updatedCategoryInputRef.value.focus()
  }
}

const updateCategoryHandler =  () => {
  emit('update-category', updatedCategory.value)
  toggleUpdatingMode(null)
}

const deleteCategoryHandler = () => {
  emit('delete-category')
  closeModal()
}
</script>

<template>
  <div
    class="category-items__wrapper"
  >
    <AppNavigation
      v-slot="{ item }"
      :items="categories"
      :selected-item-id="selectedCategoryId"
      @click="onSelectCategory"
      @enter="toggleUpdatingMode($event as Category)"
    >
      <div
        class="category-name"
        :class="{
          'selected' : item.id === selectedCategoryId,
          'divided': item.id === null
        }"
      >
        <div v-if="updatedCategory && updatedCategoryId === item.id">
          <input
            :id="`updated-category-${updatedCategoryId}`"
            :ref="(el) => updatedCategoryInputRef = el as HTMLInputElement"
            v-model="updatedCategory.name"
            class="category-input"
            type="text"
            name="update-category"
          >
          <button
            type="button"
            class="px-1 cursor-pointer hover:text-purple-800"
            @click.stop="updateCategoryHandler"
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
              type="button"
              class="px-1 cursor-pointer hover:text-purple-800"
              @click.stop="toggleUpdatingMode(item as Category)"
            >
              <v-icon
                name="ri-pencil-line"
                title="Edit category"
              />
            </button>
            <button
              type="button"
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
    v-if="isModalOpen"
    :show="isModalOpen"
    @confirm="deleteCategoryHandler"
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
