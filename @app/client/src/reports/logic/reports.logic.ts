import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../core/application/router/router.manager'
import { CIVIL_DETAILS } from '../../details-civil/page/page'
import { HEROE_DETAILS } from '../../details-heroe/page/page'
import { MOVIE_DETAILS } from '../../details-movie/page/page'
import { SERIE_DETAILS } from '../../details-serie/page/page'
import { VIDEOGAME_DETIALS } from '../../details-videogame/page/page'
import { VILLAIN_DETAILS } from '../../detials-villain/page/page'
import { getHeroesVillainsWithArtificialPowersAndLeader } from '../application/get.heroes.villains.artificial.leader'
import { getMedias2WApplicationService } from '../application/get.medias.2w'
import { getMovies2HAnimatedApplicationService } from '../application/get.movies.2h.animated'
import { getSeriesThatHasMoreEpisodesThanAverageApplicationService } from '../application/get.series.episodes.average'
import { getSuperPowersApplicationService } from '../application/get.super.powers'
import { getTop3LocationsApplicationService } from '../application/get.top3.locations'
import { getTop5ContentApplicationService } from '../application/get.top5.content'
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
    getMovies2HAnimatedService: ReturnType<
        typeof getMovies2HAnimatedApplicationService
    >,
    getSuperPowersService: ReturnType<typeof getSuperPowersApplicationService>,
    getMedias2WService: ReturnType<typeof getMedias2WApplicationService>,
    getTop5Content: ReturnType<typeof getTop5ContentApplicationService>,
    navigation: NavigationManager,
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

    const movies2HJob = onInitJob(() =>
        getMovies2HAnimatedService.execute(undefined),
    )

    const superPowersJob = onInitJob(() =>
        getSuperPowersService.execute(undefined),
    )

    const medias2wJob = onInitJob(() => getMedias2WService.execute(undefined))

    const top5Content = onInitJob(() => getTop5Content.execute(undefined))

    const onClickMovie = (id: string) =>
        navigation.goTo(MOVIE_DETAILS.replace(':id', id))

    const onClickSerie = (id: string) =>
        navigation.goTo(SERIE_DETAILS.replace(':id', id))

    const onClickVideogame = (id: string) =>
        navigation.goTo(VIDEOGAME_DETIALS.replace(':id', id))

    const onClickHeroe = (id: string) =>
        navigation.goTo(HEROE_DETAILS.replace(':id', id))

    const onClickCivil = (id: string) =>
        navigation.goTo(CIVIL_DETAILS.replace(':id', id))

    const onClickVillain = (id: string) =>
        navigation.goTo(VILLAIN_DETAILS.replace(':id', id))

    return {
        heroesVillainsArtificialPowersLeaderJob,
        getSeriesEpisodesGreaterThanAverageJob,
        getTop3LocationsJob,
        getTop5MoreUsedObjectsJob,
        movies2HJob,
        superPowersJob,
        medias2wJob,
        top5Content,
        onClickCivil,
        onClickHeroe,
        onClickMovie,
        onClickSerie,
        onClickVillain,
        onClickVideogame,
    }
}
