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
    Dropdown,
    FormElement,
} from '@nextui-org/react'
import { useRefStateFactory } from '../../../core/infraestructure/state/useRefStateHandler'
import { createProfileLogic } from '../logic/createProfileLogic'
import { createInputManager } from '../../../core/infraestructure/input-manager/useInputManager'
import { useToastToastify } from '../../../core/infraestructure/toast/toastify/toastify'
import { ChangeEvent } from 'react'
import { MediaType } from '../../../profile/application/services/dto/create.profile'
import { nativeOnInitJobLazy } from '../../../core/infraestructure/on-init-job/nativeOnInitJobLazy'
import { createProfileService } from '../../../profile/application/services/create.profile'
import { profileHttpRepository } from '../../../profile/infraestructure/repositories/profile.http.repository'
import { useAxiosHttp } from '../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../../core/infraestructure/value-provider/useRefValueProvider'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { useRouterDomNavigation } from '../../../core/infraestructure/router/router-dom/react-router-dom-navigation'

const languages = [
    'espanol',
    'english',
    'portugues',
    'frances',
    'mandarin',
    'japones',
    'aleman',
    'ruso',
    'hebreo',
]

export default function CreateProfilePage() {
    const stateFactory = useRefStateFactory()
    const {
        emailInput,
        preference1,
        preference2,
        preference3,
        subPreference1,
        subPreference2,
        subPreference3,
        language,
        isSubmitable,
        submit,
        onChangeLanguage,
        onChangePreference1,
        onChangePreference2,
        onChangePreference3,
        onChangeSubPreference1,
        onChangeSubPreference2,
        onChangeSubPreference3,
    } = createProfileLogic(
        stateFactory,
        createInputManager(stateFactory),
        useToastToastify(),
        nativeOnInitJobLazy(stateFactory),
        createProfileService(
            profileHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        useRouterDomNavigation(),
    )

    const onChangeEmail = (e: ChangeEvent<FormElement>) => {
        emailInput.onChange(e.target.value)
    }

    const onChangeSubPreference3Input = (e: ChangeEvent<FormElement>) => {
        onChangeSubPreference3(e.target.value)
    }

    const onChangeSubPreference2Input = (e: ChangeEvent<FormElement>) => {
        onChangeSubPreference2(e.target.value)
    }

    const onChangeSubPreference1Input = (e: ChangeEvent<FormElement>) => {
        onChangeSubPreference1(e.target.value)
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
                        Create profile
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
                                    height={600}
                                    src="https://upload.wikimedia.org/wikipedia/en/1/19/Marvel_Universe_%28Civil_War%29.jpg"
                                />
                            </Col>
                            <Spacer />
                            <Col>
                                <Input
                                    value={emailInput.value.value}
                                    onChange={onChangeEmail}
                                    helperText={emailInput.error.value}
                                    helperColor="error"
                                    type="email"
                                    placeholder="Ej: direcction@email.com"
                                    label="Email"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {preference1.value
                                            ? preference1.value
                                            : 'Select the first preference'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            onChangePreference1(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[preference1.value]}
                                    >
                                        <Dropdown.Item key={MediaType.MOVIE}>
                                            Movie
                                        </Dropdown.Item>
                                        <Dropdown.Item key={MediaType.SERIE}>
                                            Serie
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            key={MediaType.VIDEOGAME}
                                        >
                                            Videogame
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Input
                                    value={subPreference1.value}
                                    onChange={onChangeSubPreference1Input}
                                    label="Subpreference 1"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {preference2.value
                                            ? preference2.value
                                            : 'Select the second preference'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            onChangePreference2(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[preference2.value]}
                                    >
                                        <Dropdown.Item key={MediaType.MOVIE}>
                                            Movie
                                        </Dropdown.Item>
                                        <Dropdown.Item key={MediaType.SERIE}>
                                            Serie
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            key={MediaType.VIDEOGAME}
                                        >
                                            Videogame
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Input
                                    value={subPreference2.value}
                                    onChange={onChangeSubPreference2Input}
                                    label="Subpreference 2"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {preference3.value
                                            ? preference3.value
                                            : 'Select the third preference'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            onChangePreference3(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[preference3.value]}
                                    >
                                        <Dropdown.Item key={MediaType.MOVIE}>
                                            Movie
                                        </Dropdown.Item>
                                        <Dropdown.Item key={MediaType.SERIE}>
                                            Serie
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            key={MediaType.VIDEOGAME}
                                        >
                                            Videogame
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Input
                                    value={subPreference3.value}
                                    onChange={onChangeSubPreference3Input}
                                    label="Subpreference 3"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {language.value
                                            ? language.value
                                            : 'Language'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            onChangeLanguage(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[language.value]}
                                    >
                                        {languages.map((e) => (
                                            <Dropdown.Item key={e}>
                                                {e}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer y={1} />
                                <Button
                                    disabled={!isSubmitable()}
                                    onPress={submit}
                                >
                                    Create
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
