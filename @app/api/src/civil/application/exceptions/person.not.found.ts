import { ApplicationError } from 'src/core/application/error/application.error'

export const PERSON_NOT_FOUND = 'PERSON_NOT_FOUND'
export class PersonNotFoundError extends ApplicationError {
    constructor() {
        super('Person not found', PERSON_NOT_FOUND)
    }
}
