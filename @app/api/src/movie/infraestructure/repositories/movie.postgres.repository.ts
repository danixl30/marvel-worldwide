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
    ) {}

    async save(aggregate: Movie): Promise<void> {
        await this.movieDB.upsert(
            this.movieDB.create({
                id: aggregate.id.value,
                title: aggregate.title.value,
                synopsis: aggregate.synopsis.value,
                release: aggregate.release.value,
                director: aggregate.director.value,
                durationH: aggregate.duration.hours,
                durationM: aggregate.duration.minutes,
                durationS: aggregate.duration.seconds,
                distribuitor: aggregate.creator.value,
                productionCost: aggregate.cost.cost,
                earning: aggregate.cost.earning,
                productor: aggregate.creator.value,
                type: aggregate.type.value,
                comic: aggregate.basedOn.value,
                creator: aggregate.creator.value,
            }),
            ['id'],
        )
        await this.developDB.delete({
            idMovie: aggregate.id.value,
        })
        await this.representDB.delete({
            idMovie: aggregate.id.value,
        })
        await this.appearDB.delete({
            idMovie: aggregate.id.value,
        })
        await aggregate.actors.asyncForEach(async (actor) =>
            this.representDB.insert(
                this.representDB.create({
                    id: actor.id.value,
                    idVillain:
                        actor.character.kind === 'villain'
                            ? actor.character.id
                            : undefined,
                    idHeroe:
                        actor.character.kind === 'heroe'
                            ? actor.character.id
                            : undefined,
                    type: actor.role.value,
                    idMovie: aggregate.id.value,
                }),
            ),
        )
        await aggregate.organizations.asyncForEach(async (organization) =>
            this.appearDB.insert(
                this.appearDB.create({
                    idMovie: aggregate.id.value,
                    idOrganization: organization.value,
                    type: '',
                }),
            ),
        )
    }

    async delete(aggregate: Movie): Promise<void> {
        await this.developDB.delete({
            idMovie: aggregate.id.value,
        })
        await this.representDB.delete({
            idMovie: aggregate.id.value,
        })
        await this.appearDB.delete({
            idMovie: aggregate.id.value,
        })
        await this.movieDB.delete({
            id: aggregate.id.value,
        })
    }

    async getById(id: MovieId): Promise<Optional<Movie>> {
        const actors = await this.representDB.findBy({
            idMovie: id.value,
        })
        const appear = await this.appearDB.findBy({
            idMovie: id.value,
        })
        const movie = await this.movieDB.findOneBy({
            id: id.value,
        })
        if (!movie) return null
        return new Movie(
            new MovieId(movie.id),
            new MovieTitle(movie.title),
            new MovieSynopsis(movie.synopsis),
            new ReleaseDate(movie.release),
            new MovieCreator(movie.creator),
            new MovieDirector(movie.director),
            new MovieDuration(
                movie.durationH,
                movie.durationM,
                movie.durationS,
            ),
            new MovieType(movie.type),
            new ProductionCost(movie.productionCost, movie.earning),
            new Comic(movie.comic),
            appear.map((e) => new OrganizationRef(e.idOrganization, e.type)),
            actors.map(
                (e) =>
                    new Actor(
                        new ActorId(e.id),
                        new ActorName(e.firstName, e.lastName),
                        new ActorCharacter(
                            e.idHeroe || e.idVillain || '',
                            e.idHeroe ? 'heroe' : 'villain',
                        ),
                        new ActorRole(e.type),
                    ),
            ),
        )
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Movie[]> {
        const movies = await this.movieDB
            .createQueryBuilder()
            .limit(criteria.pagination?.limit || 10)
            .skip(
                (criteria.pagination?.page || 1) -
                    1 * (criteria.pagination?.limit || 0),
            )
            .andWhere({
                title: criteria.term,
            })
            .getMany()

        return movies.asyncMap(async (movie) => {
            const actors = await this.representDB.findBy({
                idMovie: movie.id,
            })
            const appear = await this.appearDB.findBy({
                idMovie: movie.id,
            })
            return new Movie(
                new MovieId(movie.id),
                new MovieTitle(movie.title),
                new MovieSynopsis(movie.synopsis),
                new ReleaseDate(movie.release),
                new MovieCreator(movie.creator),
                new MovieDirector(movie.director),
                new MovieDuration(
                    movie.durationH,
                    movie.durationM,
                    movie.durationS,
                ),
                new MovieType(movie.type),
                new ProductionCost(movie.productionCost, movie.earning),
                new Comic(movie.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(
                                e.idHeroe || e.idVillain || '',
                                e.idHeroe ? 'heroe' : 'villain',
                            ),
                            new ActorRole(e.type),
                        ),
                ),
            )
        })
    }

    async getAtLeast2WeeksNearRelease(): Promise<Movie[]> {
        const movies = await this.movieDB
            .createQueryBuilder()
            .andWhere({
                release: 'BETWEEN (NOW() - INTERVAL 14 DAY) AND NOW()',
            })
            .orderBy('release', 'DESC')
            .getMany()
        return movies.asyncMap(async (movie) => {
            const actors = await this.representDB.findBy({
                idMovie: movie.id,
            })
            const appear = await this.appearDB.findBy({
                idMovie: movie.id,
            })
            return new Movie(
                new MovieId(movie.id),
                new MovieTitle(movie.title),
                new MovieSynopsis(movie.synopsis),
                new ReleaseDate(movie.release),
                new MovieCreator(movie.creator),
                new MovieDirector(movie.director),
                new MovieDuration(
                    movie.durationH,
                    movie.durationM,
                    movie.durationS,
                ),
                new MovieType(movie.type),
                new ProductionCost(movie.productionCost, movie.earning),
                new Comic(movie.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(
                                e.idHeroe || e.idVillain || '',
                                e.idHeroe ? 'heroe' : 'villain',
                            ),
                            new ActorRole(e.type),
                        ),
                ),
            )
        })
    }

    async getByType(type: MovieType): Promise<Movie[]> {
        const movies = await this.movieDB
            .createQueryBuilder()
            .andWhere({
                type: type.value,
            })
            .getMany()

        return movies.asyncMap(async (movie) => {
            const actors = await this.representDB.findBy({
                idMovie: movie.id,
            })
            const appear = await this.appearDB.findBy({
                idMovie: movie.id,
            })
            return new Movie(
                new MovieId(movie.id),
                new MovieTitle(movie.title),
                new MovieSynopsis(movie.synopsis),
                new ReleaseDate(movie.release),
                new MovieCreator(movie.creator),
                new MovieDirector(movie.director),
                new MovieDuration(
                    movie.durationH,
                    movie.durationM,
                    movie.durationS,
                ),
                new MovieType(movie.type),
                new ProductionCost(movie.productionCost, movie.earning),
                new Comic(movie.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                actors.map(
                    (e) =>
                        new Actor(
                            new ActorId(e.id),
                            new ActorName(e.firstName, e.lastName),
                            new ActorCharacter(
                                e.idHeroe || e.idVillain || '',
                                e.idHeroe ? 'heroe' : 'villain',
                            ),
                            new ActorRole(e.type),
                        ),
                ),
            )
        })
    }

    async getTrending(profileId: ProfileId): Promise<Movie[]> {
        return []
    }

    async getActorByName(name: ActorName): Promise<Optional<Actor>> {
        const participation = await this.representDB.findOneByOrFail({
            firstName: name.firstName,
            lastName: name.lastName,
        })
        const actor = participation
        return new Actor(
            new ActorId(actor.id),
            new ActorName(actor.firstName, actor.lastName),
            new ActorCharacter(
                actor.idHeroe || actor.idVillain || '',
                actor.idHeroe ? 'heroe' : 'villain',
            ),
            new ActorRole(participation.type),
        )
    }
}
