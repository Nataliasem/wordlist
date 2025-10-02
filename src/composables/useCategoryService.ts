import { nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import { useCategoryStore } from '@/stores/index.js'
import type { Category } from '@/types/category.ts'

export function useCategoryService(updatedCategoryInputRef: Ref<HTMLInputElement>) {
    const categoryStore = useCategoryStore()

    const updatedCategory:Ref<Category | null> = ref(null)
    const updateCategory = async () => {
        await categoryStore.updateCategory(updatedCategory.value)
        updatedCategory.value = null
    }
    const selectCategory = (category: Category) => {
        // Cannot select a category if it's already selected or updating
        if([categoryStore.selectedCategoryId, updatedCategory.value?.id].includes(category.id)) {
            return
        }
        categoryStore.selectCategory(category)
        toggleUpdatingMode(null)
    }

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

    const addCategory = async (categoryName: string) => {
        if (!categoryName) return
        await categoryStore.createCategory(categoryName)
    }

    const deleteCategory = async () => {
        await categoryStore.deleteCategory(categoryStore.selectedCategoryId)
        categoryStore.selectFirstCategoryAsDefault()
    }

    return {
        updatedCategory,
        selectCategory,
        toggleUpdatingMode,
        updateCategory,
        addCategory,
        deleteCategory
    }
}
