import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import { CreateUserDTO } from '../../application/services/dto/create.user.dto'
import { LoginDTO } from '../../application/services/dto/login'
import { User } from '../../application/services/dto/user'
import { UserRepository } from '../../application/user.repository'

export const userHttpRepository = (
    http: HttpHandler,
    sessionManager: SessionManager,
    cancelHandler: CancelHandler,
): UserRepository => {
    const login = async (data: LoginDTO) => {
        const { job } = http.post<
            LoginDTO,
            {
                token: string
            }
        >({
            url: '/user/login',
            body: data,
        })
        const resp = await job()
        sessionManager.createSession(resp.body.token)
    }

    const create = async (data: CreateUserDTO) => {
        const { job } = http.post<CreateUserDTO, unknown>({
            url: '/user/create',
            body: data,
        })
        await job()
    }

    const deleteUser = async () => {
        const { job } = http.delete({
            url: '/user',
            headers: {
                auth: sessionManager.getSession() || '',
            },
        })
        await job()
    }

    const getDetails = async () => {
        const { job, cancel } = http.get<unknown, User>({
            url: '/user/details',
            headers: {
                auth: sessionManager.getSession() || '',
            },
        })
        cancelHandler.subscribeCancel(cancel)
        const data = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return data.body
    }

    return {
        login,
        create,
        delete: deleteUser,
        getDetails,
    }
}
