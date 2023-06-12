import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateSerieDTO } from './types/dto'
import { CreateSerieResponse } from './types/response'
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
import { Serie } from 'src/serie/domain/serie'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { SerieTitle } from 'src/serie/domain/value-objects/title'
import { SerieSynopsis } from 'src/serie/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/serie/domain/value-objects/release.date'
import { SerieCreator } from 'src/serie/domain/value-objects/creator'
import { SerieType } from 'src/serie/domain/value-objects/type'
import { SerieEpisodes } from 'src/serie/domain/value-objects/episodes'
import { SerieChannel } from 'src/serie/domain/value-objects/channel'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { Comic } from 'src/movie/domain/value-objects/comic'

export class CerateSerieCommand
    implements
        ApplicationService<
            CreateSerieDTO,
            CreateSerieResponse,
            ApplicationError
        >
{
    constructor(
        private readonly serieRepository: SerieRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createActorsByDTO(data: CreateSerieDTO) {
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
        data: CreateSerieDTO,
    ): Promise<Result<CreateSerieResponse, ApplicationError>> {
        const actors = this.createActorsByDTO(data)
        const serie = new Serie(
            new SerieId(this.uuidGenerator.generate()),
            new SerieTitle(data.title),
            new SerieSynopsis(data.synopsis),
            new ReleaseDate(data.release),
            new SerieCreator(data.creator),
            new SerieType(data.type),
            new SerieEpisodes(data.episodes),
            new SerieChannel(data.channel),
            new Comic(data.comic),
            data.organizations.map(
                (e) => new OrganizationRef(e.id, e.participationType),
            ),
            actors,
        )
        await this.serieRepository.save(serie)
        this.eventHandler.publish(serie.pullEvents())
        return Result.success({
            id: serie.id.value,
        })
    }
}
