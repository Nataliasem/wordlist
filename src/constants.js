export const API_URL = import.meta.env.VITE_API_URL
export const WORD_URL = API_URL + '/api/v1/words'
export const CATEGORY_URL = API_URL + '/api/v1/categories'

export const WORD_TABLE_CONFIG = [
  { title: 'Word', key: 'word', required: true},
  { title: 'Transcription', key: 'transcription', required: false},
  { title: 'Definition', key: 'definition', required: false},
  { title: 'Translation', key: 'translation', required: false}
]

export const EMPTY_WORD = {
  word: '',
  transcription: '',
  definition: '',
  translation: '',
  examples: [],
  category: null
}

export const WORD_TABLE_MESSAGE = {
  empty: {
    type: 'empty',
    text: 'No words in this category.'
  },
  error: {
    type: 'error',
    text: 'Something went wrong fetching words.'
  },
  emptySearch: {
    type: 'empty',
    text: 'No such word was found. Try changing the search criteria or add a new word.'
  }
}

export const WORD_FORM_CONFIG = [
  'category',
  'word',
  'transcription',
  'definition',
  'translation',
  'examples'
]

export const DEFAULT_FETCH_LIMIT = 30

export const DEFAULT_WORD_SORT = {
  column: 'word',
  direction: 'asc'
}
