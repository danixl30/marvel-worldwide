import { ApplicationError } from 'src/core/application/error/application.error'

export const ORGANIZATION_NOT_FOUND = 'ORGANIZATION_NOT_FOUND'
export class OrganizationNotFoundError extends ApplicationError {
    constructor() {
        super('Organization not found', ORGANIZATION_NOT_FOUND)
    }
}
