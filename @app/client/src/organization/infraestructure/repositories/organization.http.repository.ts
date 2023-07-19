import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateOrganizationDTO,
    GetOrganizationByIdResponse,
    GetOrganizationsByCriteriaResponse,
    HeadquarterList,
    ModifyOrganizationDTO,
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

    const modify = async (data: ModifyOrganizationDTO) => {
        const { job } = httpHandler.put({
            url: '/organization/modify',
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

    const getById = async (id: string) => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetOrganizationByIdResponse
        >({
            url: '/organization/detail/' + id,
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
            GetOrganizationsByCriteriaResponse
        >({
            url: '/organization/criteria',
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
        getById,
        getByCriteria,
        modify,
    }
}
