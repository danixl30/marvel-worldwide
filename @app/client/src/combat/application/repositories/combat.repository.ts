import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import {
    ObjectDTO,
    PowerDTO,
} from '../../../heroe/application/repositories/heroe.repository'

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

export type GetCombatsByCriteriaResponse = {
    id: string
    date: Date
    place: string
    characters: {
        id: string
        name: string
    }[]
}[]

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

export type CombatRepository = {
    create(data: CreateCombatDTO): Promise<void>
    getTop3Locations(): Promise<string[]>
    getById(id: string): Promise<GetCombatByIdResponse>
    getByCriteria(dto: GetByCriteriaDTO): Promise<GetCombatsByCriteriaResponse>
    modify(data: ModifyCombatDTO): Promise<void>
}
