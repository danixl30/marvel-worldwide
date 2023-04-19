import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_MOVIE = 'INVALID_MOVIE'
export class InvalidMovieException extends DomainError {
    constructor() {
        super('Invalid movie', INVALID_MOVIE)
    }
}
