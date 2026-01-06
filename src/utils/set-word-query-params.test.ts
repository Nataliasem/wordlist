import { describe, it, expect } from 'vitest'
import { setWordQueryParams } from './set-word-query-params'
import type { WordQueryParams } from '@/types'

describe('setQueryParams utility function', () => {
    const baseUrl = 'https://api.example.com/words'

    it('should return the original URL when no query params are provided', () => {
        expect(setWordQueryParams(baseUrl)).toBe(baseUrl)
        expect(setWordQueryParams(baseUrl, undefined)).toBe(baseUrl)
    })

    it('should add a single query parameter correctly', () => {
        const queryParams: WordQueryParams = {
            limit: 10,
        }
        const result = setWordQueryParams(baseUrl, queryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.get('limit')).toBe(10)
        expect(result.toString()).toBe(`${baseUrl}?limit=10`)
    })

    it('should add multiple query parameters correctly', () => {
        const queryParams: WordQueryParams = {
            limit: 10,
            word: 'app',
            sortColumn: 'word',
            sortDirection: 'asc',
            offset: 2
        }
        const result = setWordQueryParams(baseUrl, queryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.get('limit')).toBe(10)
        expect(result.searchParams.get('word')).toBe('app')
        expect(result.searchParams.get('sortColumn')).toBe('word')
        expect(result.searchParams.get('sortDirection')).toBe('asc')
        expect(result.toString()).toBe(`${baseUrl}?limit=10&word=app&sortColumn=word&sortDirection=asc&offset=2`)
    })

    it('should handle empty string values by skipping them', () => {
        const queryParams: WordQueryParams = {
            limit: 10,
            word: ''
        }
        const result = setWordQueryParams(baseUrl, queryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.get('limit')).toBe(10)
        expect(result.searchParams.get('word')).toBeNull()
        expect(result.toString()).toBe(`${baseUrl}?limit=1`)
    })

    it('should handle undefined values by skipping them', () => {
        const queryParams: WordQueryParams = {
            limit: 10,
            word: undefined
        }
        const result = setWordQueryParams(baseUrl, queryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.get('limit')).toBe(10)
        expect(result.searchParams.get('word')).toBeNull()
        expect(result.toString()).toBe(`${baseUrl}?limit=1`)
    })

    it('should handle numeric values correctly', () => {
        const queryParams: WordQueryParams = {
            offset: 10
        }
        const result = setWordQueryParams(baseUrl, queryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.get('offset')).toBe(10)
        expect(result.toString()).toBe(`${baseUrl}?offset=10`)
    })

    it('should preserve existing query parameters in the base URL', () => {
        const urlWithParams = `${baseUrl}?existing=param`
        const queryParams: WordQueryParams = { limit: 10 }
        const result = setWordQueryParams(urlWithParams, queryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.get('existing')).toBe('param')
        expect(result.searchParams.get('limit')).toBe(10)
        expect(result.toString()).toBe(`${baseUrl}?existing=param&limit=10`)
    })

    it('should handle special characters in parameter values', () => {
        const queryParams: WordQueryParams = {
            word: 'test & value'
        }
        const result = setWordQueryParams(baseUrl, queryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.get('search')).toBe('test & value')
        expect(result.toString()).toBe(`${baseUrl}?search=test%20%26%20value`)
    })

    it('should handle duplicate parameter names by appending values', () => {
        const queryParams: WordQueryParams = {
            word: 'tech',
            word: 'programming'
        }
        const result = setWordQueryParams(baseUrl, queryParams as WordQueryParams) as URL

        expect(result instanceof URL).toBe(true)
        expect(result.searchParams.getAll('tag')).toEqual(['tech', 'programming'])
        expect(result.toString()).toBe(`${baseUrl}?tag=tech&tag=programming`)
    })
})