import { ApplicationService } from 'src/core/application/service/application.service'
import { GetVideogameByIdDTO } from './types/dto'
import { GetVideogameByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VideogameRepository } from '../../repositories/videogame.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { VideogameNotFoundError } from '../../errors/videogame.not.found'
import { HeroeRepository } from 'src/heroe/application/repositories/heroe.repository'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { CivilRepository } from 'src/civil/application/repositories/civil.repository'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'

export class GetVideogameByIdQuery
    implements
        ApplicationService<
            GetVideogameByIdDTO,
            GetVideogameByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly vidogameRepository: VideogameRepository,
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
        data: GetVideogameByIdDTO,
    ): Promise<Result<GetVideogameByIdResponse, ApplicationError>> {
        const videogame = await this.vidogameRepository.getById(
            new VideogameId(data.id),
        )
        if (!videogame) return Result.error(new VideogameNotFoundError())
        return Result.success({
            id: videogame.id.value,
            title: videogame.title.value,
            synopsis: videogame.synopsis.value,
            creator: videogame.creator.value,
            release: videogame.release.value,
            type: videogame.type.value,
            platforms: videogame.platforms.map((e) => e.value),
            comic: {
                id: videogame.basedOn.id.value,
                title: videogame.basedOn.title.value,
                volumen: videogame.basedOn.volumen.value,
                author: videogame.basedOn.author,
            },
            actors: await videogame.actors.asyncMap(async (e) => ({
                id: e.id.value,
                name: e.name,
                role: e.role.value,
                character: await this.getHeroeVillainOrCivil(e.character),
            })),
            rating: videogame.rating,
            rates: videogame.rates.map((e) => ({
                id: e.id.value,
                calification: e.calification.value,
            })),
        })
    }
}
