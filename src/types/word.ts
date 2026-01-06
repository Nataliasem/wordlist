import { Category } from './category'
import { NumId, QueryParams } from '@/types'

export interface Word {
    id: NumId
    word: string
    transcription: string
    translation: string
    definition: string
    examples: string[]
    category: Category | null
}

export interface UpdatedWord extends Omit<Word, 'id' | 'category'> {
    id?: NumId
    category: number | null
}

export type WordStringKeys = 'word' | 'transcription' | 'translation' | 'definition'

export interface WordQueryParams extends QueryParams {
   word?: string
}
