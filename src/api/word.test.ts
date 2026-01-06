import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import * as wordApi from './word'
import { WORD_URL } from '@/constants'
import { Word, UpdatedWord } from '@/types'

describe('word API', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('create', () => {
    it('should create a word with correct parameters', async () => {
      const create = vi.spyOn(wordApi, 'create');

      const mockWord: UpdatedWord = {
        id: 1,
        word: 'test',
        category: 1,
        examples: ['example'],
        transcription: '[test]',
        definition: 'a trial',
        translation: 'тест'
      }

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as Response)

      await create(mockWord)

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockWord)
      })
    })
  })

  describe('update', () => {
    it('should update word with correct parameters', async () => {
      const update = vi.spyOn(wordApi, 'update');

      const mockWord: UpdatedWord = {
        id: 1,
        word: 'updated',
        category: 1,
        transcription: '',
        translation: '',
        definition: '',
        examples: []
      }

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as Response)

      await update(mockWord)

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockWord)
      })
    })
  })

  describe('remove', () => {
    it('should remove word with correct parameters', async () => {
      const remove = vi.spyOn(wordApi, 'remove');

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as Response)

      await remove(1)

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}/1`, {
        method: 'DELETE'
      })
    })
  })

  describe('removeMany', () => {
    it('should remove multiple words with correct parameters', async () => {
      const removeMany = vi.spyOn(wordApi, 'removeMany');

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as Response)

      await removeMany([1, 2, 3])

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}/delete-bulk`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([1, 2, 3])
      })
    })
  })

  describe('getWordlistByCategory', () => {
    it('should fetch words by category with correct URL', async () => {
      const getWordlistByCategory = vi.spyOn(wordApi, 'getWordlistByCategory');

      const mockWords: Word[] = [
        {
          id: 1,
          word: 'test',
          category: {id: 1, name: 'Category'},
          transcription: '',
          translation: '',
          definition: '',
          examples: []
        }
      ]

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockWords)
      } as unknown as Response)

      const result = await getWordlistByCategory(1)

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}/categories/1`)
      expect(result).toEqual(mockWords)
    })

    it('should return empty array when response is not ok', async () => {
      const getWordlistByCategory = vi.spyOn(wordApi, 'getWordlistByCategory');

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false
      } as Response)

      const result = await getWordlistByCategory(1)
      expect(result).toEqual([])
    })
  })

  describe('getWordlistOrphans', () => {
    const getWordlistOrphans = vi.spyOn(wordApi, 'getWordlistOrphans');

    it('should fetch orphan words with correct URL', async () => {
      const mockWords: Word[] = [
        {
          id: 1,
          word: 'orphan',
          category: null,
          transcription: '',
          translation: '',
          definition: '',
          examples: []
        },
      ]

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockWords)
      } as unknown as Response)

      const result = await getWordlistOrphans()

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}/categories/orphan`)
      expect(result).toEqual(mockWords)
    })

    it('should return empty array when response is not ok', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false
      } as Response)

      const result = await getWordlistOrphans()
      expect(result).toEqual([])
    })
  })

  describe('getWordlist', () => {
    it('should call getWordlistByCategory when categoryId is provided', async () => {
      // TODO
    })

    it('should call getWordlistOrphans when categoryId is null', async () => {
      // TODO
    })
  })

  describe('changeCategory', () => {
    const changeCategory = vi.spyOn(wordApi, 'changeCategory');

    it('should change category for multiple words with correct parameters', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as Response)

      await changeCategory(2, [1, 2, 3])

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}/change-category`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wordIds: [1, 2, 3],
          categoryId: 2
        })
      })
    })

    it('should handle null category (move to orphan)', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true
      } as Response)

      await changeCategory(null, [1, 2, 3])

      expect(global.fetch).toHaveBeenCalledWith(`${WORD_URL}/change-category`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wordIds: [1, 2, 3],
          categoryId: null
        })
      })
    })
  })
})