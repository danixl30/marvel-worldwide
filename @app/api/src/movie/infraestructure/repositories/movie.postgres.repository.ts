import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { MovieRepository } from 'src/movie/application/repositories/movie.repository'
import { Actor } from 'src/movie/domain/entities/actor/actor'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { Movie } from 'src/movie/domain/movie'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { MovieType } from 'src/movie/domain/value-objects/type'
import { ProfileId } from 'src/profile/domain/value-objects/profile.id'
import { Movie as MovieDB } from '../models/postgres/movie.entity'
import { Appear } from '../models/postgres/appear.entity'
import { Develop } from '../models/postgres/develop.entity'
import { Represent } from '../models/postgres/represent.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MovieTitle } from 'src/movie/domain/value-objects/title'
import { MovieSynopsis } from 'src/movie/domain/value-objects/synopsis'
import { ReleaseDate } from 'src/movie/domain/value-objects/release.date'
import { MovieCreator } from 'src/movie/domain/value-objects/creator'
import { MovieDirector } from 'src/movie/domain/value-objects/director'
import { MovieDuration } from 'src/movie/domain/value-objects/duration'
import { ProductionCost } from 'src/movie/domain/value-objects/production.cost'
import { Comic } from 'src/movie/domain/value-objects/comic'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { Injectable } from '@nestjs/common'
import { Media } from '../models/postgres/media.entity'

@Injectable()
export class MoviePostgresRepository implements MovieRepository {
    constructor(
        @InjectRepository(MovieDB)
        private readonly movieDB: Repository<MovieDB>,
        @InjectRepository(Appear)
        private readonly appearDB: Repository<Appear>,
        @InjectRepository(Develop)
        private readonly developDB: Repository<Develop>,
        @InjectRepository(Represent)
        private readonly representDB: Repository<Represent>,
        @InjectRepository(Media)
        private readonly mediaDB: Repository<Media>,
    ) {}

