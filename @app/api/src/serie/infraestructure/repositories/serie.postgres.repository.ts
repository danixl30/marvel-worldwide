import { Optional } from '@mono/types-utils'
import { InjectRepository } from '@nestjs/typeorm'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { SerieRepository } from 'src/serie/application/repositories/serie.repository'
import { Serie } from 'src/serie/domain/serie'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { Repository } from 'typeorm'
import { Serie as SerieDB } from '../models/postgres/serie.entity'
import { Appear } from 'src/movie/infraestructure/models/postgres/appear.entity'
import { Develop } from 'src/movie/infraestructure/models/postgres/develop.entity'
import { Represent } from 'src/movie/infraestructure/models/postgres/represent.entity'
import { SerieTitle } from 'src/serie/domain/value-objects/title'
import { SerieSynopsis } from 'src/serie/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/serie/domain/value-objects/release.date'
import { SerieCreator } from 'src/serie/domain/value-objects/creator'
import { SerieType } from 'src/serie/domain/value-objects/type'
import { Comic } from 'src/movie/domain/value-objects/comic'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { SerieEpisodes } from 'src/serie/domain/value-objects/episodes'
import { SerieChannel } from 'src/serie/domain/value-objects/channel'
import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'

export class SeriePostgresRepository implements SerieRepository {
    constructor(
        @InjectRepository(SerieDB)
        private readonly serieDB: Repository<SerieDB>,
        @InjectRepository(Appear)
        private readonly appearDB: Repository<Appear>,
        @InjectRepository(Develop)
        private readonly developDB: Repository<Develop>,
        @InjectRepository(Represent)
        private readonly representDB: Repository<Represent>,
        @InjectRepository(Media)
        private readonly mediaDB: Repository<Media>,
    ) {}
    async save(aggregate: Serie): Promise<void> {
        await this.mediaDB.upsert(
            this.mediaDB.create({
                id: aggregate.id.value,
                title: aggregate.title.value,
                synopsis: aggregate.synopsis.value,
                release: aggregate.release.value,
                comic: aggregate.basedOn.value,
                creator: aggregate.creator.value,
                productor: aggregate.creator.value,
                kind: 'serie',
            }),
            ['id'],
        )
        await this.serieDB.upsert(
            this.serieDB.create({
                id: aggregate.id.value,
                type: aggregate.type.value,
                channel: aggregate.channel.value,
                episodes: aggregate.episodes.value,
            }),
            ['id'],
        )
        await this.developDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.representDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.appearDB.delete({
            idMedia: aggregate.id.value,
        })
        await aggregate.actors.asyncForEach(async (actor) =>
            this.representDB.insert(
                this.representDB.create({
                    id: actor.id.value,
                    idCharacter: actor.character.id,
                    type: actor.role.value,
                    idMedia: aggregate.id.value,
                    firstName: actor.name.firstName,
                    lastName: actor.name.lastName,
                }),
            ),
        )
        await aggregate.organizations.asyncForEach(async (organization) =>
            this.appearDB.insert(
                this.appearDB.create({
                    idMedia: aggregate.id.value,
                    idOrganization: organization.value,
                    type: '',
                }),
            ),
        )
    }

    async delete(aggregate: Serie): Promise<void> {
        await this.mediaDB.delete({
            id: aggregate.id.value,
        })
        await this.developDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.representDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.appearDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.serieDB.delete({
            id: aggregate.id.value,
        })
    }

    async getById(id: SerieId): Promise<Optional<Serie>> {
        const actors = await this.representDB
            .createQueryBuilder('actor')
            .innerJoinAndSelect('actor.character', 'character')
            .where('actor.idMedia = :id', {
                id: id.value,
            })
            .getMany()
        const appear = await this.appearDB.findBy({
            idMedia: id.value,
        })
        const serie = await this.serieDB
            .createQueryBuilder('serie')
            .innerJoinAndSelect('serie.media', 'media')
            .where('serie.id = :id', {
                id: id.value,
            })
            .getOne()
        if (!serie) return null
        return new Serie(
            new SerieId(serie.id),
            new SerieTitle(serie.media.title),
            new SerieSynopsis(serie.media.synopsis),
            new ReleaseDate(serie.media.release),
            new SerieCreator(serie.media.creator),
            new SerieType(serie.type),
            new SerieEpisodes(serie.episodes),
            new SerieChannel(serie.channel),
            new Comic(serie.media.comic),
            appear.map((e) => new OrganizationRef(e.idOrganization, e.type)),
            actors.map(
                (e) =>
                    new Actor(
                        new ActorId(e.id),
                        new ActorName(e.firstName, e.lastName),
                        new ActorCharacter(e.idCharacter, e.character.kind),
                        new ActorRole(e.type),
                    ),
            ),
        )
    }

    async getAll(): Promise<Serie[]> {
        const series = await this.serieDB
            .createQueryBuilder('serie')
            .innerJoinAndSelect('actor.character', 'character')
            .getMany()
        return series.asyncMap(async (serie) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: serie.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: serie.id,
            })
            return new Serie(
                new SerieId(serie.id),
                new SerieTitle(serie.media.title),
                new SerieSynopsis(serie.media.synopsis),
                new ReleaseDate(serie.media.release),
                new SerieCreator(serie.media.creator),
                new SerieType(serie.type),
                new SerieEpisodes(serie.episodes),
                new SerieChannel(serie.channel),
                new Comic(serie.media.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(e.idCharacter, e.character.kind),
                            new ActorRole(e.type),
                        ),
                ),
            )
        })
    }

    async getAtLeast2WeeksNearRelease(): Promise<Serie[]> {
        const series = await this.serieDB
            .createQueryBuilder()
            .innerJoinAndSelect('actor.character', 'character')
            .andWhere({
                release: 'BETWEEN (NOW() - INTERVAL 14 DAY) AND NOW()',
            })
            .orderBy('release', 'DESC')
            .getMany()
        return series.asyncMap(async (serie) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: serie.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: serie.id,
            })
            return new Serie(
                new SerieId(serie.id),
                new SerieTitle(serie.media.title),
                new SerieSynopsis(serie.media.synopsis),
                new ReleaseDate(serie.media.release),
                new SerieCreator(serie.media.creator),
                new SerieType(serie.type),
                new SerieEpisodes(serie.episodes),
                new SerieChannel(serie.channel),
                new Comic(serie.media.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(e.idCharacter, e.character.kind),
                            new ActorRole(e.type),
                        ),
                ),
            )
        })
    }

    async getTrending(profileId: ProfileId): Promise<Serie[]> {
        return []
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Serie[]> {
        const series = await this.serieDB
            .createQueryBuilder()
            .innerJoinAndSelect('actor.character', 'character')
            .limit(criteria.pagination?.limit || 10)
            .skip(
                (criteria.pagination?.page || 1) -
                    1 * (criteria.pagination?.limit || 0),
            )
            .andWhere({
                title: criteria.term,
            })
            .getMany()
        return series.asyncMap(async (serie) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: serie.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: serie.id,
            })
            return new Serie(
                new SerieId(serie.id),
                new SerieTitle(serie.media.title),
                new SerieSynopsis(serie.media.synopsis),
                new ReleaseDate(serie.media.release),
                new SerieCreator(serie.media.creator),
                new SerieType(serie.type),
                new SerieEpisodes(serie.episodes),
                new SerieChannel(serie.channel),
                new Comic(serie.media.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(e.idCharacter, e.character.kind),
                            new ActorRole(e.type),
                        ),
                ),
            )
        })
    }

    async getActorByName(name: ActorName): Promise<Optional<Actor>> {
        return null
    }
}
