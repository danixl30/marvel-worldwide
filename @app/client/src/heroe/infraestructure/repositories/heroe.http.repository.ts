import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateHeroeDTO,
    GetHeroeByIdResponse,
    GetHeroesByCriteriaResponse,
    GetHeroesThatHaveArtificialPowersAndLeaderResponse,
    GetTop5MoreUsedObjectsResponse,
    HeroeList,
    HeroeRepository,
    ModifyHeroeDTO,
    ObjectList,
    PowerList,
} from '../../application/repositories/heroe.repository'

export const heroeHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
    cancelHandler: CancelHandler,
): HeroeRepository => {
    const create = async (data: CreateHeroeDTO) => {
        const { job } = httpHandler.post({
            url: '/heroe/create',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const modify = async (data: ModifyHeroeDTO) => {
        const { job } = httpHandler.put({
            url: '/heroe/modify',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const getAll = async () => {
        const { job, cancel } = httpHandler.get<unknown, HeroeList[]>({
            url: '/heroe/all',
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
        const { job, cancel } = httpHandler.get<unknown, GetHeroeByIdResponse>({
            url: '/heroe/details/' + id,
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
            GetHeroesByCriteriaResponse
        >({
            url: '/heroe/criteria',
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

    const getAllPowers = async () => {
        const { job, cancel } = httpHandler.get<unknown, PowerList[]>({
            url: '/heroe/power/all',
            headers: {
                auth: session.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getAllObjects = async () => {
        const { job, cancel } = httpHandler.get<unknown, ObjectList[]>({
            url: '/heroe/object/all',
            headers: {
                auth: session.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getHeroesWithArtificialPowersAndLeader = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetHeroesThatHaveArtificialPowersAndLeaderResponse
        >({
            url: '/heroe/artificial/powers/leader',
            headers: {
                auth: session.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }
    const getTop5MoreUsedObjects = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetTop5MoreUsedObjectsResponse
        >({
            url: '/heroe/top5/use/objects',
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
        getAllPowers,
        getAllObjects,
        getHeroesWithArtificialPowersAndLeader,
        getTop5MoreUsedObjects,
        getById,
        getByCriteria,
        modify,
    }
}
