import { ApplicationError } from 'src/core/application/error/application.error'

export const HEADQUARTER_NOT_FOUND = 'HEADQUARTER_NOT_FOUND'
export class HeadquarterNotFoundError extends ApplicationError {
    constructor() {
        super('Headquarter not found', HEADQUARTER_NOT_FOUND)
    }
}
