import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class VideogameType implements ValueObject<VideogameType> {
    private readonly videogameTypes: string[] = [
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
    constructor(private readonly type: string) {
        if (!type) throw new Error('Invalid Videogame type')
        if (!this.videogameTypes.find((e) => e === type))
            throw new Error(
                'Invalid videogame type.' +
                    'Valid types: ' +
                    this.videogameTypes,
            )
    }

    get value() {
        return this.type
    }

    equals(other: VideogameType): boolean {
        return other.value === this.value
    }
}
