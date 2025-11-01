import { computed, ref } from 'vue'
import { useCustomFetch, useSearch, useSelectedCategory } from '@/composables'
import { getCategories } from '@/api/category'
import { FETCH_CATEGORY_MESSAGE } from '@/constants'
import { Category } from '@/types'
import type { Ref } from 'vue'
import { create, update, remove } from '@/api/category'
import { watchDebounced } from '@vueuse/core'

const categories: Ref<Category[]> = ref([])

export function useCategoryFetch() {
    const {
        searchString,
        hasActiveSearch,
        clearSearch
    } = useSearch()

    const {
        isEmpty,
        hasError,
        data,
        fetchData,
    } = useCustomFetch(getCategories);

    const fetchCategories = async () => {
        await fetchData(searchString.value)
        categories.value = data.value
    }
    (async () => {
        await fetchCategories()
    })()

    watchDebounced(searchString, fetchCategories, {
        debounce: 500
    })

    const fetchMessage = computed(() => {
        if (hasError.value) return FETCH_CATEGORY_MESSAGE.error
        if(isEmpty.value) {
            return hasActiveSearch.value ? FETCH_CATEGORY_MESSAGE.emptySearch : FETCH_CATEGORY_MESSAGE.empty
        }
        return null
    })

    const { selectCategory, selectedCategoryId } = useSelectedCategory()
    const createCategory = async (): Promise<void> => {
        if (!searchString.value) return
        const category = await create(searchString.value)
        await fetchCategories()
        selectCategory(category)
        clearSearch()
    }

    const updateCategory = async (category: Category) => {
        await update(category)
        await fetchCategories()
        selectCategory(category)
    }

    const removeCategory = async () => {
        await remove(selectedCategoryId.value as number)
        await fetchCategories()
        selectCategory(categories.value[0])
        clearSearch()
    }

    return {
        fetchMessage,
        searchString,
        clearSearch,
        isEmpty,
        hasError,
        categories,
        fetchCategories,
        createCategory,
        updateCategory,
        removeCategory
    }
}
