export type GetSerieByIdResponse = {
    id: string
    title: string
    synopsis: string
    release: Date
    creator: string
    episodes: number
    type: string
    channel: string
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
        character: string
    }[]
    rating: number
}
