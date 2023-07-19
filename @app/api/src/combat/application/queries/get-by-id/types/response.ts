import {
    ObjectDTO,
    PowerDTO,
} from 'src/heroe/application/commands/create/types/dto'

export type GetCombatByIdResponse = {
    id: string
    date: Date
    place: string
    characters: {
        id: string
        name: string
        kind: string
        objects: ({ id: string } & ObjectDTO)[]
        powers: ({ id: string } & PowerDTO)[]
    }[]
}
