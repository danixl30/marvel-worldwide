import { ApplicationError } from 'src/core/application/error/application.error'

export const COMBAT_NOT_FOUND = 'COMBAT_NOT_FOUND'
export class CombatNotFoundError extends ApplicationError {
    constructor() {
        super('Combat not found', COMBAT_NOT_FOUND)
    }
}
