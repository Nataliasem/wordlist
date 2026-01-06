import { describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useSearch } from './useSearch'

describe('useSearch composable', () => {
  let result: ReturnType<typeof useSearch>

  beforeEach(() => {
    result = useSearch()
  })

  it('should initialize with empty search string', () => {
    expect(result.searchString.value).toBe('')
  })

  it('should have hasActiveSearch as computed ref', () => {
    expect(typeof result.hasActiveSearch.value).toBe('boolean')
  })

  it('should return false for hasActiveSearch when search string is empty', () => {
    expect(result.hasActiveSearch.value).toBe(false)
  })

  it('should return true for hasActiveSearch when search string has content', () => {
    result.searchString.value = 'test'
    expect(result.hasActiveSearch.value).toBe(true)
  })

  it('should clear search string when clearSearch is called', () => {
    result.searchString.value = 'test'
    expect(result.searchString.value).toBe('test')

    result.clearSearch()
    expect(result.searchString.value).toBe('')
  })

  it('should update hasActiveSearch when search string changes', () => {
    // Initially false
    expect(result.hasActiveSearch.value).toBe(false)

    // After setting search string
    result.searchString.value = 'test'
    expect(result.hasActiveSearch.value).toBe(true)

    // After clearing
    result.clearSearch()
    expect(result.hasActiveSearch.value).toBe(false)
  })

  it('should have reactive hasActiveSearch computed property', async () => {
    // Test reactivity by changing the search string
    result.searchString.value = 'a'
    expect(result.hasActiveSearch.value).toBe(true)

    result.searchString.value = ''
    expect(result.hasActiveSearch.value).toBe(false)

    result.searchString.value = 'search term'
    expect(result.hasActiveSearch.value).toBe(true)
  })

  it('should return the expected structure', () => {
    expect(result).toHaveProperty('searchString')
    expect(result).toHaveProperty('hasActiveSearch')
    expect(result).toHaveProperty('clearSearch')
    expect(typeof result.clearSearch).toBe('function')
    expect(result.searchString).toBeInstanceOf(Object)
    expect(result.hasActiveSearch).toBeInstanceOf(Object)
  })
})
