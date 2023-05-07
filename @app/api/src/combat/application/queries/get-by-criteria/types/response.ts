export type GetComabtsByCriteriaResponse = {
    id: string
    date: Date
    place: string
    characters: {
        id: string
        powers: string[]
        objects: string[]
    }[]
}[]
