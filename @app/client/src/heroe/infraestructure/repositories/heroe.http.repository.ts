import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateHeroeDTO,
    HeroeList,
    HeroeRepository,
    ObjectList,
    PowerList,
} from '../../application/repositories/heroe.repository'

export const organizationHttpRepository = (
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

    return {
        create,
        getAll,
        getAllPowers,
        getAllObjects,
    }
}
