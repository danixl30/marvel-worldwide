import { Optional } from '@mono/types-utils'
import { InjectRepository } from '@nestjs/typeorm'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Appear } from 'src/movie/infraestructure/models/postgres/appear.entity'
import { Develop } from 'src/movie/infraestructure/models/postgres/develop.entity'
import { Represent } from 'src/movie/infraestructure/models/postgres/represent.entity'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { VideogameRepository } from 'src/videogame/application/repositories/videogame.repository'
import { VideogameId } from 'src/videogame/domain/value-objects/id'
import { Videogame } from 'src/videogame/domain/videogame'
import { Repository } from 'typeorm'
import { Videogame as VideogameDB } from '../models/postgres/videogame.entity'
import { Platform } from '../models/postgres/platform.entity'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { VideogameTitle } from 'src/videogame/domain/value-objects/title'
import { VideogameSynopsis } from 'src/videogame/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/videogame/domain/value-objects/release.date'
import { VideogameCreator } from 'src/videogame/domain/value-objects/creator'
import { VideogameType } from 'src/videogame/domain/value-objects/type'
import { Comic } from 'src/movie/domain/value-objects/comic'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { VideogamePlatform } from 'src/videogame/domain/value-objects/platform'
import { Injectable } from '@nestjs/common'
import { Media } from 'src/movie/infraestructure/models/postgres/media.entity'
import { Calification } from 'src/profile/infraestructure/models/postgres/calification.entity'
import { Rate } from 'src/movie/domain/entities/rate/rate'
import { RateId } from 'src/movie/domain/entities/rate/value-objects/rate.id'
import { RateCalification } from 'src/movie/domain/entities/rate/value-objects/rate.calification'
import { RateTimestamp } from 'src/movie/domain/entities/rate/value-objects/rate.timestamp'
import { History } from 'src/profile/infraestructure/models/postgres/history.entity'

