export type CreateCombatDTO = {
    date: Date
    place: string
    characters: {
        id: string
        powers: string[]
        objects: string[]
    }[]
}
