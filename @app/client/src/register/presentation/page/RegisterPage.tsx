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
import { useRefStateFactory } from '../../../core/infraestructure/state/useRefStateHandler'
import { registerPageLogic } from '../logic/registerPageLogic'
import { createInputManager } from '../../../core/infraestructure/input-manager/useInputManager'
import { useToastToastify } from '../../../core/infraestructure/toast/toastify/toastify'
import { ChangeEvent } from 'react'
import { useRouterDomNavigation } from '../../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { CreateUserService } from '../../../user/application/services/create.user'
import { userHttpRepository } from '../../../user/infraestructure/repositories/user.http.repository'
import { useAxiosHttp } from '../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../../core/infraestructure/value-provider/useRefValueProvider'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { nativeOnInitJobLazy } from '../../../core/infraestructure/on-init-job/nativeOnInitJobLazy'

export default function RegisterPage() {
    const stateFactory = useRefStateFactory()
    const {
        emailInput,
        passwordInput,
        isSubmitable,
        submit,
        cardNumberInput,
        dob,
        onChangeDob,
        errorDob,
    } = registerPageLogic(
        stateFactory,
        createInputManager(stateFactory),
        useToastToastify(),
        useRouterDomNavigation(),
        CreateUserService(
            userHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        nativeOnInitJobLazy(stateFactory),
    )

    const onChangeEmail = (e: ChangeEvent<FormElement>) => {
        emailInput.onChange(e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<FormElement>) => {
        passwordInput.onChange(e.target.value)
    }

    const onChangeCardNumber = (e: ChangeEvent<FormElement>) => {
        cardNumberInput.onChange(e.target.value)
    }

    const onChangeDobInput = (e: ChangeEvent<FormElement>) => {
        onChangeDob(new Date(e.target.value))
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
                        Register
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
                                    width={300}
                                    src="https://upload.wikimedia.org/wikipedia/en/1/19/Marvel_Universe_%28Civil_War%29.jpg"
                                />
                            </Col>
                            <Col>
                                <Input
                                    value={emailInput.value.value}
                                    onChange={onChangeEmail}
                                    helperText={emailInput.error.value}
                                    type="email"
                                    placeholder="Ej: direcction@email.com"
                                    label="Email"
                                    helperColor="error"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input.Password
                                    value={passwordInput.value.value}
                                    onChange={onChangePassword}
                                    helperText={passwordInput.error.value}
                                    placeholder="Ej: A12345,"
                                    label="Password"
                                    helperColor="error"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={cardNumberInput.value.value}
                                    onChange={onChangeCardNumber}
                                    helperText={cardNumberInput.error.value}
                                    label="Card Number"
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    helperColor="error"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={dob.value?.getUTCDate() || ''}
                                    onChange={onChangeDobInput}
                                    helperText={errorDob.value}
                                    type="date"
                                    label="Date of birthday"
                                    placeholder="Ex: 12/01/2000"
                                    rounded
                                    bordered
                                />
                                <Spacer y={1} />
                                <Button
                                    disabled={!isSubmitable()}
                                    onPress={submit}
                                >
                                    Register
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
