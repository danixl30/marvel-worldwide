import { ApplicationError } from 'src/core/application/error/application.error'

export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND'
export class ProfileNotFoundError extends ApplicationError {
    constructor() {
        super('Profile not found', PROFILE_NOT_FOUND)
    }
}
