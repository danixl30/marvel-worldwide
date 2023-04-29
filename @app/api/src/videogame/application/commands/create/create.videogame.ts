import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateVideogameDTO } from './types/dto'
import { CreateVideogameResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { VideogameRepository } from '../../repositories/videogame.repository'
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
import { Videogame } from 'src/videogame/domain/videogame'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { VideogameTitle } from 'src/videogame/domain/value-objects/title'
import { VideogameSynopsis } from 'src/videogame/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/videogame/domain/value-objects/release.date'
import { VideogameCreator } from 'src/videogame/domain/value-objects/creator'
import { VideogameRating } from 'src/videogame/domain/value-objects/rating'
import { VideogameType } from 'src/videogame/domain/value-objects/type'
import { VideogamePlatform } from 'src/videogame/domain/value-objects/platform'

const DEFAULT_RATING = 1
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

    private createComicByDTO(data: CreateVideogameDTO): Comic {
        return new Comic(
            new ComicId(this.uuidGenerator.generate()),
            new ComicTitle(data.comic!.title),
            new ComicAuthor(
                data.comic!.author.firstName,
                data.comic!.author.lastName,
            ),
            new ComicVolumen(data.comic!.volumen),
        )
    }

    private createActorsByDTO(data: CreateVideogameDTO) {
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

    async execute(
        data: CreateVideogameDTO,
    ): Promise<Result<CreateVideogameResponse, ApplicationError>> {
        const comic = data.comicId
            ? await this.vidogameRepository.getComicById(
                  new ComicId(data.comicId),
              )
            : this.createComicByDTO(data)
        if (!comic) return Result.error(new ComicNotFoundError())
        const actors = this.createActorsByDTO(data)
        const videogame = new Videogame(
            new VideogameId(this.uuidGenerator.generate()),
            new VideogameTitle(data.title),
            new VideogameSynopsis(data.synopsis),
            new ReleaseDate(data.release),
            new VideogameCreator(data.creator),
            new VideogameRating(DEFAULT_RATING),
            new VideogameType(data.type),
            comic,
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
