export type CreateVideogameDTO = {
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
        character: string
    }[]
    organizations: {
        id: string
        participationType: string
    }[]
}
