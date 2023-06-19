import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieEpisodes implements ValueObject<SerieEpisodes> {
    constructor(private readonly episodes: number) {
        if (!episodes || episodes <= 1)
            throw new Error(
                'Number of episodes cannot be null. Also, must be greater than or equal to 1',
            )
    }

    get value() {
        return this.episodes
    }

    equals(other: SerieEpisodes): boolean {
        return other.value === this.value
    }
}
