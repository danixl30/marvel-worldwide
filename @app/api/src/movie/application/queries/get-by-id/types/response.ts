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
}
