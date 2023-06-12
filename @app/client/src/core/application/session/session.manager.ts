import { Optional } from '@mono/types-utils'

export type SessionManager = {
    getSession: () => Optional<string>
    createSession: (data: string) => void
    deleteSession: () => void
    getProfile(): Optional<string>
    setProfile(data: string): void
    removeProfile(): void
}
