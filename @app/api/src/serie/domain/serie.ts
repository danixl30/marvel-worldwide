import { Actor } from 'src/movie/domain/entities/actor/actor'
import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { InvalidSerieException } from './exceptions/invalid.serie'
import { ReleaseDate } from './value-objects/release.date'
import { SerieChannel } from './value-objects/channel'
import { SerieCreatedEvent } from './events/serie.created'
import { SerieCreator } from './value-objects/creator'
import { SerieEpisodes } from './value-objects/episodes'
import { SerieId } from './value-objects/id'
import { SerieSynopsis } from './value-objects/synopsis'
import { SerieTitle } from './value-objects/title'
import { SerieType } from './value-objects/type'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'
import { SerieDeletedEvent } from './events/serie.deleted'
import { Rate } from 'src/movie/domain/entities/rate/rate'
import { SerieRateAddedEvent } from './events/serie.rate.added'
import { SerieRateRemovedEvent } from './events/serie.rate.removed'
import { OrganizationRef } from 'src/movie/domain/value-objects/organization'
import { Comic } from 'src/movie/domain/value-objects/comic'

export class Serie extends AggregateRoot<SerieId> {
    constructor(
        id: SerieId,
        private _title: SerieTitle,
        private _synopsis: SerieSynopsis,
        private _release: ReleaseDate,
        private _creator: SerieCreator,
        private _type: SerieType,
        private _episodes: SerieEpisodes,
        private _channel: SerieChannel,
        private _basedOn: Comic,
        private _organizations: OrganizationRef[] = [],
        private _actors: Actor[] = [],
        private _rates: Rate[] = [],
    ) {
        super(id)
        this.publish(
            new SerieCreatedEvent(
                id,
                this.title,
                this.synopsis,
                this.release,
                this.creator,
                this.type,
                this.episodes,
                this.channel,
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
        if (this.rates.isEmpty()) return 1
        return (
            this.rates.reduce((acc, e) => acc + e.calification.value, 0) /
            this.rates.length
        )
    }

    get type() {
        return this._type
    }

    get actors() {
        return this._actors
    }

    get episodes() {
        return this._episodes
    }

    get channel() {
        return this._channel
    }

    get basedOn() {
        return this._basedOn
    }

    changeTitle(title: SerieTitle) {
        this._title = title
    }

    changeSynopsis(synopsis: SerieSynopsis) {
        this._synopsis = synopsis
    }

    changeReleaseDate(release: ReleaseDate) {
        this._release = release
    }

    changeType(type: SerieType) {
        this._type = type
    }

    changeChannel(channel: SerieChannel) {
        this._channel = channel
    }

    changeEpisodes(episodes: SerieEpisodes) {
        this._episodes = episodes
    }

    changeCreator(creator: SerieCreator) {
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
        this.publish(new SerieRateAddedEvent(this.id, rate))
    }

    removeRate(rate: Rate) {
        this._rates = this.rates.filter((e) => !e.equals(rate.id))
        this.publish(new SerieRateRemovedEvent(this.id, rate))
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
        this.publish(new SerieDeletedEvent(this.id))
    }

    validateState(): void {
        if (
            !this.type ||
            !this.id ||
            !this.title ||
            !this.episodes ||
            !this.synopsis ||
            !this.release ||
            !this.basedOn ||
            !this.channel ||
            !this.creator
        )
            throw new InvalidSerieException()
    }
}
