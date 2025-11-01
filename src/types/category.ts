import { NumId } from '@/types'

export type CategoryId = NumId

export interface Category {
    id: CategoryId
    name: string
}

export type CategoryKeys = keyof Category

export interface CategoryQueryParams {
    name: string
}
