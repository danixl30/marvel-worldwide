import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateVideogameDTO,
    GetVideogameByIdResponse,
    GetVideogames2WResponse,
    GetVideogamesByCriteriaResponse,
    GetVideogamesTop10HistoryResponse,
    GetVideogamesTrendingResponse,
    ModifyVideogameDTO,
    VideogameRepository,
} from '../../application/repositories/videogame.repository'

export const videogameHttpRepository = (
    httpHandler: HttpHandler,
    sessionManager: SessionManager,
    cancelHandler: CancelHandler,
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

    const modify = async (data: ModifyVideogameDTO) => {
        const { job } = httpHandler.put({
            url: '/videogame/modify',
            headers: {
                auth: sessionManager.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const getById = async (id: string) => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetVideogameByIdResponse
        >({
            url: '/videogame/detail/' + id,
            headers: {
                auth: sessionManager.getSession() || '',
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
            GetVideogamesByCriteriaResponse
        >({
            url: '/videogame/criteria',
            headers: {
                auth: sessionManager.getSession() || '',
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
            GetVideogamesTrendingResponse
        >({
            url: '/videogame/trending',
            headers: {
                auth: sessionManager.getSession() || '',
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
            GetVideogamesTop10HistoryResponse
        >({
            url: '/videogame/top/10/history',
            headers: {
                auth: sessionManager.getSession() || '',
                profile: sessionManager.getProfile() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getLast2Weeks = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetVideogames2WResponse
        >({
            url: '/videogame/2w',
            headers: {
                auth: sessionManager.getSession() || '',
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
        getById,
        getTrending,
        getByCriteria,
        getTop10History,
        getLast2Weeks,
        modify,
    }
}
