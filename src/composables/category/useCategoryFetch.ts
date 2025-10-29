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
        fetchData: fetchCategories,
    } = useCustomFetch(getCategories);

    (async () => {
        await fetchCategories()
        categories.value = data.value
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
        categories.value = data.value
        selectCategory(category)
        clearSearch()
    }

    const updateCategory = async (category: Category) => {
        await update(category)
        await fetchCategories()
        categories.value = data.value
        selectCategory(category)
    }

    const removeCategory = async () => {
        await remove(selectedCategoryId.value as number)
        await fetchCategories()
        categories.value = data.value
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
