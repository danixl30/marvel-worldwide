import { Actor } from 'src/movie/domain/entities/actor/actor'
import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { InvalidVideogameException } from './exceptions/invalid.videogame'
import { ReleaseDate } from './value-objects/release.date'
import { VideogameCreatedEvent } from './events/videogame.created'
import { VideogameCreator } from './value-objects/creator'
import { VideogameId } from './value-objects/id'
import { VideogamePlatform } from './value-objects/platform'
import { VideogameRating } from './value-objects/rating'
import { VideogameSynopsis } from './value-objects/synopsis'
import { VideogameTitle } from './value-objects/title'
import { VideogameType } from './value-objects/type'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'

export class Videogame extends AggregateRoot<VideogameId> {
    constructor(
        id: VideogameId,
        private _title: VideogameTitle,
        private _synopsis: VideogameSynopsis,
        private _release: ReleaseDate,
        private _creator: VideogameCreator,
        private _rating: VideogameRating,
        private _type: VideogameType,
        private _basedOn: Comic,
        private _platforms: VideogamePlatform[] = [],
        private _actors: Actor[] = [],
    ) {
        super(id)
        this.publish(
            new VideogameCreatedEvent(
                id,
                this.title,
                this.synopsis,
                this.release,
                this.creator,
                this.rating,
                this.type,
                this.basedOn,
                this.platforms,
                this.actors,
            ),
        )
    }

    get title() {
        return this._title
    }

    get synopsis() {
        return this._synopsis
    }

    get release() {
        return this._release
    }

    get creator() {
        return this._creator
    }

    get rating() {
        return this._rating
    }

    get type() {
        return this._type
    }

    get actors() {
        return this._actors
    }

    get platforms() {
        return this._platforms
    }

    get basedOn() {
        return this._basedOn
    }

    changeTitle(title: VideogameTitle) {
        this._title = title
    }

    changeSynopsis(synopsis: VideogameSynopsis) {
        this._synopsis = synopsis
    }

    changeReleaseDate(release: ReleaseDate) {
        this._release = release
    }

    changeType(type: VideogameType) {
        this._type = type
    }

    changeCreator(creator: VideogameCreator) {
        this._creator = creator
    }

    changeBasedOn(basedOn: Comic) {
        this._basedOn = basedOn
    }

    addPlatForm(platform: VideogamePlatform) {
        if (this.platforms.find((e) => e.equals(platform))) throw new Error('Platform already exist')
        this._platforms.push(platform)
    }

    removePlatform(platform: VideogamePlatform) {
        this._platforms = this.platforms.filter((e) => !e.equals(platform))
    }

    changeActorName(id: ActorId, name: ActorName) {
        const actor = this.actors.find((e) => e.id.equals(id))
        if (!actor) throw new Error('Actor not found')
        actor.changeName(name)
    }

    changeActorCharacter(id: ActorId, character: ActorCharacter) {
        const actor = this.actors.find((e) => e.id.equals(id))
        if (!actor) throw new Error('Actor not found')
        actor.changeCharacter(character)
    }

    changeActorRole(id: ActorId, role: ActorRole) {
        const actor = this.actors.find((e) => e.id.equals(id))
        if (!actor) throw new Error('Actor not found')
        actor.changeRole(role)
    }

    addActor(actor: Actor) {
        if (this.actors.find((e) => e.equals(actor.id))) throw new Error('Actor already exist')
        this._actors.push(actor)
    }

    removeActor(actorId: ActorId) {
        this._actors = this.actors.filter((e) => !e.equals(actorId))
    }

    validateState(): void {
        if (
            !this.id ||
            !this.title ||
            !this.synopsis ||
            !this.basedOn ||
            !this.release ||
            !this.rating ||
            !this.creator ||
            !this.type ||
            !this.platforms ||
            !this.actors
        )
            throw new InvalidVideogameException()
    }
}
