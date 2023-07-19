import {
    Button,
    Card,
    Container,
    Link,
    Row,
    Spacer,
    Spinner,
    Text,
} from '@nextui-org/react'
import { civilHttpRepository } from '../../civil/infraestructure/repositories/civil.http.repository'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { nativeOnInitJob } from '../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { useRouterDomNavigation } from '../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'
import { getCivilByIdApplicationService } from '../application/get.civil.id'
import { getCivilDetailsLogic } from '../logic/civil.details'
import { getUserState } from '../../global-state/user/UserContext'

export default function CivilDetailsPage() {
    const userState = getUserState()
    const {
        data,
        error,
        isLoading,
        onClickDetials,
        onClickHeroe,
        onClickVillain,
    } = getCivilDetailsLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getCivilByIdApplicationService(
            civilHttpRepository(
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
                        Details Civil
                    </Text>
                    <Spacer />
                    {userState.user.value?.membreship.type === 'VIP' && (
                        <Button onPress={() => onClickDetials()}>Modify</Button>
                    )}
                </Row>
                <Text h3>
                    Name:
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
                <Text h4>Relation: </Text>
                <Link
                    onPress={() => {
                        if (data.value?.relation.kind === 'heroe')
                            onClickHeroe(data.value.relation.target)
                        if (data.value?.relation.kind === 'villain')
                            onClickVillain(data.value.relation.target)
                    }}
                >
                    {data.value?.relation.name}
                </Link>
            </Container>
        </>
    )
}
