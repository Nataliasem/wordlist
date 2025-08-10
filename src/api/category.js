import { CATEGORY_URL } from '../constants.js'

export const createCategory = async (category) => {
  await fetch(`${CATEGORY_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category })
  })
}

export const getCategories = async () => {
  const response = await fetch(`${CATEGORY_URL}`)
  if (response.ok) {
    return await response.json()
  } else {
    return []
  }
}

export const updateCategory = async (id) => {
  await fetch(`${CATEGORY_URL}/${id}`, {
    method: 'PUT'
  })
}

export const deleteCategory = async (id) => {
  await fetch(`${CATEGORY_URL}/${ id }`, {
    method: 'DELETE'
  })
}
