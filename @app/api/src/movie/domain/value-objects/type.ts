import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class MovieType implements ValueObject<MovieType> {
    private readonly movieTypes: string[] = [
        '2D animation',
        '3D animation',
        'live-action',
        'stop-motion',
        'hybrid',
        'other',
    ]
    constructor(private readonly type: string) {
        if (!type) throw new Error('Movie type cannot be null')
        if (!this.movieTypes.find((e) => e === type))
            throw new Error(
                'Invalid movie type.' + 'Valid types: ' + this.movieTypes,
            )
    }

    get value() {
        return this.type
    }

    equals(other: MovieType): boolean {
        return other.value === this.value
    }
}
