import { Card, Container, Row, Spinner, Text } from '@nextui-org/react'
import { useAxiosHttp } from '../../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { nativeOnInitJob } from '../../../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectOnInit } from '../../../../core/infraestructure/on-init/useEffectOnInit'
import { useRouterDomNavigation } from '../../../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { useCookieSession } from '../../../../core/infraestructure/session/cookie/session-cookie'
import { useEffectStateObserver } from '../../../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefStateFactory } from '../../../../core/infraestructure/state/useRefStateHandler'
import { useRefValueProvider } from '../../../../core/infraestructure/value-provider/useRefValueProvider'
import { movieHttpRepository } from '../../../../movie/infraestructure/repositories/movie.http.repository'
import { getMovieTrendingApplicationService } from '../application/get.trending.movies'
import { movieHomeLogic } from '../logic/home.movie'
import { getMovieTop10HistoryApplicationService } from '../application/get.top.10.history'
import ReactStars from 'react-rating-star-with-type'

export default function MovieHome() {
    const {
        dataTrending,
        errorTrending,
        isLoadingTrending,
        dataHistory,
        errorHistory,
        isLoadingHistory,
        onClickMovie,
    } = movieHomeLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getMovieTrendingApplicationService(
            movieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getMovieTop10HistoryApplicationService(
            movieHttpRepository(
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
                <Row>
                    <Text h1>Movies</Text>
                </Row>
                <Text h2>Trending</Text>
                {isLoadingTrending.value && <Spinner />}
                {errorTrending.value && <Text>Error loading trending</Text>}
                <Row
                    css={{
                        overflow: 'auto',
                    }}
                >
                    {dataTrending.value?.map((movie) => (
                        <Card
                            css={{
                                padding: 10,
                                alignItems: 'center',
                                marginRight: 20,
                            }}
                            isHoverable
                            isPressable
                            onPress={() => onClickMovie(movie.id)}
                        >
                            <Text h4>{movie.title}</Text>
                            <Text>{movie.synopsis}</Text>
                            <ReactStars isEdit={false} value={movie.rating} />
                        </Card>
                    ))}
                </Row>
                <Text h2>Lastest 10 items in history</Text>
                {isLoadingHistory.value && <Spinner />}
                {errorHistory.value && <Text>Error loading the history</Text>}
                <Row
                    css={{
                        overflow: 'auto',
                    }}
                >
                    {dataHistory.value?.map((movie) => (
                        <Card
                            css={{
                                padding: 10,
                                alignItems: 'center',
                                marginRight: 20,
                            }}
                            isHoverable
                            isPressable
                            onPress={() => onClickMovie(movie.id)}
                        >
                            <Text h4>{movie.title}</Text>
                            <Text>{movie.synopsis}</Text>
                            <ReactStars isEdit={false} value={movie.rating} />
                        </Card>
                    ))}
                </Row>
            </Container>
        </>
    )
}
