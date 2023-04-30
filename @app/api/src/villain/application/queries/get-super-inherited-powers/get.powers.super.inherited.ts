import { ApplicationService } from 'src/core/application/service/application.service'
import { GetSuperInheritedPowersResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VillainRepository } from '../../repositories/villain.repository'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetSuperInheritedPowersQuery
    implements
        ApplicationService<
            undefined,
            GetSuperInheritedPowersResponse,
            ApplicationError
        >
{
    constructor(private readonly villainRepository: VillainRepository) {}

    async execute(): Promise<
        Result<GetSuperInheritedPowersResponse, ApplicationError>
    > {
        const powers =
            await this.villainRepository.getSuperInheritedPowersUsedAtLeast2()
        return Result.success(
            powers.map((e) => ({
                id: e.id.value,
                name: e.name.value,
                description: e.description.value,
                type: e.type.value,
            })),
        )
    }
}
