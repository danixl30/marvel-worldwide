import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_PROFILE = 'INVALID_PROFILE'
export class InvalidProfileException extends DomainError {
    constructor() {
        super('Inavalid profile', INVALID_PROFILE)
    }
}
