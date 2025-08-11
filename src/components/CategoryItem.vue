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
      <button class="add-category__button" @click="updateCategoryById">✅</button>
    </div>

    <template v-else>
      <div class="truncated">{{ category.name }}</div>

      <div
        class="category-actions"
        :class="{ 'category-actions__selected' : isSelected }"
      >
        <div class="category-actions__button" @click="isEditing = true">✎</div>
        <div class="category-actions__button" @click="deleteCategoryById">
          ❌
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { deleteCategory, updateCategory } from '../api/category.js'

const props = defineProps({
  category: Object,
  selectedCategoryId: Number
})

const emit = defineEmits(['select-category', 'update-categories'])

const isSelected = computed(() => props.category.id === props.selectedCategoryId)

const selectCategory = () => {
  emit('select-category', props.category)
}

watch(() => props.selectedCategoryId, () => {
  isEditing.value = false
})

const isEditing = ref(false)
const updatedCategory = ref(props.category.name)
const updateCategoryById = async () => {
  await updateCategory({
    id: props.category.id,
    name: updatedCategory.value
  })
  emit('update-categories')
  isEditing.value = false
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

.truncated {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
