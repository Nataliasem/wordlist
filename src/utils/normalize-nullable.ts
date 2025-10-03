import { Word, WordKeys } from '@/types'

export const normalizeNullable = (obj: Word, exceptionFields: WordKeys[]): Word => {
  for (const key in obj) {
    if(!exceptionFields.includes(key as WordKeys) && (typeof obj[key] === 'undefined' || obj[key] === null)) {
      obj[key] = ''
    }
  }

  return obj
}


