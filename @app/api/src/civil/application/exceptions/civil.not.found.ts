import { ApplicationError } from 'src/core/application/error/application.error'

export const CIVIL_NOT_FOUND = 'CIVIL_NOT_FOUND'
export class CivilNotFoundError extends ApplicationError {
    constructor() {
        super('Civil not found', CIVIL_NOT_FOUND)
    }
}
