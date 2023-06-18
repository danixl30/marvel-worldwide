import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieDuration implements ValueObject<MovieDuration> {
    constructor(
        private readonly _hours: number,
        private readonly _minutes: number,
        private readonly _seconds: number,
    ) {
        if (
            (!this.hours && !this.minutes && !this.seconds) ||
            (this.hours === 0 && this.minutes === 0 && this.seconds === 0) ||
            this.hours < 0 ||
            this.hours > 23 ||
            this.minutes < 0 ||
            this.minutes > 59 ||
            this.seconds < 0 ||
            this.seconds > 59
        ) {
            throw new Error(
                'Movie duration must be between 00:00:01 and 23:59:59',
            )
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
