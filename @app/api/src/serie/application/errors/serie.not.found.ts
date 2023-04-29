import { ApplicationError } from 'src/core/application/error/application.error'

export const SERIE_NOT_FOUND = 'SERIE_NOT_FOUND'
export class SerieNotFoundError extends ApplicationError {
    constructor() {
        super('Serie not found', SERIE_NOT_FOUND)
    }
}
