import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { Category, NumId } from '@/types'

const selectedCategory: Ref<Category | null> = ref(null)
export function useSelectedCategory() {
    const selectedCategoryId = computed<NumId>(() => selectedCategory.value?.id || null)
    const selectedCategoryName = computed(() => selectedCategory.value?.name || '')
    const selectCategory = (category: Category): void => {
        selectedCategory.value= category
    }

    return {
        selectedCategory,
        selectedCategoryId,
        selectedCategoryName,
        selectCategory
    }
}
