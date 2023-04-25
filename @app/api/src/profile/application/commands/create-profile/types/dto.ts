export type CreateProfileDTO = {
    email: string
    userId: string
    language: string
    preferences: {
        kind: string
        platform: string
    }[]
}
