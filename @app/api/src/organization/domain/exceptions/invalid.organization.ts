import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_ORGANIZATION = 'INVALID_ORGANIZATION'
export class InvalidOrganizationException extends DomainError {
    constructor() {
        super('Invalid organization', INVALID_ORGANIZATION)
    }
}
