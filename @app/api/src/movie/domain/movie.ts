import { Actor } from './entities/actor/actor'
import { AggregateRoot } from 'src/core/domain/aggregates/aggregate.root'
import { Comic } from './entities/comic/comic'
import { InvalidMovieException } from './exceptions/invalid.movie'
import { MovieCreatedEvent } from './events/movie.created'
import { MovieCreator } from './value-objects/creator'
import { MovieDirector } from './value-objects/director'
import { MovieDuration } from './value-objects/duration'
import { MovieId } from './value-objects/movie.id'
import { MovieRating } from './value-objects/rating'
import { MovieSynopsis } from './value-objects/synopsis'
import { MovieTitle } from './value-objects/title'
import { MovieType } from './value-objects/type'
import { ProductionCost } from './value-objects/production.cost'
import { ReleaseDate } from './value-objects/release.date'

export class Movie extends AggregateRoot<MovieId> {
    constructor(
        id: MovieId,
        private _title: MovieTitle,
        private _synopsis: MovieSynopsis,
        private _release: ReleaseDate,
        private _creator: MovieCreator,
        private _rating: MovieRating,
        private _director: MovieDirector,
        private _duration: MovieDuration,
        private _type: MovieType,
        private _cost: ProductionCost,
        private _basedOn: Comic,
        private _actors: Actor[] = [],
    ) {
        super(id)
        this.publish(
            new MovieCreatedEvent(
                id,
                this.title,
                this.synopsis,
                this.release,
                this.creator,
                this.rating,
                this.director,
                this.duration,
                this.type,
                this.cost,
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
