import { CATEGORY_URL } from '../constants.js'

export const create = async (category) => {
  const response = await fetch(`${CATEGORY_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category })
  })
  if (response.ok) {
    return await response.json()
  } else {
    return []
  }
}

export const getCategories = async () => {
  const response = await fetch(`${CATEGORY_URL}`)
  if (response.ok) {
    const res = await response.json()
    return [{
      id: null,
      name: 'Words without category',
    }].concat(res)
  } else {
    return []
  }
}

export const update = async (category) => {
  await fetch(`${CATEGORY_URL}/${category.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category: category.name })
  })
}

export const remove = async (id) => {
  await fetch(`${CATEGORY_URL}/${ id }`, {
    method: 'DELETE'
  })
}
