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
        character: string
    }[]
    organizations: {
        id: string
        participationType: string
    }[]
}
