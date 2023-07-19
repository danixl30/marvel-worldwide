import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CivilList,
    CivilRepository,
    CreateCivilDTO,
    GetByCriteriaDTO,
    GetCivilByIdResponse,
    GetCivilsByCriteriaResponse,
    ModifyCivilDTO,
} from '../../application/repositories/civil.repository'

export const civilHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
    cancelHandler: CancelHandler,
): CivilRepository => {
    const create = async (data: CreateCivilDTO) => {
        const { job } = httpHandler.post({
            url: '/civil/create',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const modify = async (data: ModifyCivilDTO) => {
        const { job } = httpHandler.put({
            url: '/civil/modify',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const getAll = async () => {
        const { job, cancel } = httpHandler.get<unknown, CivilList[]>({
            url: '/civil/all',
            headers: {
                auth: session.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getById = async (id: string) => {
        const { job, cancel } = httpHandler.get<unknown, GetCivilByIdResponse>({
            url: '/civil/detail/' + id,
            headers: {
                auth: session.getSession() || '',
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
            GetCivilsByCriteriaResponse
        >({
            url: '/civil/criteria',
            headers: {
                auth: session.getSession() || '',
            },
            queries: dto,
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        console.log(resp.body)
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    return {
        create,
        getAll,
        getById,
        getByCriteria,
        modify,
    }
}
