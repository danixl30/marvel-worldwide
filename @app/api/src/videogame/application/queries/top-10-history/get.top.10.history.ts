import { ApplicationService } from 'src/core/application/service/application.service'
import { GetTop10HistoryDTO } from './types/dto'
import { GetTop10HistoryResponse } from './types/response'
import { VideogameRepository } from '../../repositories/videogame.repository'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { GetVideogamesByCriterioResponse } from '../get-by-criteria/types/response'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'

export class GetVideogamesTop10HistoryQuery
    implements
        ApplicationService<
            GetTop10HistoryDTO,
            GetTop10HistoryResponse,
            ApplicationError
        >
{
    constructor(private videogameRepository: VideogameRepository) {}

    async execute(
        data: GetTop10HistoryDTO,
    ): Promise<Result<GetVideogamesByCriterioResponse, ApplicationError>> {
        const videogames = await this.videogameRepository.getTop10History(
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
