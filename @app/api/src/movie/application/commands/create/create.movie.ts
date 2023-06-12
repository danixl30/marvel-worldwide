import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateMovieDTO } from './types/dto'
import { CreateMovieResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { MovieRepository } from '../../repositories/movie.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { Movie } from 'src/movie/domain/movie'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { MovieTitle } from 'src/movie/domain/value-objects/title'
import { MovieSynopsis } from 'src/movie/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/movie/domain/value-objects/release.date'
import { MovieCreator } from 'src/movie/domain/value-objects/creator'
import { MovieDirector } from 'src/movie/domain/value-objects/director'
import { MovieDuration } from 'src/movie/domain/value-objects/duration'
import { MovieType } from 'src/movie/domain/value-objects/type'
import { ProductionCost } from 'src/movie/domain/value-objects/production.cost'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { Comic } from 'src/movie/domain/value-objects/comic'

export class CreateMovieCommand
    implements
        ApplicationService<
            CreateMovieDTO,
            CreateMovieResponse,
            ApplicationError
        >
{
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createActorsByDTO(data: CreateMovieDTO) {
        return data.actors.map(
            (e) =>
                new Actor(
                    new ActorId(this.uuidGenerator.generate()),
                    new ActorName(e.name.firstName, e.name.lastName),
                    new ActorCharacter(e.character.id, e.character.kind),
                    new ActorRole(e.role),
                ),
        )
    }

    async execute(
        data: CreateMovieDTO,
    ): Promise<Result<CreateMovieResponse, ApplicationError>> {
        const actors = this.createActorsByDTO(data)
        const movie = new Movie(
            new MovieId(this.uuidGenerator.generate()),
            new MovieTitle(data.title),
            new MovieSynopsis(data.synopsis),
            new ReleaseDate(data.release),
            new MovieCreator(data.creator),
            new MovieDirector(data.directorName),
            new MovieDuration(
                data.duration.hours,
                data.duration.minutes,
                data.duration.seconds,
            ),
            new MovieType(data.type),
            new ProductionCost(data.cost.cost, data.cost.earning),
            new Comic(data.comic),
            data.organizations.map(
                (e) => new OrganizationRef(e.id, e.participationType),
            ),
            actors,
        )
        await this.movieRepository.save(movie)
        this.eventHandler.publish(movie.pullEvents())
        return Result.success({
            id: movie.id.value,
        })
    }
}
