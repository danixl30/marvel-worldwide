import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'

export type CreateSerieDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    episodes: number
    type: string
    channel: string
    comic: string
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
    organizations: {
        id: string
        participationType: string
    }[]
}

export type GetSeriesByCriteriaResponse = {
    id: string
    title: string
    synopsis: string
    episodes: number
    rating: number
}[]

export type GetSerieByIdResponse = {
    id: string
    title: string
    synopsis: string
    release: Date
    creator: string
    episodes: number
    type: string
    channel: string
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
    rates: {
        id: string
        calification: number
    }[]
    rating: number
    organizations: {
        id: string
        name: string
        participationType: string
    }[]
    history: string
}

export type GetSeriesTrendigResponse = GetSeriesByCriteriaResponse

export type GetSeriesTop10HistoryResponse = GetSeriesByCriteriaResponse

export type GetSeries2WResponse = GetSeriesByCriteriaResponse

export type ModifySerieDTO = {
    id: string
    title?: string
    synopsis?: string
    release?: Date
    creator?: string
    episodes?: number
    type?: string
    channel?: string
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

export type SerieRepository = {
    create(data: CreateSerieDTO): Promise<void>
    getSeriesEpisodesGreaterThanAverage(): Promise<GetSeriesByCriteriaResponse>
    getById(id: string): Promise<GetSerieByIdResponse>
    getTrending(): Promise<GetSeriesTrendigResponse>
    getByCriteria(dto: GetByCriteriaDTO): Promise<GetSeriesByCriteriaResponse>
    getTop10History(): Promise<GetSeriesTop10HistoryResponse>
    getLast2Weeks(): Promise<GetSeries2WResponse>
    modify(data: ModifySerieDTO): Promise<void>
}
