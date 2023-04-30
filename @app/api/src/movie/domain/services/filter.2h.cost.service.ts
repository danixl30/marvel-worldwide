import { Movie } from '../movie'
import { MovieDuration } from '../value-objects/duration'

const checkIfDurationGreaterThan2H30M = (duration: MovieDuration) => {
    if (duration.hours <= 2 && duration.minutes <= 30) return false
    return true
}

export const filterMoviesByDurationGreaterThan2H30MAndGreaterThanAverageCost = (
    movies: Movie[],
) => {
    const averageCost =
        movies.reduce((acc, e) => acc + e.cost.cost, 0) / movies.length
    return movies
        .filter(
            (movie) =>
                movie.cost.cost > averageCost &&
                checkIfDurationGreaterThan2H30M(movie.duration),
        )
        .toSorted((a, b) => a.cost.cost - b.cost.cost)
}
