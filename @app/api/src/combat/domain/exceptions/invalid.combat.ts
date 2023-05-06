import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_COMBAT = 'INVALID_COMBAT'
export class InvalidCombatException extends DomainError {
    constructor() {
        super('Invalid combat', INVALID_COMBAT)
    }
}