@Injectable()
export class VideogamePostgresRepository implements VideogameRepository {
    constructor(
        @InjectRepository(VideogameDB)
        private readonly videogameDB: Repository<VideogameDB>,
        @InjectRepository(Platform)
        private readonly platformDB: Repository<Platform>,
        @InjectRepository(Appear)
        private readonly appearDB: Repository<Appear>,
        @InjectRepository(Develop)
        private readonly developDB: Repository<Develop>,
        @InjectRepository(Represent)
        private readonly representDB: Repository<Represent>,
        @InjectRepository(Media)
        private readonly mediaDB: Repository<Media>,
        @InjectRepository(Calification)
        private readonly calificationDB: Repository<Calification>,
    ) {}
    async save(aggregate: Videogame): Promise<void> {
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
        await this.videogameDB.upsert(
            this.videogameDB.create({
                id: aggregate.id.value,
                type: aggregate.type.value,
                company: aggregate.creator.value,
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
        await this.platformDB.delete({
            idVideogame: aggregate.id.value,
        })
        await aggregate.platforms.asyncForEach(async (platform) =>
            this.platformDB.insert(
                this.platformDB.create({
                    idVideogame: aggregate.id.value,
                    name: platform.value,
                }),
            ),
        )
        await aggregate.actors.asyncForEach(async (actor) =>
            this.representDB.insert(
                this.representDB.create({
                    id: actor.id.value,
                    idCharacter: actor.character.id,
                    idMedia: aggregate.id.value,
                    type: actor.role.value,
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
                    type: organization.participationType,
                }),
            ),
        )
    }

    async delete(aggregate: Videogame): Promise<void> {
        await this.videogameDB.delete({
            id: aggregate.id.value,
        })
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
        await this.platformDB.delete({
            idVideogame: aggregate.id.value,
        })
    }

    async getById(id: VideogameId): Promise<Optional<Videogame>> {
        const videogame = await this.videogameDB
            .createQueryBuilder('videogame')
            .innerJoinAndSelect('videogame.media', 'media')
            .where('videogame.id = :id', {
                id: id.value,
            })
            .getOne()
        if (!videogame) return null
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
        const platforms = await this.platformDB.findBy({
            idVideogame: videogame.id,
        })
        const rates = await this.calificationDB.findBy({
            idMedia: videogame.id,
        })
        return new Videogame(
            new VideogameId(videogame.id),
            new VideogameTitle(videogame.media.title),
            new VideogameSynopsis(videogame.media.synopsis),
            new ReleaseDate(videogame.media.release),
            new VideogameCreator(videogame.media.creator),
            new VideogameType(videogame.type),
            new Comic(videogame.media.comic),
            appear.map((e) => new OrganizationRef(e.idOrganization, e.type)),
            platforms.map((e) => new VideogamePlatform(e.name)),
            actors.map(
                (e) =>
                    new Actor(
                        new ActorId(e.id),
                        new ActorName(e.firstName, e.lastName),
                        new ActorCharacter(e.idCharacter, e.character.kind),
                        new ActorRole(e.type),
                    ),
            ),
            rates.map(
                (e) =>
                    new Rate(
                        new RateId(e.idProfile),
                        new RateCalification(e.rating),
                        new RateTimestamp(e.timestamp),
                    ),
            ),
        )
    }

    async getAtLeast2WeeksNearRelease(): Promise<Videogame[]> {
        const videogames = await this.videogameDB
            .createQueryBuilder('videogame')
            .innerJoinAndSelect('videogame.media', 'media')
            .where("media.release BETWEEN now() - interval '2 week' AND NOW()")
            .andWhere(
                'videogame.id in (select "idMedia" from calification order by rating DESC)',
            )
            .orderBy('release', 'DESC')
            .getMany()
        return videogames.asyncMap(async (videogame) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: videogame.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: videogame.id,
            })
            const platforms = await this.platformDB.findBy({
                idVideogame: videogame.id,
            })
            const rates = await this.calificationDB.findBy({
                idMedia: videogame.id,
            })
            return new Videogame(
                new VideogameId(videogame.id),
                new VideogameTitle(videogame.media.title),
                new VideogameSynopsis(videogame.media.synopsis),
                new ReleaseDate(videogame.media.release),
                new VideogameCreator(videogame.media.creator),
                new VideogameType(videogame.type),
                new Comic(videogame.media.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                platforms.map((e) => new VideogamePlatform(e.name)),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(e.idCharacter, e.character.kind),
                            new ActorRole(e.type),
                        ),
                ),
                rates.map(
                    (e) =>
                        new Rate(
                            new RateId(e.idProfile),
                            new RateCalification(e.rating),
                            new RateTimestamp(e.timestamp),
                        ),
                ),
            )
        })
    }

    async getTrending(profileId: ProfileId): Promise<Videogame[]> {
        const videogames = await this.videogameDB
            .createQueryBuilder('videogame')
            .innerJoinAndSelect('videogame.media', 'media')
            .innerJoin(History, 'history', 'history.idMedia = videogame.id')
            .innerJoin(
                Calification,
                'calification',
                'calification.idMedia = videogame.id',
            )
            .where('history.endDate is not null and history.idProfile = :id', {
                id: profileId.value,
            })
            .groupBy('videogame.id')
            .addGroupBy('history.idMedia')
            .addGroupBy('calification.idMedia')
            .addGroupBy('media.id')
            .orderBy('avg(calification.rating)', 'DESC')
            .addOrderBy('max(history.endDate - history.initDate)', 'DESC')
            .limit(10)
            .getMany()
        return videogames.asyncMap(async (videogame) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: videogame.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: videogame.id,
            })
            const platforms = await this.platformDB.findBy({
                idVideogame: videogame.id,
            })
            const rates = await this.calificationDB.findBy({
                idMedia: videogame.id,
            })
            return new Videogame(
                new VideogameId(videogame.id),
                new VideogameTitle(videogame.media.title),
                new VideogameSynopsis(videogame.media.synopsis),
                new ReleaseDate(videogame.media.release),
                new VideogameCreator(videogame.media.creator),
                new VideogameType(videogame.type),
                new Comic(videogame.media.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                platforms.map((e) => new VideogamePlatform(e.name)),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(e.idCharacter, e.character.kind),
                            new ActorRole(e.type),
                        ),
                ),
                rates.map(
                    (e) =>
                        new Rate(
                            new RateId(e.idProfile),
                            new RateCalification(e.rating),
                            new RateTimestamp(e.timestamp),
                        ),
                ),
            )
        })
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Videogame[]> {
        const videogames = await this.videogameDB
            .createQueryBuilder('videogame')
            .innerJoinAndSelect('videogame.media', 'media')
            .where(`media.title like '%${criteria.term}%'`)
            .orWhere(
                'videogame.id in (select t."idMedia" from (select "idMedia", "endDate" - "initDate" as time from history where "mediaKind" = \'videogame\' and "endDate" is not NULL order by time DESC) as t)',
            )
            .limit(criteria.pagination?.limit || 10)
            .skip(
                ((criteria.pagination?.page || 1) - 1) *
                    (criteria.pagination?.limit || 0),
            )
            .getMany()
        return videogames.asyncMap(async (videogame) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: videogame.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: videogame.id,
            })
            const platforms = await this.platformDB.findBy({
                idVideogame: videogame.id,
            })
            const rates = await this.calificationDB.findBy({
                idMedia: videogame.id,
            })
            return new Videogame(
                new VideogameId(videogame.id),
                new VideogameTitle(videogame.media.title),
                new VideogameSynopsis(videogame.media.synopsis),
                new ReleaseDate(videogame.media.release),
                new VideogameCreator(videogame.media.creator),
                new VideogameType(videogame.type),
                new Comic(videogame.media.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                platforms.map((e) => new VideogamePlatform(e.name)),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(e.idCharacter, e.character.kind),
                            new ActorRole(e.type),
                        ),
                ),
                rates.map(
                    (e) =>
                        new Rate(
                            new RateId(e.idProfile),
                            new RateCalification(e.rating),
                            new RateTimestamp(e.timestamp),
                        ),
                ),
            )
        })
    }

    async getActorByName(name: ActorName): Promise<Optional<Actor>> {
        return null
    }

    async getTop10History(profileId: ProfileId): Promise<Videogame[]> {
        const videogames = await this.videogameDB
            .createQueryBuilder('videogame')
            .innerJoinAndSelect('videogame.media', 'media')
            .innerJoin(History, 'history', 'history.idMedia = videogame.id')
            .where('history.idProfile = :id and history.endDate is not null', {
                id: profileId.value,
            })
            .orderBy('history.endDate - history.initDate', 'DESC')
            .limit(10)
            .getMany()
        return videogames.asyncMap(async (videogame) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: videogame.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: videogame.id,
            })
            const platforms = await this.platformDB.findBy({
                idVideogame: videogame.id,
            })
            const rates = await this.calificationDB.findBy({
                idMedia: videogame.id,
            })
            return new Videogame(
                new VideogameId(videogame.id),
                new VideogameTitle(videogame.media.title),
                new VideogameSynopsis(videogame.media.synopsis),
                new ReleaseDate(videogame.media.release),
                new VideogameCreator(videogame.media.creator),
                new VideogameType(videogame.type),
                new Comic(videogame.media.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                platforms.map((e) => new VideogamePlatform(e.name)),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(e.idCharacter, e.character.kind),
                            new ActorRole(e.type),
                        ),
                ),
                rates.map(
                    (e) =>
                        new Rate(
                            new RateId(e.idProfile),
                            new RateCalification(e.rating),
                            new RateTimestamp(e.timestamp),
                        ),
                ),
            )
        })
    }
}
