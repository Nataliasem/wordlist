import { computed, ref } from 'vue'
import { useCustomFetch, useSearch, useSelectedCategory } from '@/composables'
import { getCategories } from '@/api/category'
import { FETCH_CATEGORY_MESSAGE } from '@/constants'
import { Category } from '@/types'
import type { Ref } from 'vue'
import { create, update, remove } from '@/api/category'

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
        await fetchData()
        categories.value = data.value
    }
    (async () => {
        await fetchCategories()
    })()

    const filteredData = computed(() => {
        return categories.value.filter(item => item.name.toLowerCase()
            .includes(searchString.value.toLowerCase()))
    })
    const fetchMessage = computed(() => {
        if (hasError.value) return FETCH_CATEGORY_MESSAGE.error
        if (!hasActiveSearch.value && isEmpty.value) return FETCH_CATEGORY_MESSAGE.empty
        if (hasActiveSearch.value && !filteredData.value.length) return FETCH_CATEGORY_MESSAGE.emptySearch
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
        filteredData,
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
