import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateVillainDTO,
    GetVillainsThatHaveArtificialPowersAndLeaderResponse,
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

    return {
        create,
        getAll,
        getVillainsWithArtificialPowersAndLeader,
    }
}
