import {
    Card,
    Container,
    Image,
    Row,
    Spacer,
    Spinner,
    Text,
} from '@nextui-org/react'
import { reportsLogic } from '../logic/reports.logic'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { getHeroesVillainsWithArtificialPowersAndLeader } from '../application/get.heroes.villains.artificial.leader'
import { getSeriesThatHasMoreEpisodesThanAverageApplicationService } from '../application/get.series.episodes.average'
import { getTop3LocationsApplicationService } from '../application/get.top3.locations'
import { getTop5MoreUsedObjectsApplicationService } from '../application/get.top5.more.objects'
import { heroeHttpRepository } from '../../heroe/infraestructure/repositories/heroe.http.repository'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'
import { villainHttpRepository } from '../../villain/infraestructure/repositories/villain.http.repository'
import { serieHttpRepository } from '../../serie/infraestructure/repositories/serie.http.repository'
import { combatHttpRepository } from '../../combat/infraestructure/repositories/combat.http.repository'
import { nativeOnInitJob } from '../../core/infraestructure/on-init-job/nativeOnInitJob'
import { getMovies2HAnimatedApplicationService } from '../application/get.movies.2h.animated'
import { movieHttpRepository } from '../../movie/infraestructure/repositories/movie.http.repository'
import { getSuperPowersApplicationService } from '../application/get.super.powers'
import { getMedias2WApplicationService } from '../application/get.medias.2w'
import { videogameHttpRepository } from '../../videogames/infraestructure/repositories/videogame.http.repository'
import { getTop5ContentApplicationService } from '../application/get.top5.content'
import { profileHttpRepository } from '../../profile/infraestructure/repositories/profile.http.repository'
import ReactStars from 'react-rating-star-with-type'
import { useRouterDomNavigation } from '../../core/infraestructure/router/router-dom/react-router-dom-navigation'

