export type GetCombatByIdResponse = {
    id: string
    date: Date
    place: string
    characters: {
        id: string
        name: string
        powers: string[]
        objects: string[]
    }[]
}
