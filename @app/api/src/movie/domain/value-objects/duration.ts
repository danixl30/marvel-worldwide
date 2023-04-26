import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieDuration implements ValueObject<MovieDuration> {
    constructor(private readonly _hours: number, private readonly _minutes: number, private readonly _seconds: number) {
        if (
            (!this.hours && !this.minutes && !this.seconds) ||
            this.hours < 0 ||
            this.hours > 24 ||
            this.minutes < 0 ||
            this.minutes > 60 ||
            this.seconds < 0 ||
            this.seconds > 60
        ) {
            throw new Error('Invalid movie duration')
        }
    }

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
