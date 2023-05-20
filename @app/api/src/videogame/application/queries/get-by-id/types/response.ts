export type GetVideogameByIdResponse = {
    id: string
    title: string
    synopsis: string
    release: Date
    creator: string
    type: string
    platforms: string[]
    comic: {
        id: string
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
}
