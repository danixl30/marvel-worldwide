import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { HeroeRepository } from '../../repositories/heroe.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetAllHeroesResponse } from './types/response'

export class GetAllHeroesQuery
    implements
        ApplicationService<undefined, GetAllHeroesResponse, ApplicationError>
{
    constructor(private readonly heroeRepository: HeroeRepository) {}

    async execute(): Promise<Result<GetAllHeroesResponse, ApplicationError>> {
        const heroes = await this.heroeRepository.getAll()
        return Result.success(
            heroes.map((e) => ({
                id: e.id.value,
                name: e.name.value,
            })),
        )
    }
}
