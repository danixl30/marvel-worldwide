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
                    <Text h1 size={50}>
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
                                    height={900}
                                    src="https://upload.wikimedia.org/wikipedia/en/1/19/Marvel_Universe_%28Civil_War%29.jpg"
                                />
                            </Col>
                            <Spacer />
                            <Col>
                                <Input
                                    value={emailInput.value.value}
                                    onChange={onChangeEmail}
                                    helperText={emailInput.error.value}
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
                                        <Dropdown.Item key="movie">
                                            Movie
                                        </Dropdown.Item>
                                        <Dropdown.Item key="serie">
                                            Serie
                                        </Dropdown.Item>
                                        <Dropdown.Item key="Videogame">
                                            Videogame
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Input
                                    value={subPreference1.value}
                                    onChange={onChangeSubPreference1Input}
                                    label="Subpreference 1"
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
                                        <Dropdown.Item key="movie">
                                            Movie
                                        </Dropdown.Item>
                                        <Dropdown.Item key="serie">
                                            Serie
                                        </Dropdown.Item>
                                        <Dropdown.Item key="Videogame">
                                            Videogame
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Input
                                    value={subPreference2.value}
                                    onChange={onChangeSubPreference2Input}
                                    label="Subpreference 2"
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
                                        <Dropdown.Item key="movie">
                                            Movie
                                        </Dropdown.Item>
                                        <Dropdown.Item key="serie">
                                            Serie
                                        </Dropdown.Item>
                                        <Dropdown.Item key="Videogame">
                                            Videogame
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Input
                                    value={subPreference3.value}
                                    onChange={onChangeSubPreference3Input}
                                    label="Subpreference 3"
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
