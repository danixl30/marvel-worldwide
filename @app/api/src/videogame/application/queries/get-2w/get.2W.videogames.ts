import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetVideogames2WResponse } from './types/response'
import { VideogameRepository } from '../../repositories/videogame.repository'

export class GetVideogames2WQuery
    implements
        ApplicationService<
            undefined,
            GetVideogames2WResponse,
            ApplicationError
        >
{
    constructor(private readonly videogameRepository: VideogameRepository) {}

    async execute(): Promise<
        Result<GetVideogames2WResponse, ApplicationError>
    > {
        const videogames =
            await this.videogameRepository.getAtLeast2WeeksNearRelease()
        return Result.success(
            videogames.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                rating: e.rating,
                platforms: e.platforms.map((e) => e.value),
            })),
        )
    }
}
