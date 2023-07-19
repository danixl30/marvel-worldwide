import {
    Button,
    Card,
    Container,
    Grid,
    Link,
    Row,
    Spacer,
    Spinner,
    Text,
} from '@nextui-org/react'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { nativeOnInitJob } from '../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { useRouterDomNavigation } from '../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'
import { videogameHttpRepository } from '../../videogames/infraestructure/repositories/videogame.http.repository'
import { getVideogameByIdApplicationService } from '../application/get.videogame.id'
import { getVideogameDetailsLogic } from '../logic/videogame.details'
import { nativeOnInitJobLazy } from '../../core/infraestructure/on-init-job/nativeOnInitJobLazy'
import { useToastToastify } from '../../core/infraestructure/toast/toastify/toastify'
import { createInputManager } from '../../core/infraestructure/input-manager/useInputManager'
import { rateVideogameApplicationService } from '../application/rate.videogame'
import { profileHttpRepository } from '../../profile/infraestructure/repositories/profile.http.repository'
import ReactStars from 'react-rating-star-with-type'
import { endHistoryApplicationService } from '../application/end.history'
import { getUserState } from '../../global-state/user/UserContext'

export default function VideogameDetailsPage() {
    const userState = getUserState()
    const stateFactory = useRefStateFactory()
    const {
        data,
        error,
        isLoading,
        rateInput,
        submitRate,
        onClickCivil,
        onClickHeroe,
        onClickOrganization,
        onClickVillain,
        onClickDetials,
    } = getVideogameDetailsLogic(
        nativeOnInitJob(stateFactory, useEffectStateObserver, useEffectOnInit),
        nativeOnInitJobLazy(stateFactory),
        useEffectOnInit,
        createInputManager(stateFactory),
        getVideogameByIdApplicationService(
            videogameHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        useCookieSession(),
        rateVideogameApplicationService(
            profileHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        endHistoryApplicationService(
            profileHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        useRouterDomNavigation(),
        useToastToastify(),
    )
    if (isLoading.value) {
        return (
            <>
                <Spinner />
            </>
        )
    }
    if (error.value) {
        return (
            <>
                <Text>Error loading data</Text>
            </>
        )
    }
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
                        Details Videogame
                    </Text>
                    <Spacer />
                    {userState.user.value?.membreship.type === 'VIP' && (
                        <Button onPress={() => onClickDetials()}>Modify</Button>
                    )}
                </Row>
                <Text h3>Title: {data.value?.title}</Text>
                <Spacer />
                <Text h4>Synopsis: {data.value?.synopsis}</Text>
                <Spacer />
                <Text h4>Type: {data.value?.type}</Text>
                <Spacer />
                <Text h4>
                    Release date:{' '}
                    {
                        new Date(data.value?.release || '2023-01-01')
                            .toISOString()
                            .split('T')[0]
                    }
                </Text>
                <Spacer />
                <Text h4>Creator: {data.value?.creator}</Text>
                <Spacer />
                <Text h4>Actors:</Text>
                <Grid.Container gap={2}>
                    {data.value &&
                        data.value.actors.map((actor) => (
                            <Grid xs={4}>
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginRight: 20,
                                    }}
                                >
                                    <Text h5>
                                        {actor.name.firstName +
                                            ' ' +
                                            actor.name.lastName}
                                    </Text>
                                    <Link
                                        block
                                        onPress={() => {
                                            if (
                                                actor.character.kind === 'civil'
                                            )
                                                onClickCivil(actor.character.id)
                                            if (
                                                actor.character.kind === 'heroe'
                                            )
                                                onClickHeroe(actor.character.id)
                                            if (
                                                actor.character.kind ===
                                                'villain'
                                            )
                                                onClickVillain(
                                                    actor.character.id,
                                                )
                                        }}
                                    >
                                        {actor.character.name}
                                    </Link>
                                    <Text>{actor.role}</Text>
                                </Card>
                            </Grid>
                        ))}
                </Grid.Container>
                <Spacer />
                <Text h4>Organizations:</Text>
                <Grid.Container gap={2}>
                    {data.value &&
                        data.value.organizations.map((org) => (
                            <Grid xs={4}>
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginRight: 20,
                                    }}
                                    isHoverable
                                    isPressable
                                    onPress={() => onClickOrganization(org.id)}
                                >
                                    <Text h5>{org.name}</Text>
                                    <Text>{org.participationType}</Text>
                                </Card>
                            </Grid>
                        ))}
                </Grid.Container>
                <Spacer />
                <Text h4>Based on: {data.value?.comic}</Text>
                <Spacer />
                <Text h4>Platforms:</Text>
                {data.value &&
                    data.value.platforms.map((platform) => (
                        <Text>{platform}</Text>
                    ))}
                <Spacer />
                <Text h4>Rate:</Text>
                <ReactStars isEdit={false} value={data.value?.rating} />
                <Card
                    css={{
                        padding: 10,
                        alignItems: 'center',
                        marginRight: 20,
                    }}
                >
                    <ReactStars
                        isEdit
                        value={Number(rateInput.value)}
                        onChange={(value) => rateInput.onChange(String(value))}
                    />
                    <Spacer />
                    <Button
                        disabled={Boolean(rateInput.error.value)}
                        onPress={submitRate}
                    >
                        Set rate
                    </Button>
                </Card>
                <Spacer y={5} />
            </Container>
        </>
    )
}
