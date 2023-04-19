import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_VIDEOGAME = 'INVALID_VIDEOGAME'
export class InvalidVideogameException extends DomainError {
    constructor() {
        super('Invalid videogame', INVALID_VIDEOGAME)
    }
}
