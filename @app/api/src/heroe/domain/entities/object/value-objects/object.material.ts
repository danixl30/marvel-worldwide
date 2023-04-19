import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class ObjectMaterial implements ValueObject<ObjectMaterial> {
    constructor(private readonly material: string) {
        if (!material) throw new Error('Inavlid material')
    }

    get value() {
        return this.material
    }

    equals(other: ObjectMaterial): boolean {
        return other.value === this.value
    }
}
