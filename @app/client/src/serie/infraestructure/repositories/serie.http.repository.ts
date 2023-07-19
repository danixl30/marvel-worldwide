import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateSerieDTO,
    GetSerieByIdResponse,
    GetSeries2WResponse,
    GetSeriesByCriteriaResponse,
    GetSeriesTop10HistoryResponse,
    GetSeriesTrendigResponse,
    ModifySerieDTO,
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

    const modify = async (data: ModifySerieDTO) => {
        const { job } = httpHandler.put({
            url: '/serie/modify',
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

    const getById = async (id: string) => {
        const { job, cancel } = httpHandler.get<unknown, GetSerieByIdResponse>({
            url: '/serie/detail/' + id,
            headers: {
                auth: sessionManager.getSession()!,
                profile: sessionManager.getProfile() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getByCriteria = async (dto: GetByCriteriaDTO) => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetSeriesByCriteriaResponse
        >({
            url: '/serie/criteria',
            headers: {
                auth: sessionManager.getSession()!,
                profile: sessionManager.getProfile() || '',
            },
            queries: dto,
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getTrending = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetSeriesTrendigResponse
        >({
            url: '/serie/trending',
            headers: {
                auth: sessionManager.getSession()!,
                profile: sessionManager.getProfile() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getTop10History = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetSeriesTop10HistoryResponse
        >({
            url: '/serie/top/10/history',
            headers: {
                auth: sessionManager.getSession()!,
                profile: sessionManager.getProfile() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getLast2Weeks = async () => {
        const { job, cancel } = httpHandler.get<unknown, GetSeries2WResponse>({
            url: '/serie/2w',
            headers: {
                auth: sessionManager.getSession()!,
                profile: sessionManager.getProfile() || '',
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
        getById,
        getTrending,
        getByCriteria,
        getTop10History,
        getLast2Weeks,
        modify,
    }
}
