import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateOrganizationDTO,
    HeadquarterList,
    OrganizationList,
    OrganizationRepository,
} from '../../applications/organization.repository'

export const organizationHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
    cancelHandler: CancelHandler,
): OrganizationRepository => {
    const create = async (data: CreateOrganizationDTO) => {
        const { job } = httpHandler.post({
            url: '/organization/create',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const getAll = async () => {
        const { job, cancel } = httpHandler.get<unknown, OrganizationList[]>({
            url: '/organization/all',
            headers: {
                auth: session.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getAllHeadquarters = async () => {
        const { job, cancel } = httpHandler.get<unknown, HeadquarterList[]>({
            url: '/organization/headquarter/all',
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
        getAllHeadquarters,
    }
}
