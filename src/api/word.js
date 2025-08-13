import { WORD_URL } from '../constants.js'

export const createWord = async (word) => {
  await fetch(`${WORD_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  })
}

export const updateWord = async (word) => {
  await fetch(`${WORD_URL}/${word.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  })
}

export const deleteWord = async (wordId) => {
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


