import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateVideogameDTO } from './types/dto'
import { CreateVideogameResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VideogameRepository } from '../../repositories/videogame.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { Videogame } from 'src/videogame/domain/videogame'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { VideogameTitle } from 'src/videogame/domain/value-objects/title'
import { VideogameSynopsis } from 'src/videogame/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/videogame/domain/value-objects/release.date'
import { VideogameCreator } from 'src/videogame/domain/value-objects/creator'
import { VideogameType } from 'src/videogame/domain/value-objects/type'
import { VideogamePlatform } from 'src/videogame/domain/value-objects/platform'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { Comic } from 'src/movie/domain/value-objects/comic'

export class CreateVideogameCommand
    implements
        ApplicationService<
            CreateVideogameDTO,
            CreateVideogameResponse,
            ApplicationError
        >
{
    constructor(
        private readonly vidogameRepository: VideogameRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createActorsByDTO(data: CreateVideogameDTO) {
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
        data: CreateVideogameDTO,
    ): Promise<Result<CreateVideogameResponse, ApplicationError>> {
        const actors = this.createActorsByDTO(data)
        const videogame = new Videogame(
            new VideogameId(this.uuidGenerator.generate()),
            new VideogameTitle(data.title),
            new VideogameSynopsis(data.synopsis),
            new ReleaseDate(data.release),
            new VideogameCreator(data.creator),
            new VideogameType(data.type),
            new Comic(data.comic),
            data.organizations.map(
                (e) => new OrganizationRef(e.id, e.participationType),
            ),
            data.platforms.map((e) => new VideogamePlatform(e)),
            actors,
        )
        await this.vidogameRepository.save(videogame)
        this.eventHandler.publish(videogame.pullEvents())
        return Result.success({
            id: videogame.id.value,
        })
    }
}
