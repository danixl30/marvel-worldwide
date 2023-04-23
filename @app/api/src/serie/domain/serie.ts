import { Actor } from 'src/movie/domain/entities/actor/actor'
import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { InvalidSerieException } from './exceptions/invalid.serie'
import { ReleaseDate } from './value-objects/release.date'
import { SerieChannel } from './value-objects/channel'
import { SerieCreatedEvent } from './events/serie.created'
import { SerieCreator } from './value-objects/creator'
import { SerieEpisodes } from './value-objects/episodes'
import { SerieId } from './value-objects/id'
import { SerieRating } from './value-objects/rating'
import { SerieSynopsis } from './value-objects/synopsis'
import { SerieTitle } from './value-objects/title'
import { SerieType } from './value-objects/type'
import { ActorId } from 'src/movie/domain/entities/actor/value-objects/actor.id'
import { ActorName } from 'src/movie/domain/entities/actor/value-objects/actor.name'
import { ActorCharacter } from 'src/movie/domain/entities/actor/value-objects/actor.character'
import { ActorRole } from 'src/movie/domain/entities/actor/value-objects/actor.role'

export class Serie extends AggregateRoot<SerieId> {
    constructor(
        id: SerieId,
        private _title: SerieTitle,
        private _synopsis: SerieSynopsis,
        private _release: ReleaseDate,
        private _creator: SerieCreator,
        private _rating: SerieRating,
        private _type: SerieType,
        private _episodes: SerieEpisodes,
        private _channel: SerieChannel,
        private _basedOn: Comic,
        private _actors: Actor[] = [],
    ) {
        super(id)
        this.publish(
            new SerieCreatedEvent(
                id,
                this.title,
                this.synopsis,
                this.release,
                this.creator,
                this.rating,
                this.type,
                this.episodes,
                this.channel,
                this.basedOn,
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

    validateState(): void {
        if (
            !this.type ||
            !this.id ||
            !this.title ||
            !this.episodes ||
            !this.synopsis ||
            !this.release ||
            !this.basedOn ||
            !this.rating ||
            !this.channel ||
            !this.creator
        )
            throw new InvalidSerieException()
    }
}
