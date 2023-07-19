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
import { organizationHttpRepository } from '../../organization/infraestructure/repositories/organization.http.repository'
import { getOrganizationByIdApplicationService } from '../application/get.organization.id'
import { getOrganizationDetailsLogic } from '../logic/organization.details'
import { getUserState } from '../../global-state/user/UserContext'

export default function OrganizationDetailsPage() {
    const userState = getUserState()
    const {
        data,
        error,
        isLoading,
        onClickCivil,
        onClickHeroe,
        onClickVillain,
        onClickDetials,
    } = getOrganizationDetailsLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getOrganizationByIdApplicationService(
            organizationHttpRepository(
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
                        Details Organization
                    </Text>
                    <Spacer />
                    {userState.user.value?.membreship.type === 'VIP' && (
                        <Button onPress={() => onClickDetials()}>Modify</Button>
                    )}
                </Row>
                <Text h3>Name: {data.value?.name}</Text>
                <Spacer />
                <Card
                    css={{
                        padding: 10,
                        alignItems: 'center',
                        marginRight: 20,
                    }}
                >
                    <Text h5>Additional information</Text>
                    <Text h5>
                        First apparition: {data.value?.firstApparition}
                    </Text>
                    <Text h5>Objetive: {data.value?.objetive}</Text>
                    <Text h5>Slogan: {data.value?.slogan}</Text>
                    <Text h5>Creation place: {data.value?.creationPlace}</Text>
                </Card>
                <Spacer />
                <Text h4>Headquarter information:</Text>
                <Card
                    css={{
                        padding: 10,
                        alignItems: 'center',
                        marginRight: 20,
                    }}
                >
                    <Text h5>Name: {data.value?.headquarter.name}</Text>
                    <Text h5>
                        Place:{' '}
                        {data.value?.headquarter.place.country +
                            '-' +
                            data.value?.headquarter.place.city}
                    </Text>
                    <Text h5>Kind: {data.value?.headquarter.kind}</Text>
                </Card>
                <Spacer />
                <Row>
                    <Text h5>Leader:</Text>
                    <Spacer />
                    {data.value && (
                        <Link
                            block
                            onPress={() => {
                                const member = data.value!.leader
                                if (member.kind === 'civil')
                                    onClickCivil(member.id)
                                if (member.kind === 'heroe')
                                    onClickHeroe(member.id)
                                if (member.kind === 'villain')
                                    onClickVillain(member.id)
                            }}
                        >
                            {data.value.leader.name}
                        </Link>
                    )}
                </Row>
                <Spacer />
                <Row>
                    <Text h5>Founder:</Text>
                    <Spacer />
                    {data.value && (
                        <Link
                            block
                            onPress={() => {
                                const member = data.value!.founder
                                if (member.kind === 'civil')
                                    onClickCivil(member.id)
                                if (member.kind === 'heroe')
                                    onClickHeroe(member.id)
                                if (member.kind === 'villain')
                                    onClickVillain(member.id)
                            }}
                        >
                            {data.value.founder.name}
                        </Link>
                    )}
                </Row>
                <Spacer />
                <Text h4>Members:</Text>
                <Grid.Container gap={2}>
                    {data.value &&
                        data.value.members.map((member) => (
                            <Grid xs={4}>
                                <Card
                                    css={{
                                        padding: 10,
                                        alignItems: 'center',
                                        marginRight: 20,
                                    }}
                                    isPressable
                                    isHoverable
                                    onPress={() => {
                                        if (member.kind === 'civil')
                                            onClickCivil(member.id)
                                        if (member.kind === 'heroe')
                                            onClickHeroe(member.id)
                                        if (member.kind === 'villain')
                                            onClickVillain(member.id)
                                    }}
                                >
                                    <Text h5>Name: {member.name}</Text>
                                    <Text h5>Charge: {member.charge}</Text>
                                </Card>
                            </Grid>
                        ))}
                </Grid.Container>
            </Container>
        </>
    )
}
