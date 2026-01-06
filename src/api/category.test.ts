import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { create, getCategories, update, remove } from './category'
import { CATEGORY_URL, WITHOUT_CATEGORY_NAME } from '@/constants'
import { Category } from '@/types'

// Mock fetch
const originalFetch = global.fetch

describe('category API', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  describe('create', () => {
    it('should create a category with correct parameters', async () => {
      const mockCategory: Category = {id: 1, name: 'Technology'}

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockCategory)
      } as any)

      const result = await create('Technology')

      expect(global.fetch).toHaveBeenCalledWith(`${CATEGORY_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: 'Technology'})
      })

      expect(result).toEqual(mockCategory)
    })

    it('should throw an error when response is not ok', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false
      } as any)

      await expect(create('Technology')).rejects.toThrow('Unable to create a category')
    })
  })

  describe('getCategories', () => {
    it('should return categories with "Without category" option when categoryName is provided', async () => {
      const mockCategories: Category[] = [
        {id: 1, name: 'Technology'},
        {id: 2, name: 'Travel'}
      ]

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockCategories)
      } as any)

      const result = await getCategories('test')

      // Check if fetch was called with correct URL
      expect(global.fetch).toHaveBeenCalledWith(`${CATEGORY_URL}?categoryName=test`)

      // Check if result includes WITHOUT_CATEGORY_NAME as first item
      expect(result[0]).toEqual({
        id: null,
        name: WITHOUT_CATEGORY_NAME
      })

      // Check if remaining items are sorted
      expect(result.slice(1)).toEqual(mockCategories.sort())
    })

    it('should return categories with "Without category" option when categoryName is not provided', async () => {
      const mockCategories: Category[] = [
        {id: 1, name: 'Technology'},
        {id: 2, name: 'Travel'}
      ]

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockCategories)
      } as any)

      const result = await getCategories()

      // Check if fetch was called with URL without categoryName parameter
      expect(global.fetch).toHaveBeenCalledWith(`${CATEGORY_URL}?categoryName=undefined`)

      // Check result structure
      expect(result[0]).toEqual({
        id: null,
        name: WITHOUT_CATEGORY_NAME
      })
    })

    it('should return empty array when response is not ok', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false
      } as any)

      const result = await getCategories('test')

      expect(result).toEqual([])
    })
  })

  describe('update', () => {
    it('should update category with correct parameters', async () => {
      const mockCategory: Category = {id: 1, name: 'Updated Technology'}

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as any)

      await update(mockCategory)

      expect(global.fetch).toHaveBeenCalledWith(`${CATEGORY_URL}/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: 'Updated Technology'})
      })
    })
  })

  describe('remove', () => {
    it('should remove category with correct parameters', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as any)

      await remove(1)

      expect(global.fetch).toHaveBeenCalledWith(`${CATEGORY_URL}/1`, {
        method: 'DELETE'
      })
    })
  })
})
