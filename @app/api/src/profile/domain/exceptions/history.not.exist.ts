import { DomainError } from 'src/core/domain/error/domain.error'

export const HISTORY_NOT_EXIST = 'HISTORY_NOT_EXIST'
export class HistoryNotExistException extends DomainError {
    constructor() {
        super('History not exist', HISTORY_NOT_EXIST)
    }
}
