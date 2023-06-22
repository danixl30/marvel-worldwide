import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VillainRepository } from '../../repositories/villain.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetAllVillainsResponse } from './types/response'

export class GetAllVillainsQuery
    implements
        ApplicationService<undefined, GetAllVillainsResponse, ApplicationError>
{
    constructor(private readonly villainRepository: VillainRepository) {}

    async execute(): Promise<Result<GetAllVillainsResponse, ApplicationError>> {
        const villains = await this.villainRepository.getAll()
        return Result.success(
            villains.map((e) => ({
                id: e.id.value,
                name: e.name.value,
            })),
        )
    }
}
