import { WORD_URL } from '@/constants'
import { normalizeNullable } from '@/utils'
import { Word, WordQueryParams } from '@/types'

const setQueryParams = (rawUrl: string, queryParams?: WordQueryParams): string | URL => {
    if(!queryParams) return rawUrl

    const url = new URL(rawUrl)
    Object.keys(queryParams).forEach(key => {
        if(['', undefined].includes(queryParams[key])) {
            return
        }
        url.searchParams.append(key, queryParams[key])
    })
    return url
}

export const create = async (word: Word): Promise<void> => {
    await fetch(`${WORD_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })
}

export const update = async (word: Word): Promise<void> => {
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

export const getWordlist = async (categoryId: number, queryParams?: WordQueryParams): Promise<Word[]> => {
    const rawData = categoryId
        ? await getWordlistByCategory(categoryId, queryParams)
        : await getWordlistOrphans(queryParams)

    return rawData.map(word => normalizeNullable(word, ['id', 'category']))
}

export const getWordlistByCategory = async (categoryId: number, queryParams?: WordQueryParams): Promise<Word[]> => {
    const url = setQueryParams(`${WORD_URL}/categories/${categoryId}`, queryParams)
    const response = await fetch(url)
    if (response.ok) {
        return await response.json()
    } else {
        return []
    }
}

export const getWordlistOrphans = async (queryParams?: WordQueryParams): Promise<Word[]> => {
    const url = setQueryParams(`${WORD_URL}/categories/orphan`, queryParams)
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


