import { DomainError } from 'src/core/domain/error/domain.error'

export const INVALID_SERIE = 'INVALID_SERIE'
export class InvalidSerieException extends DomainError {
    constructor() {
        super('Invalid serie', INVALID_SERIE)
    }
}
