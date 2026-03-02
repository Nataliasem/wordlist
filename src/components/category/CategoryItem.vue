<script setup lang="ts">
import { Category } from '@/types'
import { useSelectedCategory, useUpdatedCategory } from "@/composables";

defineProps<{
  category: Category,
}>()

const emit = defineEmits<{
  'update-category': [category: Category | null]
  'delete-category': [id: number]
}>()

const { selectedCategoryId } = useSelectedCategory();

const {
  updatedCategoryInputRef,
  updatedCategory,
  updatedCategoryId,
  toggleUpdatingMode,
} = useUpdatedCategory();

const updateCategoryHandler = () => {
  emit('update-category', updatedCategory.value)
  toggleUpdatingMode(null)
}
</script>

<template>
  <div
    class="category-name"
    :class="{
      'selected' : category.id === selectedCategoryId,
      'divided': category.id === null
    }"
  >
    <div v-if="updatedCategory && updatedCategoryId === category.id">
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
      <p
        class="overflow-hidden text-ellipsis"
        data-test-id="category-name"
      >
        {{ category.name }}
      </p>

      <div
        v-if="category.id !== null"
        data-test-id="category-actions"
        class="category-actions"
      >
        <button
          data-test-id="toggle-updating-mode-button"
          type="button"
          class="px-1 cursor-pointer hover:text-purple-800"
          @click.stop="toggleUpdatingMode(category as Category)"
        >
          <v-icon
            name="ri-pencil-line"
            title="Edit category"
          />
        </button>
        <button
          data-test-id="open-confirm-deleting-modal-button"
          type="button"
          class="px-1 cursor-pointer hover:text-purple-800"
          @click.stop="$emit('delete-category', category.id)"
        >
          <v-icon
            name="ri-delete-bin-2-line"
            title="Delete category"
          />
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>