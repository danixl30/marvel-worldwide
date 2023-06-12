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
    ) {}
    async save(aggregate: Videogame): Promise<void> {
        await this.videogameDB.upsert(
            this.videogameDB.create({
                id: aggregate.id.value,
                title: aggregate.title.value,
                synopsis: aggregate.synopsis.value,
                release: aggregate.release.value,
                type: aggregate.type.value,
                comic: aggregate.basedOn.value,
                creator: aggregate.creator.value,
            }),
            ['id'],
        )
        await this.developDB.delete({
            idVideogame: aggregate.id.value,
        })
        await this.representDB.delete({
            idVideogame: aggregate.id.value,
        })
        await this.appearDB.delete({
            idVideogame: aggregate.id.value,
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
                    idVillain:
                        actor.character.kind === 'villain'
                            ? actor.character.id
                            : undefined,
                    idHeroe:
                        actor.character.kind === 'heroe'
                            ? actor.character.id
                            : undefined,

                    type: actor.role.value,
                    idVideogame: aggregate.id.value,
                }),
            ),
        )
        await aggregate.organizations.asyncForEach(async (organization) =>
            this.appearDB.insert(
                this.appearDB.create({
                    idVideogame: aggregate.id.value,
                    idOrganization: organization.value,
                    type: '',
                }),
            ),
        )
    }

    async delete(aggregate: Videogame): Promise<void> {
        await this.videogameDB.delete({
            id: aggregate.id.value,
        })
        await this.developDB.delete({
            idVideogame: aggregate.id.value,
        })
        await this.representDB.delete({
            idVideogame: aggregate.id.value,
        })
        await this.appearDB.delete({
            idVideogame: aggregate.id.value,
        })
        await this.platformDB.delete({
            idVideogame: aggregate.id.value,
        })
    }

    async getById(id: VideogameId): Promise<Optional<Videogame>> {
        const videogame = await this.videogameDB.findOneBy({
            id: id.value,
        })
        if (!videogame) return null
        const actors = await this.representDB.findBy({
            idVideogame: id.value,
        })
        const appear = await this.appearDB.findBy({
            idVideogame: id.value,
        })
        const platforms = await this.platformDB.findBy({
            idVideogame: videogame.id,
        })
        return new Videogame(
            id,
            new VideogameTitle(videogame.title),
            new VideogameSynopsis(videogame.synopsis),
            new ReleaseDate(videogame.release),
            new VideogameCreator(videogame.creator),
            new VideogameType(videogame.type),
            new Comic(videogame.comic),
            appear.map((e) => new OrganizationRef(e.idOrganization, e.type)),
            platforms.map((e) => new VideogamePlatform(e.name)),
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

    async getAtLeast2WeeksNearRelease(): Promise<Videogame[]> {
        const videogames = await this.videogameDB
            .createQueryBuilder()
            .andWhere({
                release: 'BETWEEN (NOW() - INTERVAL 14 DAY) AND NOW()',
            })
            .orderBy('release', 'DESC')
            .getMany()
        return videogames.asyncMap(async (videogame) => {
            const actors = await this.representDB.findBy({
                idVideogame: videogame.id,
            })
            const appear = await this.appearDB.findBy({
                idVideogame: videogame.id,
            })
            const platforms = await this.platformDB.findBy({
                idVideogame: videogame.id,
            })
            return new Videogame(
                new VideogameId(videogame.id),
                new VideogameTitle(videogame.title),
                new VideogameSynopsis(videogame.synopsis),
                new ReleaseDate(videogame.release),
                new VideogameCreator(videogame.creator),
                new VideogameType(videogame.type),
                new Comic(videogame.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                platforms.map((e) => new VideogamePlatform(e.name)),
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

    async getTrending(profileId: ProfileId): Promise<Videogame[]> {
        return []
    }

    async getByCriteria(criteria: SearchByCriteriaDTO): Promise<Videogame[]> {
        const videogames = await this.videogameDB
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
        return videogames.asyncMap(async (videogame) => {
            const actors = await this.representDB.findBy({
                idVideogame: videogame.id,
            })
            const appear = await this.appearDB.findBy({
                idVideogame: videogame.id,
            })
            const platforms = await this.platformDB.findBy({
                idVideogame: videogame.id,
            })
            return new Videogame(
                new VideogameId(videogame.id),
                new VideogameTitle(videogame.title),
                new VideogameSynopsis(videogame.synopsis),
                new ReleaseDate(videogame.release),
                new VideogameCreator(videogame.creator),
                new VideogameType(videogame.type),
                new Comic(videogame.comic),
                appear.map(
                    (e) => new OrganizationRef(e.idOrganization, e.type),
                ),
                platforms.map((e) => new VideogamePlatform(e.name)),
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
