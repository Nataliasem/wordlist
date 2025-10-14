import { UpdatedWord } from "@/types";

export const API_URL = import.meta.env.VITE_API_URL
export const WORD_URL = API_URL + '/api/v1/words'
export const CATEGORY_URL = API_URL + '/api/v1/categories'

export const WORD_TABLE_CONFIG = [
  { title: 'Word', key: 'word', required: true, sortable: true },
  { title: 'Transcription', key: 'transcription', required: false, sortable: false},
  { title: 'Definition', key: 'definition', required: false, sortable: false},
  { title: 'Translation', key: 'translation', required: false, sortable: false}
]

export const EMPTY_WORD = {
  word: '',
  transcription: '',
  definition: '',
  translation: '',
  examples: [],
  category: null
}

export enum MessageType {
  Error = 'ERROR',
  Empty = 'EMPTY',
  EmptySearch = 'EMPTY_SEARCH'
}

export const FETCH_WORD_MESSAGE = {
  empty: {
    type: MessageType.Empty,
    text: 'No words in this category.'
  },
  error: {
    type: MessageType.Error,
    text: 'Something went wrong fetching words.'
  },
  emptySearch: {
    type: MessageType.EmptySearch,
    text: 'No such word was found. Try changing the search criteria or add a new word.'
  }
}

export const FETCH_CATEGORY_MESSAGE = {
  empty: {
    type: MessageType.Empty,
    text: 'Category`s list is empty. Add the first category'
  },
  error: {
    type: MessageType.Error,
    text: 'Something went wrong fetching categories.'
  },
  emptySearch: {
    type: MessageType.EmptySearch,
    text: 'No such category was found. Try changing the search criteria or add a new category.',
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

export const DEFAULT_FETCH_LIMIT = 130

export const DEFAULT_WORD_SORT = {
  column: 'word',
  direction: 'asc'
}
