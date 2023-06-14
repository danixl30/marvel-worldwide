import { Button, Card, Container, Row, Spacer, Text } from '@nextui-org/react'
import { mainPageLogic } from '../logic/mainPageLogic'
import { useRouterDomNavigation } from '../../../core/infraestructure/router/router-dom/react-router-dom-navigation'

export default function MainPage() {
    const {
        goToLogin,
        goToRegisterGold,
        goToRegisterVIP,
        goToRegisterInvited,
        goToRegisterPremium,
    } = mainPageLogic(useRouterDomNavigation())
    return (
        <>
            <Container css={{ marginInline: 10 }}>
                <Row align="center" justify="center">
                    <Text
                        size={60}
                        h1
                        css={{
                            background: '$titleColor2',
                            '-webkit-background-clip': 'text',
                            '-webkit-text-fill-color': 'transparent',
                        }}
                    >
                        Welcome to Marvel Unlimited!!!
                    </Text>
                </Row>
                <Row align="center" justify="center">
                    <Text size={30} h3>
                        You can register by this plans
                    </Text>
                </Row>
                <Row justify="center" align="center">
                    <Card css={{ padding: 20, alignItems: 'center' }}>
                        <Text>Gold plan:</Text>
                        <Text>$9.99/month</Text>
                        <Text>* You can't see premieres</Text>
                        <Spacer y={1} />
                        <Button onClick={goToRegisterGold}>Register</Button>
                    </Card>
                    <Spacer y={1} />
                    <Card css={{ padding: 20, alignItems: 'center' }}>
                        <Text>Premium plan:</Text>
                        <Text>$14.99/month</Text>
                        <Text>* All access to content</Text>
                        <Spacer y={1} />
                        <Button onClick={goToRegisterPremium}>Register</Button>
                    </Card>
                    <Spacer y={1} />
                    <Card css={{ padding: 20, alignItems: 'center' }}>
                        <Text>VIP plan:</Text>
                        <Text>$29.99/month</Text>
                        <Text>
                            * You can create, modify, and delete content
                        </Text>
                        <Spacer y={1} />
                        <Button onClick={goToRegisterVIP}>Register</Button>
                    </Card>
                </Row>
                <Spacer y={2} />
                <Row align="center" justify="center">
                    <Text h3 size={30}>
                        You want to try?
                    </Text>
                </Row>
                <Row align="center" justify="center">
                    <Card css={{ padding: 20, alignItems: 'center' }}>
                        <Text>Register by invited</Text>
                        <Text>You can see 15 publications per day</Text>
                        <Text>You can't see premieres</Text>
                        <Spacer y={1} />
                        <Button onClick={goToRegisterInvited}>Register</Button>
                    </Card>
                </Row>
                <Spacer y={2} />
                <Row align="center" justify="center">
                    <Text h3 size={30}>
                        You are already registered? Please login
                    </Text>
                </Row>
                <Spacer y={1} />
                <Row align="center" justify="center">
                    <Button onClick={goToLogin}>Login</Button>
                </Row>
                <Spacer y={10} />
            </Container>
        </>
    )
}
