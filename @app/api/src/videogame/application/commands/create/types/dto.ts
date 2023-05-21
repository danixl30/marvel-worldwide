export type CreateVideogameDTO = {
    title: string
    synopsis: string
    release: Date
    creator: string
    type: string
    comicId?: string
    platforms: string[]
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
