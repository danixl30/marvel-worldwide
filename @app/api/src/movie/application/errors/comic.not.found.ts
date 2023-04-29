import { ApplicationError } from 'src/core/application/error/application.error'

export const COMIC_NOT_FOUND = 'COMIC_NOT_FOUND'
export class ComicNotFoundError extends ApplicationError {
    constructor() {
        super('Comic not found', COMIC_NOT_FOUND)
    }
}
