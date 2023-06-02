import { Optional } from '@mono/types-utils'

export type SessionManager = {
    getSession: () => Optional<string>
    createSession: (data: string) => void
    deleteSession: () => void
}
