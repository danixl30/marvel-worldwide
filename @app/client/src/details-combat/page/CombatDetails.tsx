import {
    Button,
    Card,
    Container,
    Grid,
    Row,
    Spacer,
    Spinner,
    Text,
} from '@nextui-org/react'
import { combatHttpRepository } from '../../combat/infraestructure/repositories/combat.http.repository'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { nativeOnInitJob } from '../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { useRouterDomNavigation } from '../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'
import { getCombatByIdApplicationService } from '../application/get.combat.id'
import { getCombatDetailsLogic } from '../logic/combat.details'
import { getUserState } from '../../global-state/user/UserContext'

export default function CombatDetailsPage() {
    const userState = getUserState()
    const {
        data,
        error,
        isLoading,
        onClickHeroe,
        onClickVillain,
        onClickDetials,
    } = getCombatDetailsLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getCombatByIdApplicationService(
            combatHttpRepository(
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
                        Details Combat
                    </Text>
                    {userState.user.value?.membreship.type === 'VIP' && (
                        <Button onPress={() => onClickDetials()}>Modify</Button>
                    )}
                </Row>
                <Text h3>{data.value?.place}</Text>
                {data.value?.date && (
                    <Text h4>
                        {new Date(data.value.date).toISOString().split('T')[0]}
                    </Text>
                )}
                <Text h4>Characters:</Text>
                {data.value &&
                    data.value.characters.map((cha) => (
                        <Card
                            css={{
                                padding: 10,
                                alignItems: 'center',
                                marginBottom: 30,
                            }}
                            isHoverable
                            isPressable
                            onPress={() => {
                                if (cha.kind === 'heroe') onClickHeroe(cha.id)
                                if (cha.kind === 'villain')
                                    onClickVillain(cha.id)
                            }}
                        >
                            <Text h3>Name: {cha.name}</Text>
                            <Text h4>Powers:</Text>
                            <Grid.Container gap={2}>
                                {cha.powers.map((power) => (
                                    <Grid xs={4}>
                                        <Card
                                            css={{
                                                padding: 10,
                                                alignItems: 'center',
                                                background: '#525252',
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
                            <Grid.Container gap={4}>
                                {cha.objects.map((object) => (
                                    <Grid xs={4}>
                                        <Card
                                            css={{
                                                padding: 10,
                                                alignItems: 'center',
                                                background: '#525252',
                                            }}
                                        >
                                            <Text h5>Name: {object.name}</Text>
                                            <Text>
                                                Description:{' '}
                                                {object.description}
                                            </Text>
                                            <Text>Kind: {object.kind}</Text>
                                            <Text>
                                                Material: {object.material}
                                            </Text>
                                            <Text>
                                                Creator: {object.creator}
                                            </Text>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid.Container>
                        </Card>
                    ))}
                <Spacer y={5} />
            </Container>
        </>
    )
}
