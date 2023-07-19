import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CombatRepository,
    CreateCombatDTO,
    GetCombatByIdResponse,
    GetCombatsByCriteriaResponse,
    ModifyCombatDTO,
} from '../../application/repositories/combat.repository'

export const combatHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
    cancelHandler: CancelHandler,
): CombatRepository => {
    const create = async (data: CreateCombatDTO) => {
        const { job } = httpHandler.post({
            url: '/combat/create',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const modify = async (data: ModifyCombatDTO) => {
        const { job } = httpHandler.put({
            url: '/combat/modify',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const getTop3Locations = async () => {
        const { job, cancel } = httpHandler.get<unknown, string[]>({
            url: '/combat/top3/places',
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
        const { job, cancel } = httpHandler.get<unknown, GetCombatByIdResponse>(
            {
                url: '/combat/detail/' + id,
                headers: {
                    auth: session.getSession() || '',
                },
            },
        )
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getByCriteria = async (dto: GetByCriteriaDTO) => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetCombatsByCriteriaResponse
        >({
            url: '/combat/criteria',
            headers: {
                auth: session.getSession() || '',
            },
            queries: dto,
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    return {
        create,
        getTop3Locations,
        getById,
        getByCriteria,
        modify,
    }
}
