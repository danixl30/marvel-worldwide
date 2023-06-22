import { ValueObject } from 'src/core/domain/value-objects/value.object'

export const videogameTypes = [
    'action',
    'adventure',
    'arcade',
    'fighter',
    'sports',
    'strategy',
    'card-collection',
    'role-playing',
    'tabletop',
    'platformer',
    'other',
]
export class VideogameType implements ValueObject<VideogameType> {
    constructor(private readonly type: string) {
        if (!type) throw new Error('Invalid Videogame type')
        if (!videogameTypes.find((e) => e === type))
            throw new Error(
                'Invalid videogame type.' + 'Valid types: ' + videogameTypes,
            )
    }

    get value() {
        return this.type
    }

    equals(other: VideogameType): boolean {
        return other.value === this.value
    }
}
