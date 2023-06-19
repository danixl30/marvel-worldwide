import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieType implements ValueObject<SerieType> {
    private readonly serieTypes: string[] = [
        '2D animation   ',
        '3D animation',
        'live-action',
        'stop-motion',
        'hybrid',
        'children',
        'other',
    ]
    constructor(private readonly type: string) {
        if (!type) throw new Error("Series' type cannot be null")
        if (!this.serieTypes.find((e) => e === type))
            throw new Error(
                "Invalid series' type." + 'Valid types: ' + this.serieTypes,
            )
    }

    get value() {
        return this.type
    }

    equals(other: SerieType): boolean {
        return other.value === this.value
    }
}
