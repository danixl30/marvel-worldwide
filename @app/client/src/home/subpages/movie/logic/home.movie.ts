import { OnInitJob } from '../../../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../../../core/application/router/router.manager'
import { MOVIE_DETAILS } from '../../../../details-movie/page/page'
import { getMovieTop10HistoryApplicationService } from '../application/get.top.10.history'
import { getMovieTrendingApplicationService } from '../application/get.trending.movies'

export const movieHomeLogic = (
    onInitJob: OnInitJob,
    getMovieTrendingService: ReturnType<
        typeof getMovieTrendingApplicationService
    >,
    getMoviesTop10HistoryService: ReturnType<
        typeof getMovieTop10HistoryApplicationService
    >,
    navigation: NavigationManager,
) => {
    const moviesTrendingJob = onInitJob(() =>
        getMovieTrendingService.execute(undefined),
    )

    const moviesHistoryJob = onInitJob(() =>
        getMoviesTop10HistoryService.execute(undefined),
    )

    const onClickMovie = (id: string) =>
        navigation.goTo(MOVIE_DETAILS.replace(':id', id))

    return {
        dataTrending: moviesTrendingJob.data,
        errorTrending: moviesTrendingJob.error,
        isLoadingTrending: moviesTrendingJob.isLoading,
        dataHistory: moviesHistoryJob.data,
        errorHistory: moviesHistoryJob.error,
        isLoadingHistory: moviesHistoryJob.isLoading,
        onClickMovie,
    }
}
