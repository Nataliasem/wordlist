<template>
  <div
    class="category-name"
    :class="{ 'category-name__selected' : isSelected }"
    @click="selectCategory"
  >
    <div v-if="isEditing">
      <input
        v-model="updatedCategory"
        class="category-input"
        type="text"
        name="update-category"
      >
      <button class="add-category__button" @click="updateCategoryById">
        <v-icon name="ri-checkbox-fill" title="Update category" fill="purple"></v-icon>
      </button>
    </div>

    <template v-else>
      <div class="truncated">{{ category.name }}</div>

      <div
        class="category-actions"
        :class="{ 'category-actions__selected' : isSelected }"
      >
        <div class="category-actions__button" @click="isEditing = true">
          <v-icon name="ri-pencil-line" title="Edit category"></v-icon>
        </div>
        <div class="category-actions__button" @click="deleteCategoryById">
          <v-icon name="ri-delete-bin-2-line" title="Delete category"></v-icon>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { deleteCategory, updateCategory } from '../api/category.js'
import { useCategoryStore } from '../stores/category.js'

const props = defineProps({
  category: Object
})

const categoryStore = useCategoryStore()

const selectedCategoryId = computed(() => categoryStore.selectedCategory?.id || null)
const isSelected = computed(() => props.category.id === selectedCategoryId.value)
const selectCategory = () => {
  categoryStore.selectCategory(props.category)
}

watch(() => selectedCategoryId, () => {
  isEditing.value = false
})

const isEditing = ref(false)
const updatedCategory = ref(props.category.name)
const updateCategoryById = async () => {
  await updateCategory({
    id: props.category.id,
    name: updatedCategory.value
  })
  await categoryStore.fetchCategories()
  isEditing.value = false
}

const deleteCategoryById = async () => {
  await deleteCategory(props.category.id)
  await categoryStore.fetchCategories()
  if(categoryStore.categories.length > 0) {
    categoryStore.selectCategory(categoryStore.categories[0])
  }
}

</script>

<style>
.category-actions {
  display: none;
  cursor: pointer;
}

.category-actions__selected {
  display: flex;
}

.category-actions__button {
  padding: 0 8px;
}

.category-actions__button:first-child {
  margin-right: 4px;
}

.truncated {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.update-category__actions {
  display: flex;
}
</style>
