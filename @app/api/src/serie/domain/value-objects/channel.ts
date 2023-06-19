import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieChannel implements ValueObject<SerieChannel> {
    constructor(private readonly channel: string) {
        if (!channel) throw new Error("Invalid Series' channel")
    }

    get value() {
        return this.channel
    }

    equals(other: SerieChannel): boolean {
        return other.value === this.value
    }
}
