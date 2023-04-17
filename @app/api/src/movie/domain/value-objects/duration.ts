import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieDuration implements ValueObject<MovieDuration> {
    constructor(
        private readonly _hours: number,
        private readonly _minutes: number,
        private readonly _seconds: number,
    ) {}

    get hours() {
        return this._hours
    }

    get minutes() {
        return this._minutes
    }

    get seconds() {
        return this._seconds
    }

    get value() {
        return `${this.hours}:${this.minutes}:${this.seconds}`
    }

    equals(other: MovieDuration): boolean {
        return other.value === this.value
    }
}
