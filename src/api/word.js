import { WORD_URL } from '@/constants.js'

export const create = async (word) => {
  await fetch(`${WORD_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  })
}

export const update = async (word) => {
  await fetch(`${WORD_URL}/${word.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  })
}

export const remove = async (wordId) => {
  await fetch(`${WORD_URL}/${ wordId }`, {
    method: 'DELETE'
  })
}

export const getWordlist = async (categoryId) => {
  return await categoryId
     ? await getWordlistByCategory(categoryId)
     : await getWordlistOrphans()
}

export const getWordlistByCategory = async (categoryId) => {
  const response = await fetch(`${WORD_URL}/categories/${ categoryId }`)
  if (response.ok) {
    return await response.json()
  } else {
    return []
  }
}

export const getWordlistOrphans = async () => {
  const response = await fetch(`${WORD_URL}/categories/orphan`)
  if (response.ok) {
   return await response.json()
  } else {
    return []
  }
}

export const changeCategory = async (categoryId, updatedWords) => {
  await fetch(`${WORD_URL}/change-category/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedWords)
  })
}