    async save(aggregate: Movie): Promise<void> {
        await this.mediaDB.upsert(
            this.mediaDB.create({
                id: aggregate.id.value,
                title: aggregate.title.value,
                synopsis: aggregate.synopsis.value,
                release: aggregate.release.value,
                comic: aggregate.basedOn.value,
                creator: aggregate.creator.value,
                productor: aggregate.creator.value,
                kind: 'movie',
            }),
            ['id'],
        )
        await this.movieDB.upsert(
            this.movieDB.create({
                id: aggregate.id.value,
                director: aggregate.director.value,
                durationH: aggregate.duration.hours,
                durationM: aggregate.duration.minutes,
                durationS: aggregate.duration.seconds,
                distribuitor: aggregate.creator.value,
                productionCost: aggregate.cost.cost,
                earning: aggregate.cost.earning,
                type: aggregate.type.value,
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
                    type: organization.participationType,
                }),
            ),
        )
    }

    async delete(aggregate: Movie): Promise<void> {
        await this.developDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.representDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.appearDB.delete({
            idMedia: aggregate.id.value,
        })
        await this.movieDB.delete({
            id: aggregate.id.value,
        })
        await this.mediaDB.delete({
            id: aggregate.id.value,
        })
    }

    async getById(id: MovieId): Promise<Optional<Movie>> {
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
        const movie = await this.movieDB
            .createQueryBuilder('movie')
            .innerJoinAndSelect('movie.media', 'media')
            .where('movie.id = :id', {
                id: id.value,
            })
            .getOne()
        if (!movie) return null
        return new Movie(
            new MovieId(movie.id),
            new MovieTitle(movie.media.title),
            new MovieSynopsis(movie.media.synopsis),
            new ReleaseDate(movie.media.release),
            new MovieCreator(movie.media.creator),
            new MovieDirector(movie.director),
            new MovieDuration(
                movie.durationH,
                movie.durationM,
                movie.durationS,
            ),
            new MovieType(movie.type),
            new ProductionCost(movie.productionCost, movie.earning),
            new Comic(movie.media.comic),
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

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Movie[]> {
        const movies = await this.movieDB
            .createQueryBuilder('movie')
            .innerJoinAndSelect('movie.media', 'media')
            .limit(criteria.pagination?.limit || 10)
            .skip(
                (criteria.pagination?.page || 1) -
                    1 * (criteria.pagination?.limit || 0),
            )
            .where('media.title = :term', {
                term: `%${criteria.term}%`,
            })
            .orWhere(
                'movie.id in (select t."idMedia" from (select "idMedia", "endDate" - "initDate" as time from history where "mediaKind" = \'movie\' and "endDate" is not NULL order by time DESC) as t)',
            )
            .getMany()

        return movies.asyncMap(async (movie) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: movie.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: movie.id,
            })
            return new Movie(
                new MovieId(movie.id),
                new MovieTitle(movie.media.title),
                new MovieSynopsis(movie.media.synopsis),
                new ReleaseDate(movie.media.release),
                new MovieCreator(movie.media.creator),
                new MovieDirector(movie.director),
                new MovieDuration(
                    movie.durationH,
                    movie.durationM,
                    movie.durationS,
                ),
                new MovieType(movie.type),
                new ProductionCost(movie.productionCost, movie.earning),
                new Comic(movie.media.comic),
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

    async getAtLeast2WeeksNearRelease(): Promise<Movie[]> {
        const movies = await this.movieDB
            .createQueryBuilder('movie')
            .innerJoinAndSelect('movie.media', 'media')
            .where("media.release BETWEEN now() - interval '2 week' AND NOW()")
            .andWhere(
                'movie.id in (select "idMedia" from calification order by rating DESC)',
            )
            .orderBy('release', 'DESC')
            .getMany()
        return movies.asyncMap(async (movie) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: movie.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: movie.id,
            })
            return new Movie(
                new MovieId(movie.id),
                new MovieTitle(movie.media.title),
                new MovieSynopsis(movie.media.synopsis),
                new ReleaseDate(movie.media.release),
                new MovieCreator(movie.media.creator),
                new MovieDirector(movie.director),
                new MovieDuration(
                    movie.durationH,
                    movie.durationM,
                    movie.durationS,
                ),
                new MovieType(movie.type),
                new ProductionCost(movie.productionCost, movie.earning),
                new Comic(movie.media.comic),
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

    async getByType(type: MovieType): Promise<Movie[]> {
        const movies = await this.movieDB
            .createQueryBuilder('movie')
            .innerJoinAndSelect('movie.media', 'media')
            .where({
                type: type.value,
            })
            .getMany()

        return movies.asyncMap(async (movie) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: movie.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: movie.id,
            })
            return new Movie(
                new MovieId(movie.id),
                new MovieTitle(movie.media.title),
                new MovieSynopsis(movie.media.synopsis),
                new ReleaseDate(movie.media.release),
                new MovieCreator(movie.media.creator),
                new MovieDirector(movie.director),
                new MovieDuration(
                    movie.durationH,
                    movie.durationM,
                    movie.durationS,
                ),
                new MovieType(movie.type),
                new ProductionCost(movie.productionCost, movie.earning),
                new Comic(movie.media.comic),
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

    async getTrending(profileId: ProfileId): Promise<Movie[]> {
        const movies = await this.movieDB
            .createQueryBuilder('movie')
            .innerJoinAndSelect('movie.media', 'media')
            .where(
                'movie.id in (select t."idMedia" from (select "idMedia", "endDate" - "initDate" as time from history where "idProfile" = :id and "mediaKind" = \'movie\' and "endDate" is not NULL order by time DESC) as t) or movie.id in (select t."idMedia" from (select "idMedia", "endDate" - "initDate" as time from history where "mediaKind" = \'movie\' and "endDate" is not NULL order by time DESC) as t) or movie.id in (select "idMedia" from calification order by rating DESC)',
                {
                    id: profileId.value,
                },
            )
            .limit(10)
            .getMany()
        return movies.asyncMap(async (movie) => {
            const actors = await this.representDB
                .createQueryBuilder('actor')
                .innerJoinAndSelect('actor.character', 'character')
                .where('actor.idMedia = :id', {
                    id: movie.id,
                })
                .getMany()
            const appear = await this.appearDB.findBy({
                idMedia: movie.id,
            })
            return new Movie(
                new MovieId(movie.id),
                new MovieTitle(movie.media.title),
                new MovieSynopsis(movie.media.synopsis),
                new ReleaseDate(movie.media.release),
                new MovieCreator(movie.media.creator),
                new MovieDirector(movie.director),
                new MovieDuration(
                    movie.durationH,
                    movie.durationM,
                    movie.durationS,
                ),
                new MovieType(movie.type),
                new ProductionCost(movie.productionCost, movie.earning),
                new Comic(movie.media.comic),
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
