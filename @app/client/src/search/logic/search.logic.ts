import { InputManager } from '../../core/application/input-manager'
import { PaginationManager } from '../../core/application/pagination-manager/pagination-manager'
import { NavigationManager } from '../../core/application/router/router.manager'
import { infiniteDataTransform } from '../../core/infraestructure/pagination-manager/data-transforms/infinite'
import { CIVIL_DETAILS } from '../../details-civil/page/page'
import { COMBAT_DETAILS } from '../../details-combat/page/page'
import { HEROE_DETAILS } from '../../details-heroe/page/page'
import { MOVIE_DETAILS } from '../../details-movie/page/page'
import { ORGANIZATION_DETAILS } from '../../details-organization/page/page'
import { SERIE_DETAILS } from '../../details-serie/page/page'
import { VIDEOGAME_DETIALS } from '../../details-videogame/page/page'
import { VILLAIN_DETAILS } from '../../detials-villain/page/page'
import { getCivilsByCriteriaApplicationService } from '../application/get.civils.criteria'
import { getCombatsByCriteriaApplicationService } from '../application/get.combats.criteria'
import { getHeroesByCriteriaApplicationService } from '../application/get.heroes.criteria'
import { getMoviesByCriteriaApplicationService } from '../application/get.movies.criteria'
import { getOrganizationsByCriteriaApplicationService } from '../application/get.organizations.criteria'
import { getSeriesByCriteriaApplicationService } from '../application/get.series.criteria'
import { getVideogamesByCriteriaApplicationService } from '../application/get.videogames.criteria'
import { getVillainsByCriteriaApplicationService } from '../application/get.villains.criteria'

export const searchLogic = (
    paginationManager: PaginationManager,
    inputManager: InputManager,
    navigation: NavigationManager,
    getCivilsService: ReturnType<typeof getCivilsByCriteriaApplicationService>,
    getCombatsService: ReturnType<
        typeof getCombatsByCriteriaApplicationService
    >,
    getHeroesService: ReturnType<typeof getHeroesByCriteriaApplicationService>,
    getMoviesService: ReturnType<typeof getMoviesByCriteriaApplicationService>,
    getOrganizationsService: ReturnType<
        typeof getOrganizationsByCriteriaApplicationService
    >,
    getSeriesService: ReturnType<typeof getSeriesByCriteriaApplicationService>,
    getVideogamesService: ReturnType<
        typeof getVideogamesByCriteriaApplicationService
    >,
    getVillainsService: ReturnType<
        typeof getVillainsByCriteriaApplicationService
    >,
) => {
    const searchInput = inputManager(
        navigation.getQuery('term') || '',
        () => '',
        (data) => data,
    )
    const civilsJob = paginationManager(
        (page) =>
            getCivilsService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )
    const combatJob = paginationManager(
        (page) =>
            getCombatsService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )
    const heroesJob = paginationManager(
        (page) =>
            getHeroesService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )
    const moviesJob = paginationManager(
        (page) =>
            getMoviesService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )
    const organizationsJob = paginationManager(
        (page) =>
            getOrganizationsService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )
    const seriesJob = paginationManager(
        (page) =>
            getSeriesService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )
    const videogamesJob = paginationManager(
        (page) =>
            getVideogamesService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )
    const villainJob = paginationManager(
        (page) =>
            getVillainsService.execute({
                page,
                limit: 10,
                term: searchInput.value.value,
            }),
        infiniteDataTransform(),
    )

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

    const onClickOrganization = (id: string) =>
        navigation.goTo(ORGANIZATION_DETAILS.replace(':id', id))

    const onClickCombat = (id: string) =>
        navigation.goTo(COMBAT_DETAILS.replace(':id', id))

    const submitSearch = () => {
        civilsJob.reset()
        combatJob.reset()
        heroesJob.reset()
        moviesJob.reset()
        organizationsJob.reset()
        seriesJob.reset()
        videogamesJob.reset()
        villainJob.reset()
    }

    return {
        submitSearch,
        searchInput,
        civilData: civilsJob.data,
        increaseCivil: civilsJob.increment,
        isTopCivil: civilsJob.isTop,
        errorCivil: civilsJob.error,
        combatData: combatJob.data,
        combatIncrease: combatJob.increment,
        combatIsTop: combatJob.isTop,
        combatError: combatJob.error,
        movieData: moviesJob.data,
        movieIncrease: moviesJob.increment,
        movieIsTop: moviesJob.isTop,
        movieError: moviesJob.error,
        heroeData: heroesJob.data,
        heroeIncrease: heroesJob.increment,
        heroeIsTop: heroesJob.isTop,
        heroeError: heroesJob.error,
        organizationData: organizationsJob.data,
        organizationIncrease: organizationsJob.increment,
        organizationIsTop: organizationsJob.isTop,
        organizationError: organizationsJob.error,
        serieData: seriesJob.data,
        serieIncrease: seriesJob.increment,
        serieIsTop: seriesJob.isTop,
        serieError: seriesJob.error,
        videogameData: videogamesJob.data,
        videogameIncrease: videogamesJob.increment,
        videogameIsTop: videogamesJob.isTop,
        videogameError: videogamesJob.error,
        villainData: villainJob.data,
        villainIncrease: villainJob.increment,
        villainIsTop: villainJob.isTop,
        villainError: villainJob.error,
        onClickCivil,
        onClickHeroe,
        onClickMovie,
        onClickSerie,
        onClickCombat,
        onClickVillain,
        onClickVideogame,
        onClickOrganization,
    }
}
