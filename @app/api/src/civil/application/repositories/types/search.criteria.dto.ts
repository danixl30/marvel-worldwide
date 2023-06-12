export type SearchByCriteriaDTO = {
    term: string
    pagination?: {
        page: number
        limit: number
    }
}
