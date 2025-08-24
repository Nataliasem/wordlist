<template>
  <div
    class="category-items__wrapper"
  >
    <div
      v-for="(item, index) in categoryStore.categories"
      :key="item.id"
      class="category-name"
      :class="{
        'category-name__selected' : item.id === categoryStore.selectedCategoryId
      }"
      :id="item.id"
      :tabindex="index"
      @click="selectCategory(item)"
      @focus="selectCategory(item)"
      @keyup.up="navigateUp(index)"
      @keyup.down="navigateDown(index)"
    >
      <div v-if="updatedCategory && updatedCategory.id === item.id">
        <input
          v-model="updatedCategory.name"
          class="category-input"
          type="text"
          name="update-category"
        >
        <button class="icon-button_filled" @click.stop="updateCategory">
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

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useCategoryStore } from '../stores/category.js'
import AppModal from './reusable/AppModal.vue'
import { useModal } from '../composables/useModal.js'

const categoryStore = useCategoryStore()

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
  document.getElementById(categoryStore.selectedCategoryId).focus()
})

const switchToUpdatingMode = (category) => {
  // To avoid direct reference with categories in store
  updatedCategory.value = { ...category }
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

const navigateUp = async (currentIndex) => {
  const prevElId = categoryStore.categories[currentIndex - 1]?.id
  if(prevElId) {
    await nextTick()
    const prevEl = document.getElementById(prevElId)
    prevEl.focus()
  }
}

const navigateDown = async (currentIndex) => {
  const nextElId = categoryStore.categories[currentIndex + 1]?.id
  if(nextElId) {
    await nextTick()
    const nextEl = document.getElementById(nextElId)
    nextEl.focus()
  }
}
</script>

<style>
.category-items__wrapper {
  overflow-y: scroll;
  height: 85%;
  position: fixed;
  top: 142px;
}

.category-actions {
  display: none;
  cursor: pointer;
}

.category-actions__selected {
  display: flex;
  gap: 4px;
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
