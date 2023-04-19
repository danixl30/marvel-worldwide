import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_VILLAIN = 'INVALID_VILLAIN'
export class InvalidVillainException extends DomainError {
    constructor() {
        super('Invalid villain', INVALID_VILLAIN)
    }
}
