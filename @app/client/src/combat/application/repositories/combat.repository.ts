export type CreateCombatDTO = {
    date: Date
    place: string
    characters: {
        id: string
        kind: string
        powers: string[]
        objects: string[]
    }[]
}

export type CombatRepository = {
    create(data: CreateCombatDTO): Promise<void>
}
