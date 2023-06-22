import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CivilRepository } from '../../repositories/civil.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetAllCivilsResponse } from './types/response'

export class GetAllCivilsQuery
    implements
        ApplicationService<undefined, GetAllCivilsResponse, ApplicationError>
{
    constructor(private readonly civilRepository: CivilRepository) {}

    async execute(): Promise<Result<GetAllCivilsResponse, ApplicationError>> {
        const civils = await this.civilRepository.getAll()
        return Result.success(
            civils.map((e) => ({
                id: e.id.value,
                name: e.person.name.firstName + ' ' + e.person.name.lastName,
            })),
        )
    }
}
