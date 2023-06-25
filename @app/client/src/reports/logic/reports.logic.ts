import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { getHeroesVillainsWithArtificialPowersAndLeader } from '../application/get.heroes.villains.artificial.leader'
import { getSeriesThatHasMoreEpisodesThanAverageApplicationService } from '../application/get.series.episodes.average'
import { getTop3LocationsApplicationService } from '../application/get.top3.locations'
import { getTop5MoreUsedObjectsApplicationService } from '../application/get.top5.more.objects'

export const reportsLogic = (
    onInitJob: OnInitJob,
    getHeroesVillainsWithArtificialPowersAndLeaderService: ReturnType<
        typeof getHeroesVillainsWithArtificialPowersAndLeader
    >,
    getSeriesEpisodesGreaterThanAverageService: ReturnType<
        typeof getSeriesThatHasMoreEpisodesThanAverageApplicationService
    >,
    getTop3LocationsService: ReturnType<
        typeof getTop3LocationsApplicationService
    >,
    getTop5MoreUsedObjectsService: ReturnType<
        typeof getTop5MoreUsedObjectsApplicationService
    >,
) => {
    const heroesVillainsArtificialPowersLeaderJob = onInitJob(() =>
        getHeroesVillainsWithArtificialPowersAndLeaderService.execute(
            undefined,
        ),
    )

    const getSeriesEpisodesGreaterThanAverageJob = onInitJob(() =>
        getSeriesEpisodesGreaterThanAverageService.execute(undefined),
    )

    const getTop3LocationsJob = onInitJob(() =>
        getTop3LocationsService.execute(undefined),
    )

    const getTop5MoreUsedObjectsJob = onInitJob(() =>
        getTop5MoreUsedObjectsService.execute(undefined),
    )

    return {
        heroesVillainsArtificialPowersLeaderJob,
        getSeriesEpisodesGreaterThanAverageJob,
        getTop3LocationsJob,
        getTop5MoreUsedObjectsJob,
    }
}
