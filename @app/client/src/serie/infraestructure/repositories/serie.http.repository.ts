import { HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateSerieDTO,
    SerieRepository,
} from '../../application/repositories/serie.repository'

export const serieHttpRepository = (
    httpHandler: HttpHandler,
    sessionManager: SessionManager,
): SerieRepository => {
    const create = async (data: CreateSerieDTO) => {
        const { job } = httpHandler.post({
            url: '/serie/create',
            headers: {
                auth: sessionManager.getSession()!,
            },
            body: data,
        })
        await job()
    }

    return {
        create,
    }
}
