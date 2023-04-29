import { ApplicationService } from 'src/core/application/service/application.service'
import { GetSerieByIdDTO } from './types/dto'
import { GetSerieByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { SerieNotFoundError } from '../../errors/serie.not.found'

export class GetSerieByIdQuery
    implements
        ApplicationService<
            GetSerieByIdDTO,
            GetSerieByIdResponse,
            ApplicationError
        >
{
    constructor(private readonly serieRepository: SerieRepository) {}

    async execute(
        data: GetSerieByIdDTO,
    ): Promise<Result<GetSerieByIdResponse, ApplicationError>> {
        const serie = await this.serieRepository.getById(new SerieId(data.id))
        if (!serie) return Result.error(new SerieNotFoundError())
        return Result.success({
            id: serie.id.value,
            title: serie.title.value,
            synopsis: serie.synopsis.value,
            creator: serie.creator.value,
            release: serie.release.value,
            type: serie.type.value,
            episodes: serie.episodes.value,
            channel: serie.channel.value,
            comic: {
                id: serie.basedOn.id.value,
                title: serie.basedOn.title.value,
                volumen: serie.basedOn.volumen.value,
                author: serie.basedOn.author,
            },
            actors: serie.actors.map((e) => ({
                id: e.id.value,
                name: e.name,
                role: e.role.value,
                character: e.character.value,
            })),
            rating: serie.rating.value,
        })
    }
}
