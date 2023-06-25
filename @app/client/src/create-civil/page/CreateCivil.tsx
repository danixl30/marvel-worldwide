import {
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    Input,
    Row,
    Spacer,
    Spinner,
    Text,
    Textarea,
} from '@nextui-org/react'
import { civilHttpRepository } from '../../civil/infraestructure/repositories/civil.http.repository'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { createInputManager } from '../../core/infraestructure/input-manager/useInputManager'
import { nativeOnInitJob } from '../../core/infraestructure/on-init-job/nativeOnInitJob'
import { nativeOnInitJobLazy } from '../../core/infraestructure/on-init-job/nativeOnInitJobLazy'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { useToastToastify } from '../../core/infraestructure/toast/toastify/toastify'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'
import { getAllHeroesVillainsApplicationService } from '../../create-videogame/application/get.all.heroes.villains'
import { heroeHttpRepository } from '../../heroe/infraestructure/repositories/heroe.http.repository'
import { villainHttpRepository } from '../../villain/infraestructure/repositories/villain.http.repository'
import { createCivilApplicationService } from '../application/create.civil'
import {
    createCivilLogic,
    genders,
    maritialStatuses,
} from '../logic/create-civil.logic'

export default function CreateCivilPage() {
    const stateFactory = useRefStateFactory()
    const {
        submit,
        isSubmitable,
        personId,
        personNameInput,
        addOccupation,
        addNationality,
        occupations,
        nationalities,
        removeOccupation,
        removeNationality,
        hairColorInput,
        eyesColorInput,
        nationalityInput,
        occupationInput,
        genderStatusInput,
        maritialStatusInput,
        phrseInput,
        character,
        setCharacter,
        characters,
        isLoadingCharacters,
        errorCharacters,
    } = createCivilLogic(
        stateFactory,
        createInputManager(stateFactory),
        useToastToastify(),
        nativeOnInitJob(stateFactory, useEffectStateObserver, useEffectOnInit),
        nativeOnInitJobLazy(stateFactory),
        getAllHeroesVillainsApplicationService(
            heroeHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
            villainHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        createCivilApplicationService(
            civilHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
    )
    if (isLoadingCharacters.value) {
        return <Spinner />
    }
    if (errorCharacters.value) {
        return <Text>Error loading data</Text>
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
                        Create Civil
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
                            <Spacer />
                            <Col>
                                <Spacer y={1} />
                                <Input
                                    value={personNameInput.value.value}
                                    onChange={(e) =>
                                        personNameInput.onChange(e.target.value)
                                    }
                                    helperText={personNameInput.error.value}
                                    label="Person Name"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={hairColorInput.value.value}
                                    onChange={(e) =>
                                        hairColorInput.onChange(e.target.value)
                                    }
                                    helperText={hairColorInput.error.value}
                                    label="Person hair color"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={eyesColorInput.value.value}
                                    onChange={(e) =>
                                        eyesColorInput.onChange(e.target.value)
                                    }
                                    helperText={eyesColorInput.error.value}
                                    label="Person eyes color"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Input
                                    value={nationalityInput.value.value}
                                    onChange={(e) =>
                                        nationalityInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={nationalityInput.error.value}
                                    label="Person nationality"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Button
                                    disabled={
                                        !nationalityInput.value.value ||
                                        Boolean(nationalityInput.error.value)
                                    }
                                    onPress={() =>
                                        addNationality(
                                            nationalityInput.value.value,
                                        )
                                    }
                                >
                                    Add nationality
                                </Button>
                                {nationalities.value.map((e) => (
                                    <Card>
                                        <Text h3>{e}</Text>
                                        <Button
                                            onPress={() => removeNationality(e)}
                                        >
                                            Remove
                                        </Button>
                                    </Card>
                                ))}
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Input
                                    value={occupationInput.value.value}
                                    onChange={(e) =>
                                        occupationInput.onChange(e.target.value)
                                    }
                                    helperText={occupationInput.error.value}
                                    label="Person occupation"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Button
                                    disabled={
                                        !occupationInput.value.value ||
                                        Boolean(occupationInput.error.value)
                                    }
                                    onPress={() =>
                                        addOccupation(
                                            occupationInput.value.value,
                                        )
                                    }
                                >
                                    Add occupation
                                </Button>
                                {occupations.value.map((e) => (
                                    <Card>
                                        <Text h3>{e}</Text>
                                        <Button
                                            onPress={() => removeOccupation(e)}
                                        >
                                            Remove
                                        </Button>
                                    </Card>
                                ))}
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {genderStatusInput.value.value
                                            ? genderStatusInput.value.value
                                            : 'Select a gender'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            genderStatusInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            genderStatusInput.value.value,
                                        ]}
                                    >
                                        {genders.map((e) => (
                                            <Dropdown.Item key={e}>
                                                {e}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {maritialStatusInput.value.value
                                            ? maritialStatusInput.value.value
                                            : 'Select a maritialStatus'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            maritialStatusInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            maritialStatusInput.value.value,
                                        ]}
                                    >
                                        {maritialStatuses.map((e) => (
                                            <Dropdown.Item key={e}>
                                                {e}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Textarea
                                    value={phrseInput.value.value}
                                    onChange={(e) =>
                                        phrseInput.onChange(e.target.value)
                                    }
                                    label="Phrase"
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {character.value && characters.value
                                            ? characters.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      character.value?.id,
                                              )?.name || ''
                                            : 'Select a relation'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            setCharacter(
                                                characters.value?.find(
                                                    (e) =>
                                                        e.id ===
                                                        Array.from(
                                                            keys as Set<string>,
                                                        )[0],
                                                ) || {
                                                    id: '',
                                                    kind: '',
                                                },
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            character.value?.id || '',
                                        ]}
                                    >
                                        {characters.value ? (
                                            characters.value.map(
                                                (organization) => (
                                                    <Dropdown.Item
                                                        key={organization.id}
                                                    >
                                                        {`${organization.name} --- ${organization.kind}`}
                                                    </Dropdown.Item>
                                                ),
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
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
