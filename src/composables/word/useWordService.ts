import { changeCategory, create, remove, removeMany, update } from '@/api/word'
import type { Word } from '@/types/word.ts'

export function useWordService() {
    const createWord = async (word: Word) => {
        await create(word)
    }
    const updateWord = async (word: Word) => {
        await update(word)
    }
    const removeWord = async (id: number) => {
        await remove(id)
    }
    const removeWords = async (ids: number[]) => {
        await removeMany(ids)
    }
    const changeWordsCategory = async (categoryId: number | null, updatedWords: number[]) => {
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
