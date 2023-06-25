import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateSerieDTO,
    GetSeriesByCriteriaResponse,
    SerieRepository,
} from '../../application/repositories/serie.repository'

export const serieHttpRepository = (
    httpHandler: HttpHandler,
    sessionManager: SessionManager,
    cancelHandler: CancelHandler,
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

    const getSeriesEpisodesGreaterThanAverage = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetSeriesByCriteriaResponse
        >({
            url: '/serie/episodes/greater/average',
            headers: {
                auth: sessionManager.getSession()!,
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    return {
        create,
        getSeriesEpisodesGreaterThanAverage,
    }
}
