import { ApplicationService } from 'src/core/application/service/application.service'
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
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { VideogameTitle } from 'src/videogame/domain/value-objects/title'
import { VideogameSynopsis } from 'src/videogame/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/videogame/domain/value-objects/release.date'
import { VideogameCreator } from 'src/videogame/domain/value-objects/creator'
import { VideogameType } from 'src/videogame/domain/value-objects/type'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { ModifyVideogameDTO } from './types/dto'
import { CreateVideogameResponse } from '../create/types/response'
import { VideogameNotFoundError } from '../../errors/videogame.not.found'

export class ModifyVideogameCommand
    implements
        ApplicationService<
            ModifyVideogameDTO,
            CreateVideogameResponse,
            ApplicationError
        >
{
    constructor(
        private readonly vidogameRepository: VideogameRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createActorsByDTO(data: ModifyVideogameDTO) {
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
        data: ModifyVideogameDTO,
    ): Promise<Result<CreateVideogameResponse, ApplicationError>> {
        const videogame = await this.vidogameRepository.getById(
            new VideogameId(data.id),
        )
        if (!videogame) throw new VideogameNotFoundError()
        const actors = this.createActorsByDTO(data)
        if (data.title) videogame.changeTitle(new VideogameTitle(data.title))
        if (data.synopsis)
            videogame.changeSynopsis(new VideogameSynopsis(data.synopsis))
        if (data.release)
            videogame.changeReleaseDate(new ReleaseDate(data.release))
        if (data.creator)
            videogame.changeCreator(new VideogameCreator(data.creator))
        if (data.type) videogame.changeType(new VideogameType(data.type))
        data.actorsToRemove.forEach((e) =>
            videogame.removeActor(new ActorId(e)),
        )
        data.organizationsToRemove.forEach((e) =>
            videogame.removeOrganization(
                new OrganizationRef(e.id, e.participationType),
            ),
        )
        actors.forEach((e) => videogame.addActor(e))
        data.organizations.forEach((e) =>
            videogame.addOrganization(
                new OrganizationRef(e.id, e.participationType),
            ),
        )
        await this.vidogameRepository.save(videogame)
        this.eventHandler.publish(videogame.pullEvents())
        return Result.success({
            id: videogame.id.value,
        })
    }
}
