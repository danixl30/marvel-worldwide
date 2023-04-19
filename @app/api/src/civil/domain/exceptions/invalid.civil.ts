import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_CIVIL = 'INVALID_CIVIL'
export class InvalidCivilException extends DomainError {
    constructor() {
        super('Invalid civil', INVALID_CIVIL)
    }
}
