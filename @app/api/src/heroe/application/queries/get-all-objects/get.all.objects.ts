import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetAllObjectsResponse } from './types/response'

export class GetAllObjectsQuery
    implements
        ApplicationService<undefined, GetAllObjectsResponse, ApplicationError>
{
    constructor(private readonly heroeRepository: HeroeRepository) {}

    async execute(): Promise<Result<GetAllObjectsResponse, ApplicationError>> {
        const objects = await this.heroeRepository.getAllObjects()
        return Result.success(
            objects.map((e) => ({
                id: e.id.value,
                name: e.name.value,
            })),
        )
    }
}
