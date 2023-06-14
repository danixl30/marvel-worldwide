import {
    Card,
    Container,
    Row,
    Spacer,
    Text,
    Image,
    Col,
    Spinner,
    Button,
} from '@nextui-org/react'
import { chooseProfileLogic } from '../logic/chooseProfileLogic'
import { useRouterDomNavigation } from '../../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { nativeOnInitJob } from '../../../core/infraestructure/on-init-job/nativeOnInitJob'
import { getProfilesService } from '../../../profile/application/services/get.profiles'
import { profileHttpRepository } from '../../../profile/infraestructure/repositories/profile.http.repository'
import { useAxiosHttp } from '../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../../core/infraestructure/value-provider/useRefValueProvider'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { useRefStateFactory } from '../../../core/infraestructure/state/useRefStateHandler'
import { useEffectStateObserver } from '../../../core/infraestructure/state-observer/useEffectStateObserver'

export default function ChooseProfilePage() {
    const { addProfile, profilesData, isLoading, error, logout } =
        chooseProfileLogic(
            useRouterDomNavigation(),
            getProfilesService(
                profileHttpRepository(
                    useAxiosHttp(),
                    useCookieSession(),
                    cancelHandler(useRefValueProvider(), useEffectOnInit),
                ),
            ),
            nativeOnInitJob(
                useRefStateFactory(),
                useEffectStateObserver,
                useEffectOnInit,
            ),
            useCookieSession(),
        )
    if (error.value) {
        return (
            <>
                <Text h1 size={50}>
                    Error during getting profile
                </Text>
            </>
        )
    }
    if (isLoading.value) {
        return (
            <>
                <Spinner />
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
                        Choose a Profile
                    </Text>
                </Row>
                <Row align="center" justify="center">
                    <Spacer x={2} />
                    <Card css={{ padding: 30, alignItems: 'center' }}>
                        <Row
                            css={{ marginInline: 60, width: 500 }}
                            align="center"
                            justify="center"
                        >
                            {profilesData.value &&
                                profilesData.value.map((e) => (
                                    <>
                                        <Col key={e.id}>
                                            <Card
                                                isHoverable
                                                isPressable
                                                variant="bordered"
                                                css={{
                                                    padding: 30,
                                                    alignItems: 'center',
                                                    background: '$titleColor',
                                                }}
                                            >
                                                <Image
                                                    width={110}
                                                    src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png"
                                                />
                                                <Text h4>{e.email}</Text>
                                            </Card>
                                        </Col>
                                        <Spacer x={1} />
                                    </>
                                ))}
                            {profilesData.value &&
                                profilesData.value.length < 5 && (
                                    <Col>
                                        <Card
                                            isHoverable
                                            isPressable
                                            variant="bordered"
                                            onPress={addProfile}
                                            css={{
                                                padding: 30,
                                                alignItems: 'center',
                                                background: '$titleColor',
                                            }}
                                        >
                                            <Image
                                                width={80}
                                                src="https://e7.pngegg.com/pngimages/535/334/png-clipart-computer-icons-add-button-logo-number-thumbnail.png"
                                            />
                                            <Text h4>Add</Text>
                                        </Card>
                                    </Col>
                                )}
                        </Row>
                        <Spacer y={2} />
                        <Button onPress={logout}>Logout</Button>
                    </Card>
                    <Spacer x={2} />
                </Row>
                <Spacer y={2} />
            </Container>
        </>
    )
}
