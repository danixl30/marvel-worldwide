import {
    Button,
    Card,
    Container,
    Input,
    Row,
    Spacer,
    Text,
    Image,
    Col,
    FormElement,
} from '@nextui-org/react'
import { loginPageLogic } from './logic/loginPageLogic'
import { createInputManager } from '../../core/infraestructure/input-manager/useInputManager'
import { useToastToastify } from '../../core/infraestructure/toast/toastify/toastify'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { ChangeEvent } from 'react'

export default function LoginPage() {
    const stateFactory = useRefStateFactory()
    const { emailInput, passwordInput, isSubmitable, submit } = loginPageLogic(
        createInputManager(stateFactory),
        useToastToastify(),
    )

    const onChangeEmail = (e: ChangeEvent<FormElement>) => {
        emailInput.onChange(e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<FormElement>) => {
        passwordInput.onChange(e.target.value)
    }
    return (
        <>
            <Container>
                <Row align="center" justify="center">
                    <Text h1 size={50}>
                        Login
                    </Text>
                </Row>
                <Row
                    align="center"
                    justify="center"
                    css={{ marginInline: 'auto' }}
                >
                    <Spacer x={2} />
                    <Card css={{ padding: 30, alignItems: 'center' }}>
                        <Row
                            css={{ marginInline: 60, width: 500 }}
                            align="center"
                            justify="center"
                        >
                            <Col>
                                <Image
                                    width={200}
                                    src="https://upload.wikimedia.org/wikipedia/en/1/19/Marvel_Universe_%28Civil_War%29.jpg"
                                />
                            </Col>
                            <Col>
                                <Input
                                    type="email"
                                    onChange={onChangeEmail}
                                    value={emailInput.value.value}
                                    helperText={emailInput.error.value}
                                    placeholder="Ej: direcction@email.com"
                                    label="Email"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input.Password
                                    onChange={onChangePassword}
                                    value={passwordInput.value.value}
                                    helperText={passwordInput.error.value}
                                    placeholder="Ej: A12345,"
                                    label="Password"
                                    rounded
                                    bordered
                                />
                                <Spacer y={1} />
                                <Button
                                    disabled={!isSubmitable()}
                                    onClick={submit}
                                >
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                    <Spacer x={2} />
                </Row>
            </Container>
        </>
    )
}
