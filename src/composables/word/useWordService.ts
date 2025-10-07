import { changeCategory, create, remove, removeMany, update } from '@/api/word'
import type { Word, CategoryId } from '@/types'

export function useWordService() {
    const createWord = async (word: Word): Promise<void> => {
        await create(word)
    }
    const updateWord = async (word: Word): Promise<void> => {
        await update(word)
    }
    const removeWord = async (id: number): Promise<void> => {
        await remove(id)
    }
    const removeWords = async (ids: number[]): Promise<void> => {
        await removeMany(ids)
    }
    const changeWordsCategory = async (categoryId: CategoryId, updatedWords: number[]): Promise<void> => {
        await changeCategory(categoryId, updatedWords)
    }

    return {
        createWord,
        updateWord,
        removeWord,
        removeWords,
        changeWordsCategory
    }
}
