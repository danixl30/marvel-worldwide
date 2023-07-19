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
}
