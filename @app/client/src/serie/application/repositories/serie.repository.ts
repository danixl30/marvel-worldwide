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

export type SerieRepository = {
    create(data: CreateSerieDTO): Promise<void>
    getSeriesEpisodesGreaterThanAverage(): Promise<GetSeriesByCriteriaResponse>
}
