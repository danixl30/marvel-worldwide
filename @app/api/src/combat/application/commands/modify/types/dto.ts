export type ModifyCombatDTO = {
    id: string
    date?: Date
    place?: string
    charactersToAdd: {
        id: string
        kind: string
        powers: string[]
        objects: string[]
    }[]
    charactersToRemove: {
        id: string
        kind: string
    }[]
}
