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
                    <Text size={60} h1>
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
                        <Button onClick={goToRegisterGold}>Register</Button>
                    </Card>
                    <Spacer y={1} />
                    <Card css={{ padding: 20, alignItems: 'center' }}>
                        <Text>Premium plan:</Text>
                        <Text>$9.99/month</Text>
                        <Button onClick={goToRegisterPremium}>Register</Button>
                    </Card>
                    <Spacer y={1} />
                    <Card css={{ padding: 20, alignItems: 'center' }}>
                        <Text>VIP plan:</Text>
                        <Text>$9.99/month</Text>
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
                        <Button onClick={goToRegisterInvited}>Register</Button>
                    </Card>
                </Row>
                <Spacer y={2} />
                <Row align="center" justify="center">
                    <Text h3 size={30}>
                        You are already registered? Please login
                    </Text>
                </Row>
                <Row align="center" justify="center">
                    <Button onClick={goToLogin}>Login</Button>
                </Row>
                <Spacer y={10} />
            </Container>
        </>
    )
}
