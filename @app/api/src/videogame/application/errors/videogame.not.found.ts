import { ApplicationError } from 'src/core/application/error/application.error'

export const VIDEOGAME_NOT_FOUND = 'VIDEOGAME_NOT_FOUND'
export class VideogameNotFoundError extends ApplicationError {
    constructor() {
        super('Videogame not found', VIDEOGAME_NOT_FOUND)
    }
}
