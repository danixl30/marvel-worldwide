import { Actor } from './entities/actor/actor'
import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidMovieException } from './exceptions/invalid.movie'
import { MovieCreatedEvent } from './events/movie.created'
import { MovieCreator } from './value-objects/creator'
import { MovieDirector } from './value-objects/director'
import { MovieDuration } from './value-objects/duration'
import { MovieId } from './value-objects/movie.id'
import { MovieSynopsis } from './value-objects/synopsis'
import { MovieTitle } from './value-objects/title'
import { MovieType } from './value-objects/type'
import { ProductionCost } from './value-objects/production.cost'
import { ReleaseDate } from './value-objects/release.date'
import { ActorName } from './entities/actor/value-objects/actor.name'
import { ActorId } from './entities/actor/value-objects/actor.id'
import { ActorCharacter } from './entities/actor/value-objects/actor.character'
import { ActorRole } from './entities/actor/value-objects/actor.role'
import { MovieDeletedEvent } from './events/movie.deleted'
import { Rate } from './entities/rate/rate'
import { MovieRateAddedEvent } from './events/movie.rate.added'
import { MovieRateRemovedEvent } from './events/movie.rate.removed'
import { OrganizationRef } from './value-objects/organization'
import { Comic } from './value-objects/comic'

export class Movie extends AggregateRoot<MovieId> {
    constructor(
        id: MovieId,
        private _title: MovieTitle,
        private _synopsis: MovieSynopsis,
        private _release: ReleaseDate,
        private _creator: MovieCreator,
        private _director: MovieDirector,
        private _duration: MovieDuration,
        private _type: MovieType,
        private _cost: ProductionCost,
        private _basedOn: Comic,
        private _organizations: OrganizationRef[] = [],
        private _actors: Actor[] = [],
        private _rates: Rate[] = [],
    ) {
        super(id)
        this.publish(
            new MovieCreatedEvent(
                id,
                this.title,
                this.synopsis,
                this.release,
                this.creator,
                this.director,
                this.duration,
                this.type,
                this.cost,
                this.basedOn,
                this.organizations,
                this.actors,
            ),
        )
    }

    get organizations() {
        return this._organizations
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

    get rates() {
        return this._rates
    }

    get rating() {
        if (this.rates.isEmpty()) return 0
        return (
            this.rates.reduce((acc, e) => acc + e.calification.value, 0) /
            this.rates.length
        )
    }

    get director() {
        return this._director
    }

    get duration() {
        return this._duration
    }

    get cost() {
        return this._cost
    }

    get type() {
        return this._type
    }

    get actors() {
        return this._actors
    }

    get basedOn() {
        return this._basedOn
    }

    changeTitle(title: MovieTitle) {
        this._title = title
    }

    changeSynopsis(synopsis: MovieSynopsis) {
        this._synopsis = synopsis
    }

    changeReleaseDate(release: ReleaseDate) {
        this._release = release
    }

    changeDirector(director: MovieDirector) {
        this._director = director
    }

    changeDuration(duration: MovieDuration) {
        this._duration = duration
    }

    changeCost(cost: ProductionCost) {
        this._cost = cost
    }

    changeType(type: MovieType) {
        this._type = type
    }

    changeCreator(creator: MovieCreator) {
        this._creator = creator
    }

    changeBasedOn(basedOn: Comic) {
        this._basedOn = basedOn
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
        if (this.actors.find((e) => e.equals(actor.id)))
            throw new Error('Actor already exist')
        this._actors.push(actor)
    }

    removeActor(actorId: ActorId) {
        this._actors = this.actors.filter((e) => !e.equals(actorId))
    }

    addRate(rate: Rate) {
        if (this.rates.find((e) => e.equals(rate.id)))
            throw new Error('Rate already exist')
        this._rates.push(rate)
        this.publish(new MovieRateAddedEvent(this.id, rate))
    }

    removeRate(rate: Rate) {
        this._rates = this.rates.filter((e) => !e.equals(rate.id))
        this.publish(new MovieRateRemovedEvent(this.id, rate))
    }

    addOrganization(organization: OrganizationRef) {
        if (this.organizations.find((e) => e.equals(organization)))
            throw new Error('Organization already exist')
        this._organizations.push(organization)
    }

    removeOrganization(organization: OrganizationRef) {
        this._organizations = this.organizations.filter(
            (e) => !e.equals(organization),
        )
    }

    delete() {
        this.publish(new MovieDeletedEvent(this.id))
    }

    validateState(): void {
        if (
            !this.id ||
            !this.title ||
            !this.synopsis ||
            !this.release ||
            !this.director ||
            !this.duration ||
            !this.cost ||
            !this.type ||
            !this.actors ||
            !this.basedOn ||
            !this.creator ||
            !this.rating
        ) {
            throw new InvalidMovieException()
        }
    }
}
