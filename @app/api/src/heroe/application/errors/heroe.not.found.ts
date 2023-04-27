import { ApplicationError } from 'src/core/application/error/application.error'

export const HEROE_NOT_FOUND = 'HEROE_NOT_FOUND'
export class HeroeNotFoundError extends ApplicationError {
    constructor() {
        super('Heroe not found', HEROE_NOT_FOUND)
    }
}
