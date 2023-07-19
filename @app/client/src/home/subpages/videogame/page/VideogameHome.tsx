import { videogameHomeLogic } from '../logic/home.videogame'
import { Card, Container, Row, Spacer, Spinner, Text } from '@nextui-org/react'
import { useAxiosHttp } from '../../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { nativeOnInitJob } from '../../../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectOnInit } from '../../../../core/infraestructure/on-init/useEffectOnInit'
import { useRouterDomNavigation } from '../../../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { useCookieSession } from '../../../../core/infraestructure/session/cookie/session-cookie'
import { useEffectStateObserver } from '../../../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefStateFactory } from '../../../../core/infraestructure/state/useRefStateHandler'
import { useRefValueProvider } from '../../../../core/infraestructure/value-provider/useRefValueProvider'
import { getVideogamesTrendingApplicationService } from '../application/get.trending.videogames'
import { videogameHttpRepository } from '../../../../videogames/infraestructure/repositories/videogame.http.repository'
import { getVideogamesTop10HistoryApplicationService } from '../application/get.top.10.history'
import ReactStars from 'react-rating-star-with-type'

export default function VidegameHome() {
    const {
        dataTrending,
        errorTrending,
        isLoadingTrending,
        dataHistory,
        errorHistory,
        isLoadingHistory,
        onClickVideogame,
    } = videogameHomeLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getVideogamesTrendingApplicationService(
            videogameHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getVideogamesTop10HistoryApplicationService(
            videogameHttpRepository(
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
                    <Text h1>Videogames</Text>
                </Row>
                <Text h2>Trending</Text>
                {isLoadingTrending.value && <Spinner />}
                {errorTrending.value && <Text>Error loading trending</Text>}
                <Row
                    css={{
                        overflow: 'auto',
                    }}
                >
                    {dataTrending.value?.map((videogame) => (
                        <Card
                            css={{
                                padding: 10,
                                alignItems: 'center',
                                marginRight: 20,
                            }}
                            isHoverable
                            isPressable
                            onPress={() => onClickVideogame(videogame.id)}
                        >
                            <Text h4>{videogame.title}</Text>
                            <Text>{videogame.synopsis}</Text>
                            <ReactStars
                                isEdit={false}
                                value={videogame.rating}
                            />
                            <Spacer />
                            {videogame.platforms.map((platform) => (
                                <Text h6>{platform}</Text>
                            ))}
                        </Card>
                    ))}
                </Row>
                <Text h2>The 10 latest items in the history</Text>
                {isLoadingHistory.value && <Spinner />}
                {errorHistory.value && <Text>Error loading the history</Text>}
                <Row
                    css={{
                        overflow: 'auto',
                    }}
                >
                    {dataHistory.value?.map((videogame) => (
                        <Card
                            css={{
                                padding: 10,
                                alignItems: 'center',
                                marginRight: 20,
                            }}
                            isHoverable
                            isPressable
                            onPress={() => onClickVideogame(videogame.id)}
                        >
                            <Text h4>{videogame.title}</Text>
                            <Text>{videogame.synopsis}</Text>
                            <ReactStars
                                isEdit={false}
                                value={videogame.rating}
                            />
                            <Spacer />
                            {videogame.platforms.map((platform) => (
                                <Text h6>{platform}</Text>
                            ))}
                        </Card>
                    ))}
                </Row>
            </Container>
        </>
    )
}
