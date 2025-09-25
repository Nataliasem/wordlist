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
          'category-name__selected' : item.id === categoryStore.selectedCategoryId,
          'category-name__divided': item.id === null
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
            class="app-button"
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
            class="category-actions"
            :class="{ 'category-actions__selected' : item.id === categoryStore.selectedCategoryId }"
          >
            <button
              class="app-button"
              :disabled="!item.id"
              @click.stop="toggleUpdatingMode(item)"
            >
              <v-icon
                name="ri-pencil-line"
                title="Edit category"
              />
            </button>
            <button
              class="app-button"
              :disabled="!item.id"
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
    @confirm="deleteCategory"
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
import { ref, nextTick } from 'vue'
import { useCategoryStore } from '@/stores/index.js'
import { useModal } from '@/composables/index.js'
import { Category } from '@/types/category.ts'

defineProps<{
  categories: Category[]
}>()

const categoryStore = useCategoryStore()

const { isModalOpen, closeModal, openModal } = useModal()

const updatedCategory = ref(null)
const selectCategory = (category: Category) => {
  // Cannot select a category if it's already selected or updating
  if([categoryStore.selectedCategoryId, updatedCategory.value?.id].includes(category.id)) return

  toggleUpdatingMode(null)
  categoryStore.selectCategory(category)
}

const updatedCategoryInputRef = ref(null)
const toggleUpdatingMode = async (category: Category) => {
  if(!category?.id) {
    updatedCategory.value = null
    return
  }

  // Cannot edit a category if it's already in updating mode
  if(category.id === updatedCategory.value?.id) return

  // To avoid direct reference with categories in store
  updatedCategory.value = {...category}

  // Use function template refs because an input element is initially hidden
  await nextTick()
  updatedCategoryInputRef.value.focus()
}

const updateCategory = async () => {
  await categoryStore.updateCategory(updatedCategory.value)
  categoryStore.selectCategory(updatedCategory.value)
  updatedCategory.value = null
}

const deleteCategory = async () => {
  await categoryStore.deleteCategory(categoryStore.selectedCategoryId)
  categoryStore.selectFirstCategoryAsDefault()
  closeModal()
}
</script>

<style>
.category-items__wrapper {
  overflow-y: scroll;
  height: 85%;
  position: fixed;
  top: 64px;
}

.category-actions {
  display: none;
  cursor: pointer;
}

.category-actions__selected {
  display: flex;
  gap: 4px;
}

.category-name {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  width: 220px;
}

.category-name:hover {
  background-color: #e7e6e9;
}

.category-name__selected {
  font-weight: bold;
  background-color: lavender;
  border-radius: 4px;
  border: 2px solid purple;
}

.category-name.category-name__divided:not(.category-name__selected) {
  border-top: 2px solid  #e7e6e9;
  border-bottom: 2px solid  #e7e6e9;
}

.category-name:focus-visible,
.category-name:focus-within,
.category-name:focus
{
  outline: none;
  background-color: lavender;
  border-color: purple;
}
</style>
