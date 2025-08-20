<template>
  <div class="category-items__wrapper">
    <div
      v-for="item in categoryStore.categories"
      :key="item.id"
      class="category-name"
      :class="{ 'category-name__selected' : item.id === categoryStore.selectedCategoryId }"
      @click="selectCategory(item)"
    >
      <div v-if="updatedCategory && updatedCategory.id === item.id">
        <input
          v-model="updatedCategory.name"
          class="category-input"
          type="text"
          name="update-category"
        >
        <button class="icon-button_filled" @click.stop="updateCategoryById">
          <v-icon name="ri-checkbox-line" title="Update category"></v-icon>
        </button>
      </div>

      <template v-else>
        <div class="truncated">{{ item.name }}</div>

        <div
          class="category-actions"
          :class="{ 'category-actions__selected' : item.id === categoryStore.selectedCategoryId }"
        >
          <button class="icon-button_filled" @click.stop="switchToUpdatingMode(item)">
            <v-icon name="ri-pencil-line" title="Edit category"></v-icon>
          </button>
          <button class="icon-button_filled" @click.stop="openModal">
            <v-icon name="ri-delete-bin-2-line" title="Delete category"></v-icon>
          </button>
        </div>
      </template>
    </div>
  </div>

  <AppModal
    v-if="isModalOpen"
    @confirm="deleteCategoryById"
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

<script setup>
import { ref, watch } from 'vue'
import { deleteCategory, updateCategory } from '../api/category.js'
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'
import AppModal from './AppModal.vue'
import { useModal } from '../composables/useModal.js'

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const { isModalOpen, closeModal, openModal } = useModal()

const updatedCategory = ref(null)
const selectCategory = (category) => {
  // To avoid extra calling of "selectCategory" method when clicking on input in updating mode
  if (updatedCategory.value?.id === category.id) {
    return
  }
  categoryStore.selectCategory(category)
}
watch(() => categoryStore.selectedCategoryId, () => {
  updatedCategory.value = null
})

const switchToUpdatingMode = (category) => {
  // To avoid direct reference with categories in store
  updatedCategory.value = { ...category }
}

const updateCategoryById = async () => {
  await updateCategory(updatedCategory.value)
  await categoryStore.fetchCategories()
  await wordStore.fetchWords()
  categoryStore.selectCategory(updatedCategory.value)
  updatedCategory.value = null
}

const deleteCategoryById = async () => {
  await deleteCategory(categoryStore.selectedCategoryId)
  await categoryStore.fetchCategories()
  if (categoryStore.categories.length > 0) {
    selectCategory(categoryStore.categories[0])
  }
  closeModal()
}

</script>

<style>
.category-items__wrapper {
  overflow-y: scroll;
  height: 75%;
}

.category-actions {
  display: none;
  cursor: pointer;
}

.category-actions__selected {
  display: flex;
  gap: 4px;
}

.truncated {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
