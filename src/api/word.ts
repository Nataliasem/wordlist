import { WORD_URL } from '@/constants'
import { setWordQueryParams } from '@/utils'
import { NumId, UpdatedWord, Word, WordQueryParams } from '@/types'

export const create = async (word: UpdatedWord): Promise<void> => {
    await fetch(`${WORD_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })
}

export const update = async (word: UpdatedWord): Promise<void> => {
    await fetch(`${WORD_URL}/${word.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })
}

export const remove = async (wordId: number): Promise<void> => {
    await fetch(`${WORD_URL}/${wordId}`, {
        method: 'DELETE'
    })
}

export const removeMany = async (wordIds: number[]): Promise<void> => {
    await fetch(`${WORD_URL}/delete-bulk`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordIds)
    })
}

interface WordListRequestParams {
    categoryId: NumId
    queryParams?: WordQueryParams
}
export const getWordlist = async (params: WordListRequestParams): Promise<Word[]> => {
    const rawData = params.categoryId
        ? await getWordlistByCategory(params.categoryId, params.queryParams)
        : await getWordlistOrphans(params.queryParams)

    return rawData.map(word => {
        return {
            id: word.id,
            category: word.category,
            examples: word.examples,
            word: word.word ?? '',
            transcription: word.transcription ?? '',
            definition: word.definition ?? '',
            translation: word.translation ?? '',
        }
    })
}

export const getWordlistByCategory = async (categoryId: number, queryParams?: WordQueryParams): Promise<Word[]> => {
  console.log(categoryId)
    const url = setWordQueryParams(`${WORD_URL}/categories/${categoryId}`, queryParams)
    const response = await fetch(url)
    if (response.ok) {
        return await response.json()
    } else {
        return []
    }
}

export const getWordlistOrphans = async (queryParams?: WordQueryParams): Promise<Word[]> => {
    const url = setWordQueryParams(`${WORD_URL}/categories/orphan`, queryParams)
    const response = await fetch(url)
    if (response.ok) {
        return await response.json()
    } else {
        return []
    }
}

export const changeCategory = async (categoryId: number | null, updatedWords: number[]): Promise<void> => {
    await fetch(`${WORD_URL}/change-category`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            wordIds: updatedWords,
            categoryId
        })
    })
}


