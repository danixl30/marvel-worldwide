export type GetCombatByIdResponse = {
    id: string
    date: Date
    place: string
    characters: {
        id: string
        powers: string[]
        objects: string[]
    }[]
}
