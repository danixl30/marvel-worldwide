import { Actor } from '../entities/actor/actor'
import { DomainEvent } from 'src/core/domain/events/event'
import { MovieCreator } from '../value-objects/creator'
import { MovieDirector } from '../value-objects/director'
import { MovieDuration } from '../value-objects/duration'
import { MovieId } from '../value-objects/movie.id'
import { MovieSynopsis } from '../value-objects/synopsis'
import { MovieTitle } from '../value-objects/title'
import { MovieType } from '../value-objects/type'
import { ProductionCost } from '../value-objects/production.cost'
import { ReleaseDate } from '../value-objects/release.date'
import { OrganizationRef } from '../value-objects/organization'
import { Comic } from '../value-objects/comic'

export class MovieCreatedEvent extends DomainEvent {
    constructor(
        private _id: MovieId,
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
    ) {
        super()
    }

    get organizations() {
        return this._organizations
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
}
