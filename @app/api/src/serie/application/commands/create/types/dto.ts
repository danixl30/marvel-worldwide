export type CreateSerieDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    episodes: number
    type: string
    channel: string
    comicId?: string
    comic?: {
        title: string
        volumen: number
        author: {
            firstName: string
            lastName: string
        }
    }
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
