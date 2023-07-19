import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateVillainDTO,
    GetSuperInheritedPowersResponse,
    GetVillainByIdResponse,
    GetVillainsByCriteriaResponse,
    GetVillainsThatHaveArtificialPowersAndLeaderResponse,
    ModifyVillainDTO,
    VillainList,
    VillainRepository,
} from '../../application/repositories/villain.repository'

export const villainHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
    cancelHandler: CancelHandler,
): VillainRepository => {
    const create = async (data: CreateVillainDTO) => {
        const { job } = httpHandler.post({
            url: '/villain/create',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const modify = async (data: ModifyVillainDTO) => {
        const { job } = httpHandler.put({
            url: '/villain/modify',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const getAll = async () => {
        const { job, cancel } = httpHandler.get<unknown, VillainList[]>({
            url: '/villain/all',
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
        const { job, cancel } = httpHandler.get<
            unknown,
            GetVillainByIdResponse
        >({
            url: '/villain/detail/' + id,
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
            GetVillainsByCriteriaResponse
        >({
            url: '/villain/criteria',
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

    const getVillainsWithArtificialPowersAndLeader = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetVillainsThatHaveArtificialPowersAndLeaderResponse
        >({
            url: '/villain/artificial/powers/leader',
            headers: {
                auth: session.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getSuperPowers = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetSuperInheritedPowersResponse
        >({
            url: '/villain/super/artificial/powers',
            headers: {
                auth: session.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    return {
        create,
        getAll,
        getVillainsWithArtificialPowersAndLeader,
        getById,
        getByCriteria,
        getSuperPowers,
        modify,
    }
}
