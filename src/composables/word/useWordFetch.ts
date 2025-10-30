import { useSearch, useCustomFetch, useSelectedCategory } from '@/composables'
import { changeCategory, create, getWordlist, remove, removeMany, update } from '@/api/word'
import { computed, ref, watch } from 'vue'
import { DEFAULT_FETCH_LIMIT, DEFAULT_WORD_SORT, FETCH_WORD_MESSAGE } from '@/constants'
import { CategoryId, UpdatedWord } from '@/types'
import { watchDebounced } from '@vueuse/core'

export function useWordFetch() {
    const { selectedCategoryId } = useSelectedCategory()
    watch(selectedCategoryId, async () => {
        resetQueryParams()
        await fetchWordList()
    })

    const {
        searchString,
        hasActiveSearch,
        clearSearch
    } = useSearch()

    const {
        isEmpty,
        hasError,
        data: wordList,
        fetchData,
    } = useCustomFetch(getWordlist)

    const fetchMessage = computed(() => {
        if (hasError.value) return FETCH_WORD_MESSAGE.error
        if(isEmpty.value) {
            return hasActiveSearch.value ? FETCH_WORD_MESSAGE.emptySearch : FETCH_WORD_MESSAGE.empty
        }
        return null
    })

    const currentPage = ref(1)
    watch(searchString, () => {
        if (searchString.value.length) {
            currentPage.value = 1
        }
    })
    const sortedBy = ref({
        sortColumn: DEFAULT_WORD_SORT.column,
        sortDirection: DEFAULT_WORD_SORT.direction,
    })
    const queryParams = computed(() => ({
        word: searchString.value,
        offset: currentPage.value - 1,
        sortColumn: sortedBy.value.sortColumn,
        sortDirection: sortedBy.value.sortDirection,
        limit: DEFAULT_FETCH_LIMIT
    }))
    const resetQueryParams = () => {
        searchString.value = ''
        currentPage.value = 1
        sortedBy.value.sortColumn = DEFAULT_WORD_SORT.column
        sortedBy.value.sortDirection = DEFAULT_WORD_SORT.direction
    }

    const fetchWordList = async () => {
        await fetchData(selectedCategoryId.value, queryParams.value)
    }
    (async () => {
        await fetchWordList()
    })()
    watchDebounced(queryParams, fetchWordList, {
        debounce: 500
    })

    const createWord = async (word: UpdatedWord): Promise<void> => {
        await create(word)
        await fetchWordList()
    }
    const updateWord = async (word: UpdatedWord): Promise<void> => {
        await update(word)
        await fetchWordList()
    }
    const removeWord = async (id: number): Promise<void> => {
        await remove(id)
        await fetchWordList()
    }
    const removeWords = async (ids: number[]): Promise<void> => {
        await removeMany(ids)
        await fetchWordList()
    }
    const changeWordsCategory = async (categoryId: CategoryId, updatedWords: number[]): Promise<void> => {
        await changeCategory(categoryId, updatedWords)
        await fetchWordList()
    }

    return {
        sortedBy,
        currentPage,
        searchString,
        fetchMessage,
        clearSearch,
        wordList,
        fetchWordList,
        removeWord,
        removeWords,
        changeWordsCategory,
        updateWord,
        createWord
    }
}


