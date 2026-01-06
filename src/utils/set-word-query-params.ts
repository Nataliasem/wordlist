import { WordQueryParams } from '@/types'

type WordQueryParamsKey = keyof WordQueryParams
export const setWordQueryParams = (rawUrl: string, queryParams?: WordQueryParams): string | URL => {
    if (!queryParams) return rawUrl

    const url = new URL(rawUrl)
    const keys = Object.keys(queryParams) as WordQueryParamsKey[]
    keys.forEach(key => {
        if (['', undefined].includes(queryParams[key] as WordQueryParamsKey)) {
            return
        }
        url.searchParams.set(key, queryParams[key] as WordQueryParamsKey)
    })
    return url
}
