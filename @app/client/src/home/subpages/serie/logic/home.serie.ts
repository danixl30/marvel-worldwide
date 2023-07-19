import { OnInitJob } from '../../../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../../../core/application/router/router.manager'
import { SERIE_DETAILS } from '../../../../details-serie/page/page'
import { getSeriesTop10HistoryApplicationService } from '../application/get.top.10.history'
import { getSeriesTrendingApplicationService } from '../application/get.trending.serie'

export const serieHomeLogic = (
    onInitJob: OnInitJob,
    getSerieTrendingService: ReturnType<
        typeof getSeriesTrendingApplicationService
    >,
    getSeriesTop10HistoryService: ReturnType<
        typeof getSeriesTop10HistoryApplicationService
    >,
    navigation: NavigationManager,
) => {
    const seriesTrendingJob = onInitJob(() =>
        getSerieTrendingService.execute(undefined),
    )

    const seriesHistoryJob = onInitJob(() =>
        getSeriesTop10HistoryService.execute(undefined),
    )

    const onClickSerie = (id: string) =>
        navigation.goTo(SERIE_DETAILS.replace(':id', id))

    return {
        dataTrending: seriesTrendingJob.data,
        errorTrending: seriesTrendingJob.error,
        isLoadingTrending: seriesTrendingJob.isLoading,
        dataHistory: seriesHistoryJob.data,
        errorHistory: seriesHistoryJob.error,
        isLoadingHistory: seriesHistoryJob.isLoading,
        onClickSerie,
    }
}
