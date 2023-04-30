import { Actor } from 'src/movie/domain/entities/actor/actor'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { DomainEvent } from 'src/core/domain/events/event'
import { ReleaseDate } from '../value-objects/release.date'
import { SerieChannel } from '../value-objects/channel'
import { SerieCreator } from '../value-objects/creator'
import { SerieEpisodes } from '../value-objects/episodes'
import { SerieId } from '../value-objects/id'
import { SerieSynopsis } from '../value-objects/synopsis'
import { SerieTitle } from '../value-objects/title'
import { SerieType } from '../value-objects/type'

export class SerieCreatedEvent extends DomainEvent {
    constructor(
        private _id: SerieId,
        private _title: SerieTitle,
        private _synopsis: SerieSynopsis,
        private _release: ReleaseDate,
        private _creator: SerieCreator,
        private _type: SerieType,
        private _episodes: SerieEpisodes,
        private _channel: SerieChannel,
        private _basedOn: Comic,
        private _actors: Actor[] = [],
    ) {
        super()
    }

    get id() {
        return this._id
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
}
