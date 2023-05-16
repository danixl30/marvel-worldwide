import { ApplicationService } from 'src/core/application/service/application.service'
import { GetVideogamesTrendingDTO } from './types/dto'
import { GetVideogamesTrendingResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VideogameRepository } from '../../repositories/videogame.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetVideogamesByCriterioResponse } from '../get-by-criteria/types/response'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export class GetVideogamesTrendingQuery
    implements
        ApplicationService<
            GetVideogamesTrendingDTO,
            GetVideogamesTrendingResponse,
            ApplicationError
        >
{
    constructor(private readonly videogameRepository: VideogameRepository) {}

    async execute(
        data: GetVideogamesTrendingDTO,
    ): Promise<Result<GetVideogamesByCriterioResponse, ApplicationError>> {
        const videogames = await this.videogameRepository.getTrending(
            new ProfileId(data.profileId),
        )
        return Result.success(
            videogames.map((e) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                platforms: e.platforms.map((e) => e.value),
                rating: e.rating,
            })),
        )
    }
}
