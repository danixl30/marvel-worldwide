import { ApplicationService } from 'src/core/application/service/application.service'
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
import { ModifyMovieDTO } from './types/dto'
import { CreateMovieResponse } from '../create/types/response'
import { MovieNotFoundError } from '../../errors/movie.not.found'

export class ModifyMovieCommand
    implements
        ApplicationService<
            ModifyMovieDTO,
            CreateMovieResponse,
            ApplicationError
        >
{
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createActorsByDTO(data: ModifyMovieDTO) {
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
        data: ModifyMovieDTO,
    ): Promise<Result<CreateMovieResponse, ApplicationError>> {
        const movie = await this.movieRepository.getById(new MovieId(data.id))
        if (!movie) throw new MovieNotFoundError()
        const actors = this.createActorsByDTO(data)
        if (data.title) movie.changeTitle(new MovieTitle(data.title))
        if (data.synopsis)
            movie.changeSynopsis(new MovieSynopsis(data.synopsis))
        if (data.release) movie.changeReleaseDate(new ReleaseDate(data.release))
        if (data.creator) movie.changeCreator(new MovieCreator(data.creator))
        if (data.directorName)
            movie.changeDirector(new MovieDirector(data.directorName))
        if (data.duration)
            movie.changeDuration(
                new MovieDuration(
                    data.duration.hours,
                    data.duration.minutes,
                    data.duration.seconds,
                ),
            )
        if (data.type) movie.changeType(new MovieType(data.type))
        if (data.cost)
            movie.changeCost(
                new ProductionCost(data.cost.cost, data.cost.earning),
            )
        data.actorsToRemove.forEach((e) => movie.removeActor(new ActorId(e)))
        data.organizationsToRemove.forEach((e) =>
            movie.removeOrganization(
                new OrganizationRef(e.id, e.participationType),
            ),
        )
        actors.forEach((e) => movie.addActor(e))
        data.organizations.map(
            (e) => new OrganizationRef(e.id, e.participationType),
        )
        await this.movieRepository.save(movie)
        this.eventHandler.publish(movie.pullEvents())
        return Result.success({
            id: movie.id.value,
        })
    }
}