export default function ReportsPage() {
    const {
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
        onClickVideogame,
        onClickVillain,
    } = reportsLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getHeroesVillainsWithArtificialPowersAndLeader(
            heroeHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
            villainHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getSeriesThatHasMoreEpisodesThanAverageApplicationService(
            serieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getTop3LocationsApplicationService(
            combatHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getTop5MoreUsedObjectsApplicationService(
            heroeHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getMovies2HAnimatedApplicationService(
            movieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getSuperPowersApplicationService(
            villainHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getMedias2WApplicationService(
            movieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
            serieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
            videogameHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getTop5ContentApplicationService(
            profileHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        useRouterDomNavigation(),
    )
    return (
        <>
            <Container>
                <Row align="center" justify="center">
                    <Text
                        h1
                        size={50}
                        css={{
                            background: '$titleColor2',
                            '-webkit-background-clip': 'text',
                            '-webkit-text-fill-color': 'transparent',
                        }}
                    >
                        Reports
                    </Text>
                </Row>
                <Text h2>
                    Report #1: Heroes and villains with artificial power and
                    leader
                </Text>
                {heroesVillainsArtificialPowersLeaderJob.isLoading.value && (
                    <Spinner />
                )}
                {heroesVillainsArtificialPowersLeaderJob.error.value && (
                    <Text>Error getting data</Text>
                )}
                <Row>
                    {heroesVillainsArtificialPowersLeaderJob.data.value &&
                        heroesVillainsArtificialPowersLeaderJob.data.value.heroes.map(
                            (heroe) => (
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginLeft: 20,
                                    }}
                                    key={heroe.id}
                                    isPressable
                                    isHoverable
                                    onPress={() => onClickHeroe(heroe.id)}
                                >
                                    <Image
                                        width={100}
                                        src="https://static.thenounproject.com/png/380874-200.png"
                                    />
                                    <Text h4>Name: {heroe.name}</Text>
                                    <Spacer />
                                    <Text h4>Kind: Heroe</Text>
                                </Card>
                            ),
                        )}
                    <Spacer />
                    {heroesVillainsArtificialPowersLeaderJob.data.value &&
                        heroesVillainsArtificialPowersLeaderJob.data.value.villains.map(
                            (villain) => (
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginBottom: 20,
                                    }}
                                    key={villain.id}
                                    isPressable
                                    isHoverable
                                    onPress={() => onClickVillain(villain.id)}
                                >
                                    <Image
                                        width={100}
                                        src="https://static.thenounproject.com/png/2975528-200.png"
                                    />
                                    <Text h4>Name: {villain.name}</Text>
                                    <Spacer />
                                    <Text h4>Kind: Villain</Text>
                                </Card>
                            ),
                        )}
                </Row>
                <Text h2>
                    Report #2: Series with more episodes than average
                </Text>
                {getSeriesEpisodesGreaterThanAverageJob.isLoading.value && (
                    <Spinner />
                )}
                {getSeriesEpisodesGreaterThanAverageJob.error.value && (
                    <Text>Error getting data</Text>
                )}
                <Row>
                    {getSeriesEpisodesGreaterThanAverageJob.data.value &&
                        getSeriesEpisodesGreaterThanAverageJob.data.value.map(
                            (serie) => (
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginLeft: 20,
                                    }}
                                    key={serie.id}
                                    isPressable
                                    isHoverable
                                    onPress={() => onClickSerie(serie.id)}
                                >
                                    <Image
                                        width={100}
                                        src="https://www.iconarchive.com/download/i88530/icons8/ios7/Media-Controls-Tv-Show.ico"
                                    />
                                    <Text h4>Title: {serie.title}</Text>
                                    <Spacer />
                                    <Text h4>Synopsis: {serie.synopsis}</Text>
                                    <Text h4>
                                        Num of episodes: {serie.episodes}
                                    </Text>
                                    <Spacer />
                                    <ReactStars
                                        isEdit={false}
                                        value={serie.rating}
                                    />
                                </Card>
                            ),
                        )}
                </Row>
                <Text h2>Report #3: Top 3 combat locations</Text>
                {getTop3LocationsJob.isLoading.value && <Spinner />}
                {getTop3LocationsJob.error.value && (
                    <Text>Error getting data</Text>
                )}
                {getTop3LocationsJob.data.value &&
                    getTop3LocationsJob.data.value.map((location) => (
                        <Text>* {location}</Text>
                    ))}
                <Text h2>Report #4: Top 5 more used objects</Text>
                {getTop5MoreUsedObjectsJob.isLoading.value && <Spinner />}
                {getTop5MoreUsedObjectsJob.error.value && (
                    <Text>Error getting data</Text>
                )}
                <Row>
                    {getTop5MoreUsedObjectsJob.data.value &&
                        getTop5MoreUsedObjectsJob.data.value.map((object) => (
                            <Card
                                css={{
                                    padding: 10,
                                    alignItems: 'center',
                                    marginLeft: 20,
                                }}
                                key={object.id}
                            >
                                <Image
                                    width={100}
                                    src="https://cdn-icons-png.flaticon.com/512/1710/1710414.png"
                                />
                                <Spacer />
                                <Text h4>Name: {object.name}</Text>
                                <Spacer />
                                <Text h4>Type: {object.type}</Text>
                                <Spacer />
                                <Text h4>Material: {object.material}</Text>
                                <Spacer />
                                <Text h4>Creator: {object.creator}</Text>
                            </Card>
                        ))}
                </Row>
                <Text h2>
                    Report #5: Movies more 2 hours and half animated, type
                    animated, earning more than average, and sorted by cost
                </Text>
                {movies2HJob.isLoading.value && <Spinner />}
                {movies2HJob.error.value && <Text>Error getting data</Text>}
                <Row>
                    {movies2HJob.data.value &&
                        movies2HJob.data.value.map((movie) => (
                            <Card
                                css={{
                                    padding: 10,
                                    alignItems: 'center',
                                    marginLeft: 20,
                                }}
                                key={movie.id}
                                isPressable
                                isHoverable
                                onPress={() => onClickMovie(movie.id)}
                            >
                                <Image
                                    width={100}
                                    src="https://www.iconarchive.com/download/i88530/icons8/ios7/Media-Controls-Tv-Show.ico"
                                />
                                <Text h4>Title: {movie.title}</Text>
                                <Spacer />
                                <Text h4>Synopsis: {movie.synopsis}</Text>
                                <Spacer />
                                <ReactStars
                                    isEdit={false}
                                    value={movie.rating}
                                />
                            </Card>
                        ))}
                </Row>
                <Text h2>
                    Report #6: Powers with word "Super" and used at least two
                    villains
                </Text>
                {superPowersJob.isLoading.value && <Spinner />}
                {superPowersJob.error.value && <Text>Error getting data</Text>}
                <Row>
                    {superPowersJob.data.value &&
                        superPowersJob.data.value.map((power) => (
                            <Card
                                css={{
                                    padding: 10,
                                    alignItems: 'center',
                                    marginLeft: 20,
                                }}
                                key={power.id}
                            >
                                <Text h4>Name: {power.name}</Text>
                                <Spacer />
                                <Text h4>Description: {power.description}</Text>
                                <Spacer />
                                <Text h4>Type: {power.type}</Text>
                            </Card>
                        ))}
                </Row>
                <Text h2>
                    Report #7: Medias that release was 2 weeks, sorted by rating
                </Text>
                {medias2wJob.isLoading.value && <Spinner />}
                {medias2wJob.error.value && <Text>Error getting data</Text>}
                <Row>
                    {medias2wJob.data.value &&
                        medias2wJob.data.value.map((media) => (
                            <Card
                                css={{
                                    padding: 10,
                                    alignItems: 'center',
                                    marginLeft: 20,
                                }}
                                key={media.id}
                                isPressable
                                isHoverable
                                onPress={() => {
                                    if (media.kind === 'movie')
                                        onClickMovie(media.id)
                                    if (media.kind === 'serie')
                                        onClickSerie(media.id)
                                    if (media.kind === 'videogame')
                                        onClickVideogame(media.id)
                                }}
                            >
                                <Image
                                    width={100}
                                    src="https://www.iconarchive.com/download/i88530/icons8/ios7/Media-Controls-Tv-Show.ico"
                                />
                                <Text h4>Title: {media.title}</Text>
                                <Spacer />
                                <Text h4>Synopsis: {media.synopsis}</Text>
                                <Spacer />
                                <Text h4>Kind: {media.kind}</Text>
                                <Spacer />
                                <ReactStars
                                    isEdit={false}
                                    value={media.rating}
                                />
                            </Card>
                        ))}
                </Row>
                <Text h2>
                    Report #8: Top 5 content that VIP and Premium see
                </Text>
                {top5Content.isLoading.value && <Spinner />}
                {top5Content.error.value && <Text>Error getting data</Text>}
                <Row>
                    {top5Content.data.value &&
                        top5Content.data.value.map((media) => (
                            <Card
                                css={{
                                    padding: 10,
                                    alignItems: 'center',
                                    marginLeft: 20,
                                }}
                                key={media.id}
                                isPressable
                                isHoverable
                                onPress={() => {
                                    if (media.kind === 'movie')
                                        onClickMovie(media.id)
                                    if (media.kind === 'serie')
                                        onClickSerie(media.id)
                                    if (media.kind === 'videogame')
                                        onClickVideogame(media.id)
                                }}
                            >
                                <Image
                                    width={100}
                                    src="https://www.iconarchive.com/download/i88530/icons8/ios7/Media-Controls-Tv-Show.ico"
                                />
                                <Text h4>Title: {media.title}</Text>
                                <Spacer />
                                <Text h4>Synopsis: {media.synopsis}</Text>
                                <Spacer />
                                <Text h4>Kind: {media.kind}</Text>
                            </Card>
                        ))}
                </Row>
            </Container>
        </>
    )
}
