import { HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CombatRepository,
    CreateCombatDTO,
} from '../../application/repositories/combat.repository'

export const combatHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
): CombatRepository => {
    const create = async (data: CreateCombatDTO) => {
        const { job } = httpHandler.post({
            url: '/comabt/create',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })
        await job()
    }

    return {
        create,
    }
}
