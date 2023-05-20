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
    director: {
        firstName: string
        lastName: string
    }
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
}
