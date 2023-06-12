import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import { ProfileRepository } from '../../application/profile.repository'
import { CreateProfileDTO } from '../../application/services/dto/create.profile'
import { Profile } from '../../application/services/dto/profile'
import { GetProfilesResponse } from '../../application/services/dto/profile.list'

export const profileHttpRepository = (
    http: HttpHandler,
    sessionManager: SessionManager,
    cancelHandler: CancelHandler,
): ProfileRepository => {
    const create = async (data: CreateProfileDTO) => {
        const { job } = http.post<CreateProfileDTO, unknown>({
            url: '/user/add/profile',
            headers: {
                auth: sessionManager.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    const getProfiles = async () => {
        const { job, cancel } = http.get<unknown, GetProfilesResponse>({
            url: '/user/profiles',
            headers: {
                auth: sessionManager.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const data = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return data.body
    }

    const getDetails = async () => {
        const { job, cancel } = http.get<unknown, Profile>({
            url: '/profile/detail',
            headers: {
                auth: sessionManager.getSession() || '',
                profile: sessionManager.getProfile() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const data = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return data.body
    }
    return {
        create,
        getDetails,
        getProfiles,
    }
}
