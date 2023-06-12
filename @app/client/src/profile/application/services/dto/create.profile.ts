export enum MediaType {
    MOVIE = 'MOVIE',
    SERIE = 'SERIE',
    VIDEOGAME = 'VIDEOGAME',
}

export type CreateProfileDTO = {
    email: string
    language: string
    preferences: {
        kind: string
        platform: MediaType
    }[]
}
