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
    director: {
        firstName: string
        lastName: string
    }
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
}
