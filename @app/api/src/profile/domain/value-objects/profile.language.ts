import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ProfileLanguage implements ValueObject<ProfileLanguage> {
    constructor(private readonly language: string) {}

    get value() {
        return this.language
    }

    equals(other: ProfileLanguage): boolean {
        return other.value === this.value
    }
}
