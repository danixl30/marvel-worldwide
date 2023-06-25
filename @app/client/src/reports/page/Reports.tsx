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

export default function ReportsPage() {
    const {
        heroesVillainsArtificialPowersLeaderJob,
        getSeriesEpisodesGreaterThanAverageJob,
        getTop3LocationsJob,
        getTop5MoreUsedObjectsJob,
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
                                >
                                    <Image
                                        width={100}
                                        src="https://www.iconarchive.com/download/i88530/icons8/ios7/Media-Controls-Tv-Show.ico"
                                    />
                                    <Text h4>Title: {serie.title}</Text>
                                    <Spacer />
                                    <Text h4>Synopsis: {serie.synopsis}</Text>
                                    <Spacer />
                                    <Text h4>
                                        Num of episodes: {serie.episodes}
                                    </Text>
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
            </Container>
        </>
    )
}
