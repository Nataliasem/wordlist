export const API_URL = import.meta.env.VITE_API_URL
export const WORD_URL = API_URL + '/api/v1/words'
export const CATEGORY_URL = API_URL + '/api/v1/categories'

export const WORD_TABLE_CONFIG = [
  { title: 'Word', key: 'word', required: true, display: true },
  { title: 'Transcription', key: 'transcription', required: false, display: true },
  { title: 'Definition', key: 'definition', required: false, display: true },
  { title: 'Translation', key: 'translation', required: false, display: true},
  { title: 'Add/edit', key: '', required: false, display: false},
  { title: 'Clear/delete', key: '', required: false, display: false},
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
  fetching: {
    type: 'fetching',
    text: 'Words are fetching...'
  },
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
