import { OnInitJob } from '../../../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../../../core/application/router/router.manager'
import { getVideogamesTop10HistoryApplicationService } from '../application/get.top.10.history'
import { getVideogamesTrendingApplicationService } from '../application/get.trending.videogames'
import { VIDEOGAME_DETIALS } from '../../../../details-videogame/page/page'

export const videogameHomeLogic = (
    onInitJob: OnInitJob,
    getVideogameTrendingService: ReturnType<
        typeof getVideogamesTrendingApplicationService
    >,
    getVideogamesTop10HistoryService: ReturnType<
        typeof getVideogamesTop10HistoryApplicationService
    >,
    navigation: NavigationManager,
) => {
    const videogamesTrendingJob = onInitJob(() =>
        getVideogameTrendingService.execute(undefined),
    )

    const videogamesHistory = onInitJob(() =>
        getVideogamesTop10HistoryService.execute(undefined),
    )

    const onClickVideogame = (id: string) =>
        navigation.goTo(VIDEOGAME_DETIALS.replace(':id', id))

    return {
        dataTrending: videogamesTrendingJob.data,
        errorTrending: videogamesTrendingJob.error,
        isLoadingTrending: videogamesTrendingJob.isLoading,
        dataHistory: videogamesHistory.data,
        errorHistory: videogamesHistory.error,
        isLoadingHistory: videogamesHistory.isLoading,
        onClickVideogame,
    }
}
