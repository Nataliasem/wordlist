<template>
  <div
    class="category-name"
    :class="{ 'category-name__selected' : isSelected }"
    @click="selectCategory"
  >
    <div class="add-category__wrapper">
      <input
        v-model="updateCategory"
        :placeholder=category.name
        class="add-category__input"
        type="text"
      >
      <button class="add-category__button" @click="updateCategoryById">Save</button>
    </div>
    <input type="text" v-if="isEditing">
    <div v-else>
      {{ category.name }}
    </div>
    <div
      class="category-actions"
      :class="{ 'category-actions__selected' : isSelected }"
    >
      <div class="category-actions__button" @click="isEditing = true">✎</div>
      <div class="category-actions__button" @click="deleteCategoryById">
        ❌
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { deleteCategory, updateCategory } from '../api/category.js'

const props = defineProps({
  category: Object,
  selectedCategoryId: String
})

const emit = defineEmits(['select-category', 'update-categories'])

const isSelected = computed(() => props.category.id === props.selectedCategoryId)

const selectCategory = () => {
  emit('selectCategory', props.category)
}

const isEditing = ref(false)
const updatedCategory = ref('')
const updateCategoryById = async () => {
  await updateCategory({
    id: props.category.id,
    name: updatedCategory.value
  })
  emit('update-categories')
}

const deleteCategoryById = async () => {
  await deleteCategory(props.category.id)
  emit('update-categories')
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
</style>
