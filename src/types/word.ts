import { Category } from './category'

export interface Word {
    id: number | null
    word: string
    transcription: string
    translation: string
    definition: string
    examples: string[]
    category: Category | null
}
