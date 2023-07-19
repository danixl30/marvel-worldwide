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
import { heroeHttpRepository } from '../../heroe/infraestructure/repositories/heroe.http.repository'
import { getHeroeByIdApplicationService } from '../application/get.heroe.id'
import { getHeroeDetailsLogic } from '../logic/heroe.details'
import { getUserState } from '../../global-state/user/UserContext'

export default function HeroeDetailsPage() {
    const userState = getUserState()
    const { data, error, isLoading, onClickVillain, onClickDetials } =
        getHeroeDetailsLogic(
            nativeOnInitJob(
                useRefStateFactory(),
                useEffectStateObserver,
                useEffectOnInit,
            ),
            getHeroeByIdApplicationService(
                heroeHttpRepository(
                    useAxiosHttp(),
                    useCookieSession(),
                    cancelHandler(useRefValueProvider(), useEffectOnInit),
                ),
            ),
            useRouterDomNavigation(),
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
                        Details Heroe
                    </Text>
                    <Spacer />
                    {userState.user.value?.membreship.type === 'VIP' && (
                        <Button onPress={() => onClickDetials()}>Modify</Button>
                    )}
                </Row>
                <Text h3>Name: {data.value?.name}</Text>
                <Text h3>
                    Real name:
                    {' ' +
                        data.value?.person.name +
                        ', ' +
                        data.value?.person.lastName}
                </Text>
                <Spacer />
                <Card
                    css={{
                        padding: 10,
                        alignItems: 'center',
                        marginRight: 20,
                    }}
                >
                    <Text h4>Personal data: </Text>
                    <Text h5>Phrase: {data.value?.person.phrase}</Text>
                    <Text h5>Gender: {data.value?.person.gender}</Text>
                    <Text h5>Hair color: {data.value?.person.hairColor}</Text>
                    <Text h5>Eyes color: {data.value?.person.eyesColor}</Text>
                    <Text h5>
                        Maritial Status: {data.value?.person.maritialStatus}
                    </Text>
                </Card>
                <Spacer />
                <Text h4>Nationalities:</Text>
                {data.value &&
                    data.value.person.nationalities.map((occ) => (
                        <Text>{occ}</Text>
                    ))}
                <Spacer />
                <Text h4>Occupations:</Text>
                {data.value &&
                    data.value.person.occupations.map((occ) => (
                        <Text>{occ}</Text>
                    ))}
                <Spacer />
                <Text h4>Powers:</Text>
                <Grid.Container gap={2}>
                    {data.value &&
                        data.value.powers.map((power) => (
                            <Grid xs={4}>
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginRight: 20,
                                    }}
                                >
                                    <Text h5>Name: {power.name}</Text>
                                    <Text>
                                        Description: {power.description}
                                    </Text>
                                    <Text>Type: {power.type}</Text>
                                </Card>
                            </Grid>
                        ))}
                </Grid.Container>
                <Spacer />
                <Text h4>Objects:</Text>
                <Grid.Container gap={2}>
                    {data.value &&
                        data.value.objects.map((object) => (
                            <Grid xs={4}>
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginRight: 20,
                                    }}
                                >
                                    <Text h5>Name: {object.name}</Text>
                                    <Text>
                                        Description: {object.description}
                                    </Text>
                                    <Text>Kind: {object.kind}</Text>
                                    <Text>Material: {object.material}</Text>
                                    <Text>Creator: {object.creator}</Text>
                                </Card>
                            </Grid>
                        ))}
                </Grid.Container>
                <Spacer />
                <Row>
                    <Text h4>Arch enemy: </Text>
                    <Spacer x={0.5} />
                    <Link
                        css={{
                            fontSize: 15,
                        }}
                        block
                        onPress={() =>
                            onClickVillain(data.value?.archEnemy.id || '')
                        }
                    >
                        {data.value?.archEnemy.name}
                    </Link>
                </Row>
                <Text h4>Colors:</Text>
                <Spacer />
                <Row>
                    {data.value &&
                        data.value.colors.map((color) => (
                            <div
                                style={{
                                    width: 50,
                                    height: 50,
                                    background: color,
                                    borderRadius: '15%',
                                    marginRight: 10,
                                }}
                            />
                        ))}
                </Row>
                <Spacer y={5} />
            </Container>
        </>
    )
}
