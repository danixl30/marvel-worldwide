import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateSerieDTO } from './types/dto'
import { CreateSerieResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { SerieRepository } from '../../repositories/serie.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { ComicId } from 'src/movie/domain/entities/comic/value-objects/id'
import { ComicTitle } from 'src/movie/domain/entities/comic/value-objects/title'
import { ComicAuthor } from 'src/movie/domain/entities/comic/value-objects/author'
import { ComicVolumen } from 'src/movie/domain/entities/comic/value-objects/volumen'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { ComicNotFoundError } from 'src/movie/application/errors/comic.not.found'
import { Serie } from 'src/serie/domain/serie'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { SerieTitle } from 'src/serie/domain/value-objects/title'
import { SerieSynopsis } from 'src/serie/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/serie/domain/value-objects/release.date'
import { SerieCreator } from 'src/serie/domain/value-objects/creator'
import { SerieRating } from 'src/serie/domain/value-objects/rating'
import { SerieType } from 'src/serie/domain/value-objects/type'
import { SerieEpisodes } from 'src/serie/domain/value-objects/episodes'
import { SerieChannel } from 'src/serie/domain/value-objects/channel'

const DEFAULT_RATING = 1
export class CerateSerieCommand implements ApplicationService<CreateSerieDTO, CreateSerieResponse, ApplicationError> {
    constructor(
        private readonly serieRepository: SerieRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createComicByDTO(data: CreateSerieDTO): Comic {
        return new Comic(
            new ComicId(this.uuidGenerator.generate()),
            new ComicTitle(data.comic!.title),
            new ComicAuthor(data.comic!.author.firstName, data.comic!.author.lastName),
            new ComicVolumen(data.comic!.volumen),
        )
    }

    private createActorsByDTO(data: CreateSerieDTO) {
        return data.actors.map(
            (e) =>
                new Actor(
                    new ActorId(this.uuidGenerator.generate()),
                    new ActorName(e.name.firstName, e.name.lastName),
                    new ActorCharacter(e.character),
                    new ActorRole(e.role),
                ),
        )
    }

    async execute(data: CreateSerieDTO): Promise<Result<CreateSerieResponse, ApplicationError>> {
        const comic = data.comicId ? await this.serieRepository.getComicById(new ComicId(data.comicId)) : this.createComicByDTO(data)
        if (!comic) return Result.error(new ComicNotFoundError())
        const actors = this.createActorsByDTO(data)
        const serie = new Serie(
            new SerieId(this.uuidGenerator.generate()),
            new SerieTitle(data.title),
            new SerieSynopsis(data.synopsis),
            new ReleaseDate(data.release),
            new SerieCreator(data.creator),
            new SerieRating(DEFAULT_RATING),
            new SerieType(data.type),
            new SerieEpisodes(data.episodes),
            new SerieChannel(data.channel),
            comic,
            actors,
        )
        await this.serieRepository.save(serie)
        this.eventHandler.publish(serie.pullEvents())
        return Result.success({
            id: serie.id.value,
        })
    }
}
