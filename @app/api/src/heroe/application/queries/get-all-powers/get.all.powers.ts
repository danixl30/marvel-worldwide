import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetAllPowersResponse } from './types/response'

export class GetAllPowersQuery
    implements
        ApplicationService<undefined, GetAllPowersResponse, ApplicationError>
{
    constructor(private readonly heroeRepository: HeroeRepository) {}

    async execute(): Promise<Result<GetAllPowersResponse, ApplicationError>> {
        const powers = await this.heroeRepository.getAllPowers()
        return Result.success(
            powers.map((e) => ({
                id: e.id.value,
                name: e.name.value,
            })),
        )
    }
}
