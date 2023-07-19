import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'

export type CreateMovieDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    duration: {
        hours: number
        minutes: number
        seconds: number
    }
    type: string
    cost: {
        cost: number
        earning: number
    }
    directorName: string
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
            kind: string
        }
    }[]
    organizations: {
        id: string
        participationType: string
    }[]
}

export type GetMovieByIdResponse = {
    id: string
    title: string
    synopsis: string
    release: Date
    creator: string
    duration: {
        hours: number
        minutes: number
        seconds: number
    }
    type: string
    cost: {
        cost: number
        earning: number
    }
    directorName: string
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

export type GetMoviesByCriteriaResponse = {
    id: string
    title: string
    synopsis: string
    rating: number
}[]

export type GetMoviesTrendingResponse = GetMoviesByCriteriaResponse

export type GetMoviesTop10HistoryResponse = GetMoviesByCriteriaResponse

export type GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse =
    GetMoviesByCriteriaResponse

export type GetMovies2WResponse = GetMoviesByCriteriaResponse

export type ModifyMovieDTO = {
    id: string
    title?: string
    synopsis?: string
    release?: Date
    creator?: string
    duration?: {
        hours: number
        minutes: number
        seconds: number
    }
    type?: string
    cost?: {
        cost: number
        earning: number
    }
    directorName?: string
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

export type MovieRepository = {
    create(data: CreateMovieDTO): Promise<void>
    getById(id: string): Promise<GetMovieByIdResponse>
    getTrending(): Promise<GetMoviesTrendingResponse>
    getByCriteria(dto: GetByCriteriaDTO): Promise<GetMoviesByCriteriaResponse>
    getTop10History(): Promise<GetMoviesTop10HistoryResponse>
    getMovies2HAnimated(): Promise<GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse>
    getLast2Weeks(): Promise<GetMovies2WResponse>
    modify(data: ModifyMovieDTO): Promise<void>
}
