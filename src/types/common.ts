export type NumId = number | null

export interface QueryParams {
    sortColumn: string
    sortDirection: string
    limit: number
    offset: number
}

export interface TableRow {
    id: number | string
    [key: string]: unknown
}
