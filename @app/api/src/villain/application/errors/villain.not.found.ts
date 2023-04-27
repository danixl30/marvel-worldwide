import { ApplicationError } from 'src/core/application/error/application.error'

export const VILLAIN_NOT_FOUND = 'VILLAIN_NOT_FOUND'
export class VillainNotFoundError extends ApplicationError {
    constructor() {
        super('Villain not found', VILLAIN_NOT_FOUND)
    }
}
