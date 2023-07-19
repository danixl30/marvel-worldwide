import { ApplicationService } from 'src/core/application/service/application.service'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { SerieTitle } from 'src/serie/domain/value-objects/title'
import { SerieSynopsis } from 'src/serie/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/serie/domain/value-objects/release.date'
import { SerieCreator } from 'src/serie/domain/value-objects/creator'
import { SerieType } from 'src/serie/domain/value-objects/type'
import { SerieEpisodes } from 'src/serie/domain/value-objects/episodes'
import { SerieChannel } from 'src/serie/domain/value-objects/channel'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { ModifySerieDTO } from './types/dto'
import { CreateSerieResponse } from '../create/types/response'
import { SerieNotFoundError } from '../../errors/serie.not.found'

export class ModifySerieCommand
    implements
        ApplicationService<
            ModifySerieDTO,
            CreateSerieResponse,
            ApplicationError
        >
{
    constructor(
        private readonly serieRepository: SerieRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createActorsByDTO(data: ModifySerieDTO) {
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
        data: ModifySerieDTO,
    ): Promise<Result<CreateSerieResponse, ApplicationError>> {
        const serie = await this.serieRepository.getById(new SerieId(data.id))
        if (!serie) throw new SerieNotFoundError()
        const actors = this.createActorsByDTO(data)
        if (data.title) serie.changeTitle(new SerieTitle(data.title))
        if (data.synopsis)
            serie.changeSynopsis(new SerieSynopsis(data.synopsis))
        if (data.release) serie.changeReleaseDate(new ReleaseDate(data.release))
        if (data.creator) serie.changeCreator(new SerieCreator(data.creator))
        if (data.type) serie.changeType(new SerieType(data.type))
        if (data.channel) serie.changeChannel(new SerieChannel(data.channel))
        if (data.episodes)
            serie.changeEpisodes(new SerieEpisodes(data.episodes))
        data.actorsToRemove.forEach((e) => serie.removeActor(new ActorId(e)))
        data.organizationsToRemove.forEach((e) =>
            serie.removeOrganization(
                new OrganizationRef(e.id, e.participationType),
            ),
        )
        actors.forEach((e) => serie.addActor(e))
        data.organizations.forEach((e) =>
            serie.addOrganization(
                new OrganizationRef(e.id, e.participationType),
            ),
        )
        await this.serieRepository.save(serie)
        this.eventHandler.publish(serie.pullEvents())
        return Result.success({
            id: serie.id.value,
        })
    }
}
