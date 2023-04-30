import { ApplicationService } from 'src/core/application/service/application.service'
import { GetTop5MoreUsedObjectsResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetTop5MoreUsedObjectsQuery
    implements
        ApplicationService<
            undefined,
            GetTop5MoreUsedObjectsResponse,
            ApplicationError
        >
{
    constructor(private readonly heroeRepository: HeroeRepository) {}

    async execute(): Promise<
        Result<GetTop5MoreUsedObjectsResponse, ApplicationError>
    > {
        const objects = await this.heroeRepository.getTop5MoreUsedObjects()
        return Result.success(
            objects.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                type: e.kind.value,
                creator: e.creator.value,
                material: e.material.value,
            })),
        )
    }
}
