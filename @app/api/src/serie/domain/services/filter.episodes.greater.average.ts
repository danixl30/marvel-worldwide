import { Serie } from '../serie'

export const filterSeriesByEpisodesGreaterthanAverage = (series: Serie[]) => {
    const average =
        series.reduce((acc, e) => acc + e.episodes.value, 0) / series.length
    return series.filter((e) => e.episodes.value > average)
}
