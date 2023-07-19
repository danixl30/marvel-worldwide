import { ApplicationService } from '../../core/application/service/application-service'
import { MovieRepository } from '../../movie/application/repositories/movie.repository'
import { SerieRepository } from '../../serie/application/repositories/serie.repository'
import { VideogameRepository } from '../../videogames/application/repositories/videogame.repository'

export const getMedias2WApplicationService = (
    movieRepository: MovieRepository,
    serieRepository: SerieRepository,
    videogameRepository: VideogameRepository,
): ApplicationService<
    undefined,
    {
        id: string
        title: string
        synopsis: string
        rating: number
        kind: string
    }[]
> => {
    const execute = async () => {
        const movies = await movieRepository.getLast2Weeks()
        const series = await serieRepository.getLast2Weeks()
        const videogames = await videogameRepository.getLast2Weeks()
        return [
            ...movies.map((e) => ({
                ...e,
                kind: 'movie',
            })),
            ...series.map((e) => ({
                ...e,
                kind: 'serie',
            })),
            ...videogames.map((e) => ({
                ...e,
                kind: 'videogame',
            })),
        ].toSorted((a, b) => b.rating - a.rating)
    }

    return {
        execute,
    }
}
