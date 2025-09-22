import { WORD_URL } from '@/constants.js'
import { normalizeNullable } from '@/utils/index.js'
import { Word } from '@types/word.ts'

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
  await fetch(`${WORD_URL}/${ wordId }`, {
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

export const getWordlist = async (categoryId: number): Promise<Word[]> => {
  const rawData =  categoryId
     ? await getWordlistByCategory(categoryId)
     : await getWordlistOrphans()

  return rawData.map(word => normalizeNullable(word, ['id', 'category']))
}

export const getWordlistByCategory = async (categoryId: number): Promise<Word[]> => {
  const response = await fetch(`${WORD_URL}/categories/${ categoryId }`)
  if (response.ok) {
    return await response.json()
  } else {
    return []
  }
}

export const getWordlistOrphans = async (): Promise<Word[]>  => {
  const response = await fetch(`${WORD_URL}/categories/orphan`)
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


