import { Category } from './category'
import { NumId, QueryParams } from '@/types/common'

export interface Word {
    id: NumId
    word: string
    transcription: string
    translation: string
    definition: string
    examples: string[]
    category: Category | null
}

export type WordKeys = keyof Word

export interface WordQueryParams extends QueryParams {
   word: string
}
