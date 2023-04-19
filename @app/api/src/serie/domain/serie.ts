import { Actor } from 'src/movie/domain/entities/actor/actor'
import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { InvalidSerieException } from './exceptions/invalid.serie'
import { ReleaseDate } from './value-objects/release.date'
import { SerieChannel } from './value-objects/channel'
import { SerieCreator } from './value-objects/creator'
import { SerieEpisodes } from './value-objects/episodes'
import { SerieId } from './value-objects/id'
import { SerieRating } from './value-objects/rating'
import { SerieSynopsis } from './value-objects/synopsis'
import { SerieTitle } from './value-objects/title'
import { SerieType } from './value-objects/type'

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
