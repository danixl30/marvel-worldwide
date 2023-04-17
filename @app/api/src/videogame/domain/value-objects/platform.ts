import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogamePlatform implements ValueObject<VideogamePlatform> {
    constructor(private readonly platform: string) {}

    get value() {
        return this.platform
    }

    equals(other: VideogamePlatform): boolean {
        return other.value === this.value
    }
}
