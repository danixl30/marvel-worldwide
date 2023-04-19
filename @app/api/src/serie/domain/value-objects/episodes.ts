import { ValueObject } from 'src/core/domain/value-objects/value.object'

export class SerieEpisodes implements ValueObject<SerieEpisodes> {
    constructor(private readonly episodes: number) {
        if (!episodes || episodes < 1) throw new Error('Invalid episodes')
    }

    get value() {
        return this.episodes
    }

    equals(other: SerieEpisodes): boolean {
        return other.value === this.value
    }
}
