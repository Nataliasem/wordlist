import { CATEGORY_URL } from '@/constants'
import { Category } from '@/types'

export const create = async (categoryName: string): Promise<Category> => {
    const response = await fetch(`${CATEGORY_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: categoryName})
    })

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Unable to create a category')
    }
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
        body: JSON.stringify({category: category.name})
    })
}

export const remove = async (id: number): Promise<void> => {
    await fetch(`${CATEGORY_URL}/${id}`, {
        method: 'DELETE'
    })
}
