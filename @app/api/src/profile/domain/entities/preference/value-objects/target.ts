import { ValueObject } from 'src/core/domain/value-objects/value.object'

export enum MediaType {
    MOVIE = 'MOVIE',
    SERIE = 'SERIE',
    VIDEOGAME = 'VIDEOGAME',
}

export class PreferenceTarget implements ValueObject<PreferenceTarget> {
    constructor(
        private readonly _platform: string,
        private readonly _kind: string,
    ) {
        if (!this.platform || !this.kind)
            throw new Error('Invalid preference target')
    }

    get platform() {
        return this._platform
    }

    get kind() {
        return this._kind
    }

    get value() {
        return this.platform + ': ' + this.kind
    }

    equals(other: PreferenceTarget): boolean {
        return other.value === this.value
    }
}
