import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_HEROE = 'INVALID_HEROE'
export class InvalidHeroeException extends DomainError {
    constructor() {
        super('Invalid heroe', INVALID_HEROE)
    }
}
