import { HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateVideogameDTO,
    VideogameRepository,
} from '../../application/repositories/videogame.repository'

export const videogameHttpRepository = (
    httpHandler: HttpHandler,
    sessionManager: SessionManager,
): VideogameRepository => {
    const create = async (data: CreateVideogameDTO) => {
        const { job } = httpHandler.post({
            url: '/videogame/create',
            headers: {
                auth: sessionManager.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    return {
        create,
    }
}
