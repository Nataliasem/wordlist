import { Category, NumId } from "@/types";
import { computed, nextTick, type Ref, ref } from "vue";

const updatedCategory: Ref<Category | null> = ref(null);
export const useUpdatedCategory = () => {
  // Use function template refs because an input element is initially hidden
  const updatedCategoryInputRef = ref<HTMLInputElement | null>(null);

  const updatedCategoryId = computed<NumId>(() => {
    return updatedCategory.value?.id || null;
  });

  const toggleUpdatingMode = async (category: Category | null) => {
    debugger
    if (!category || !category.id) {
      updatedCategory.value = null;
      return;
    }

    // this category is already in updating mode - do nothing
    if (category.id === updatedCategory.value?.id) {
      return;
    }

    updatedCategory.value = { ...category };
    await nextTick();
    if (updatedCategoryInputRef.value) {
      updatedCategoryInputRef.value.focus();
    }
  };

  return {
    updatedCategoryInputRef,
    updatedCategory,
    updatedCategoryId,
    toggleUpdatingMode,
  };
};