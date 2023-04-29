import { ApplicationError } from 'src/core/application/error/application.error'

export const MOVIE_NOT_FOUND = 'MOVIE_NOT_FOUND'
export class MovieNotFoundError extends ApplicationError {
    constructor() {
        super('Movie not found', MOVIE_NOT_FOUND)
    }
}
