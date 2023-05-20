import { ApplicationService } from 'src/core/application/service/application.service'
import { GetMovieByIdDTO } from './types/dto'
import { GetMovieByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { MovieNotFoundError } from '../../errors/movie.not.found'
import { HeroeRepository } from 'src/heroe/application/repositories/heroe.repository'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { CivilRepository } from 'src/civil/application/repositories/civil.repository'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'

export class GetMovieByIdQuery
    implements
        ApplicationService<
            GetMovieByIdDTO,
            GetMovieByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly movieRepository: MovieRepository,
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
        data: GetMovieByIdDTO,
    ): Promise<Result<GetMovieByIdResponse, ApplicationError>> {
        const movie = await this.movieRepository.getById(new MovieId(data.id))
        if (!movie) return Result.error(new MovieNotFoundError())
        return Result.success({
            id: movie.id.value,
            title: movie.title.value,
            synopsis: movie.synopsis.value,
            creator: movie.creator.value,
            release: movie.release.value,
            director: {
                firstName: movie.director.firstName,
                lastName: movie.director.lastName,
            },
            duration: movie.duration,
            type: movie.type.value,
            cost: movie.cost,
            comic: {
                id: movie.basedOn.id.value,
                title: movie.basedOn.title.value,
                volumen: movie.basedOn.volumen.value,
                author: movie.basedOn.author,
            },
            actors: await movie.actors.asyncMap(async (e) => ({
                id: e.id.value,
                name: e.name,
                role: e.role.value,
                character: await this.getHeroeVillainOrCivil(e.character),
            })),
            rates: movie.rates.map((e) => ({
                id: e.id.value,
                calification: e.calification.value,
            })),
            rating: movie.rating,
        })
    }
}
