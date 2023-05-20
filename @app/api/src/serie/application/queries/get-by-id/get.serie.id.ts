import { ApplicationService } from 'src/core/application/service/application.service'
import { GetSerieByIdDTO } from './types/dto'
import { GetSerieByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { SerieNotFoundError } from '../../errors/serie.not.found'
import { HeroeRepository } from 'src/heroe/application/repositories/heroe.repository'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { CivilRepository } from 'src/civil/application/repositories/civil.repository'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'

export class GetSerieByIdQuery
    implements
        ApplicationService<
            GetSerieByIdDTO,
            GetSerieByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly serieRepository: SerieRepository,
        private readonly heroeRepository: HeroeRepository,
        private readonly villainRepository: VillainRepository,
        private readonly civilRepository: CivilRepository,
    ) {}

    async getHeroeVillainOrCivil(id: ActorCharacter) {
        const civil = await this.civilRepository.getById(new CivilId(id.value))
        if (civil)
            return {
                id: civil.id.value,
                name: civil.person.name.value,
            }
        const heroe = await this.heroeRepository.getById(new HeroeId(id.value))
        if (heroe)
            return {
                id: heroe.id.value,
                name: heroe.name.value,
            }
        const villain = await this.villainRepository.getById(
            new VillainId(id.value),
        )
        if (villain)
            return {
                id: villain.id.value,
                name: villain.name.value,
            }
        throw new Error('Target not found')
    }

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
            actors: await serie.actors.asyncMap(async (e) => ({
                id: e.id.value,
                name: e.name,
                role: e.role.value,
                character: await this.getHeroeVillainOrCivil(e.character),
            })),
            rates: serie.rates.map((e) => ({
                id: e.id.value,
                calification: e.calification.value,
            })),
            rating: serie.rating,
        })
    }
}
