import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'

export type CreateVideogameDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    type: string
    platforms: string[]
    comic: string
    actors: {
        id: string
        name: {
            firstName: string
            lastName: string
        }
        role: string
        character: {
            id: string
            name: string
            kind: string
        }
    }[]
    organizations: {
        id: string
        participationType: string
    }[]
}

export type GetVideogameByIdResponse = {
    id: string
    title: string
    synopsis: string
    release: Date
    creator: string
    type: string
    platforms: string[]
    comic: string
    actors: {
        name: {
            firstName: string
            lastName: string
        }
        role: string
        character: {
            id: string
            name: string
        }
    }[]
    rating: number
    rates: {
        id: string
        calification: number
    }[]
    organizations: {
        id: string
        name: string
        participationType: string
    }[]
    history: string
}

export type GetVideogamesByCriteriaResponse = {
    id: string
    title: string
    synopsis: string
    platforms: string[]
    rating: number
}[]

export type GetVideogamesTrendingResponse = GetVideogamesByCriteriaResponse

export type GetVideogamesTop10HistoryResponse = GetVideogamesByCriteriaResponse

export type GetVideogames2WResponse = GetVideogamesByCriteriaResponse

export type ModifyVideogameDTO = {
    id: string
    title?: string
    synopsis?: string
    release?: Date
    creator?: string
    type?: string
    platforms?: string[]
    comic?: string
    actors: {
        name: {
            firstName: string
            lastName: string
        }
        role: string
        character: {
            id: string
            kind: string
        }
    }[]
    actorsToRemove: string[]
    organizations: {
        id: string
        participationType: string
    }[]
    organizationsToRemove: {
        id: string
        participationType: string
    }[]
}

export type VideogameRepository = {
    create(data: CreateVideogameDTO): Promise<void>
    getById(id: string): Promise<GetVideogameByIdResponse>
    getTrending(): Promise<GetVideogamesTrendingResponse>
    getByCriteria(
        dto: GetByCriteriaDTO,
    ): Promise<GetVideogamesByCriteriaResponse>
    getTop10History(): Promise<GetVideogamesTop10HistoryResponse>
    getLast2Weeks(): Promise<GetVideogames2WResponse>
    modify(data: ModifyVideogameDTO): Promise<void>
}
