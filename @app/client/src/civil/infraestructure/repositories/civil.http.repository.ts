import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CivilList,
    CivilRepository,
    CreateCivilDTO,
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

    return {
        create,
        getAll,
    }
}
