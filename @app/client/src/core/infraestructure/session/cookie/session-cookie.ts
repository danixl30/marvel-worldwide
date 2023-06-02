import Cookies from 'js-cookie'
import { SessionManager } from '../../../application/session/session.manager'

const SESSION_KEY = 'session'
export const useCookieSession = (): SessionManager => {
    const getSession = () => Cookies.get(SESSION_KEY)

    const createSession = (data: string) => {
        if (getSession()) throw new Error('Session already in use')
        Cookies.set(SESSION_KEY, data, {
            sameSite: 'strict',
        })
    }

    const deleteSession = () => Cookies.remove(SESSION_KEY)

    return {
        getSession,
        createSession,
        deleteSession,
    }
}
