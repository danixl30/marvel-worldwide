import { ValueObject } from 'src/core/domain/value-objects/value.object'

export const movieTypes = [
    '2D animation',
    '3D animation',
    'live-action',
    'stop-motion',
    'hybrid',
    'other',
]
export class MovieType implements ValueObject<MovieType> {
    constructor(private readonly type: string) {
        if (!type) throw new Error('Movie type cannot be null')
        if (!movieTypes.find((e) => e === type))
            throw new Error(
                'Invalid movie type.' + 'Valid types: ' + movieTypes,
            )
    }

    get value() {
        return this.type
    }

    equals(other: MovieType): boolean {
        return other.value === this.value
    }
}
