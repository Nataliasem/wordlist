import { CATEGORY_URL } from '@/constants.js'
import { Category } from '@/types/category.ts'

export const create = async (category: Category): Promise<void> => {
  await fetch(`${CATEGORY_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category })
  })
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${CATEGORY_URL}`)
  if (response.ok) {
    const res = await response.json()
    return [{
      id: null,
      name: 'Words without category',
    }].concat(res.sort())
  } else {
    return []
  }
}

export const update = async (category: Category): Promise<void> => {
  await fetch(`${CATEGORY_URL}/${category.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category: category.name })
  })
}

export const remove = async (id: number): Promise<void> => {
  await fetch(`${CATEGORY_URL}/${ id }`, {
    method: 'DELETE'
  })
}
