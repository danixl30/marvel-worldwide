export type GetProfileByIdResponse = {
    id: string
    language: string
    email: string
    preferences: {
        id: string
        platform: string
        kind: string
    }[]
    history: {
        id: string
        targetId: string
    }[]
    rates: {
        id: string
        targetId: string
        calification: number
    }[]
}
