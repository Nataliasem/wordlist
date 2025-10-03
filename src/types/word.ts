import { Category } from './category'
import { QueryParams } from "@/types/common";

export interface Word {
    id: number | null
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
