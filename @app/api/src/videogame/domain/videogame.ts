import { Actor } from 'src/movie/domain/entities/actor/actor'
import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Comic } from 'src/movie/domain/entities/comic/comic'
import { ReleaseDate } from './value-objects/release.date'
import { VideogameCreator } from './value-objects/creator'
import { VideogameId } from './value-objects/id'
import { VideogamePlatform } from './value-objects/platform'
import { VideogameRating } from './value-objects/rating'
import { VideogameSynopsis } from './value-objects/synopsis'
import { VideogameTitle } from './value-objects/title'
import { VideogameType } from './value-objects/type'

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

    validateState(): void {}
}
