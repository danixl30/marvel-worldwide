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
import { serieHttpRepository } from '../../../../serie/infraestructure/repositories/serie.http.repository'
import { getSeriesTrendingApplicationService } from '../application/get.trending.serie'
import { serieHomeLogic } from '../logic/home.serie'
import { getSeriesTop10HistoryApplicationService } from '../application/get.top.10.history'
import ReactStars from 'react-rating-star-with-type'

export default function SerieHome() {
    const {
        dataTrending,
        errorTrending,
        isLoadingTrending,
        dataHistory,
        errorHistory,
        isLoadingHistory,
        onClickSerie,
    } = serieHomeLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getSeriesTrendingApplicationService(
            serieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getSeriesTop10HistoryApplicationService(
            serieHttpRepository(
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
                    <Text h1>Series</Text>
                </Row>
                <Text h2>Trending</Text>
                {isLoadingTrending.value && <Spinner />}
                {errorTrending.value && <Text>Error loading trending</Text>}
                <Row
                    css={{
                        overflow: 'auto',
                    }}
                >
                    {dataTrending.value?.map((serie) => (
                        <Card
                            css={{
                                padding: 10,
                                alignItems: 'center',
                                marginRight: 20,
                            }}
                            isHoverable
                            isPressable
                            onPress={() => onClickSerie(serie.id)}
                        >
                            <Text h4>{serie.title}</Text>
                            <Text>{serie.synopsis}</Text>
                            <Text>Episodes: {serie.episodes}</Text>
                            <ReactStars isEdit={false} value={serie.rating} />
                        </Card>
                    ))}
                </Row>
                <Text h2>Last 10 items in the history</Text>
                {isLoadingHistory.value && <Spinner />}
                {errorHistory.value && <Text>Error loading the history</Text>}
                <Row
                    css={{
                        overflow: 'auto',
                    }}
                >
                    {dataHistory.value?.map((serie) => (
                        <Card
                            css={{
                                padding: 10,
                                alignItems: 'center',
                                marginRight: 20,
                            }}
                            isHoverable
                            isPressable
                            onPress={() => onClickSerie(serie.id)}
                        >
                            <Text h4>{serie.title}</Text>
                            <Text>{serie.synopsis}</Text>
                            <Text>Episodes: {serie.episodes}</Text>
                            <ReactStars isEdit={false} value={serie.rating} />
                        </Card>
                    ))}
                </Row>
            </Container>
        </>
    )
}
