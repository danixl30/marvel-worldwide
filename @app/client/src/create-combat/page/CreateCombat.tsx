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
} from '@nextui-org/react'
import { createCombatLogic } from '../logic/create-combat.logic'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { createInputManager } from '../../core/infraestructure/input-manager/useInputManager'
import { useToastToastify } from '../../core/infraestructure/toast/toastify/toastify'
import { nativeOnInitJob } from '../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { nativeOnInitJobLazy } from '../../core/infraestructure/on-init-job/nativeOnInitJobLazy'
import { getAllHeroesVillainsApplicationService } from '../../create-videogame/application/get.all.heroes.villains'
import { heroeHttpRepository } from '../../heroe/infraestructure/repositories/heroe.http.repository'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'
import { villainHttpRepository } from '../../villain/infraestructure/repositories/villain.http.repository'
import { createCombatApplicationService } from '../application/create.combat'
import { combatHttpRepository } from '../../combat/infraestructure/repositories/combat.http.repository'
import { getAllObjectsApplicationService } from '../../create-heroe/application/get.all.objects'
import { getAllPowersApplicationService } from '../../create-heroe/application/get.all.powers'

export default function CreateCombat() {
    const stateFactory = useRefStateFactory()
    const {
        submit,
        isSubmitable,
        addPowerId,
        addCharacter,
        addObjectcId,
        addCharacterIsSubmitable,
        date,
        character,
        removeCharacter,
        removePowerId,
        removeObjectId,
        selectCharacter,
        onChangeDate,
        placeNameInput,
        characters,
        charactersToSelect,
        isLoadingCharacters,
        errorCharacters,
        powersSelect,
        isLoadingPowers,
        errorPowers,
        objectsSelect,
        isLoadingObjects,
        errorObjects,
        objectIds,
        powerIds,
    } = createCombatLogic(
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
        getAllObjectsApplicationService(
            heroeHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getAllPowersApplicationService(
            heroeHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        createCombatApplicationService(
            combatHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
    )
    const powerSelected = stateFactory<string>('')
    const objectSelected = stateFactory<string>('')
    if (
        isLoadingCharacters.value ||
        isLoadingPowers.value ||
        isLoadingObjects.value
    ) {
        return (
            <>
                <Spinner />
            </>
        )
    }
    if (errorCharacters.value || errorPowers.value || errorObjects.value) {
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
                        Create Combat
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
                                <Input
                                    value={placeNameInput.value.value}
                                    onChange={(e) =>
                                        placeNameInput.onChange(e.target.value)
                                    }
                                    helperText={placeNameInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Place"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={date.value?.getUTCDate() || ''}
                                    onChange={(e) =>
                                        onChangeDate(new Date(e.target.value))
                                    }
                                    type="date"
                                    label="Date"
                                    placeholder="Ex: 12/01/2000"
                                    rounded
                                    bordered
                                />
                                <Spacer y={1} />
                                <Spacer y={1} />
                                <Spacer y={1} />
                                <Spacer y={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {character.value &&
                                        charactersToSelect.value?.isNotEmpty()
                                            ? charactersToSelect.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      character.value?.id,
                                              )?.name || ''
                                            : 'Select a character'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            selectCharacter(
                                                charactersToSelect.value?.find(
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
                                        {charactersToSelect.value ? (
                                            charactersToSelect.value.map(
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
                                <Dropdown>
                                    <Dropdown.Button>
                                        {powerSelected.state.value &&
                                        powersSelect.value
                                            ? powersSelect.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      powerSelected.state.value,
                                              )?.name || ''
                                            : 'Select a power'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            powerSelected.setState(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            powerSelected.state.value,
                                        ]}
                                    >
                                        {powersSelect.value ? (
                                            powersSelect.value.map((power) => (
                                                <Dropdown.Item key={power.id}>
                                                    {power.name}
                                                </Dropdown.Item>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Button
                                    disabled={!powerSelected.state.value}
                                    onPress={() =>
                                        addPowerId(powerSelected.state.value)
                                    }
                                >
                                    AddPower
                                </Button>
                                <Spacer x={1} />
                                {powerIds.value.map((power) => (
                                    <>
                                        <Card
                                            css={{
                                                padding: 10,
                                                alignItems: 'center',
                                                marginBottom: 20,
                                                background: '#575757',
                                            }}
                                        >
                                            <Text h3>
                                                {powersSelect.value?.find(
                                                    (e) => e.id === power,
                                                )?.name || ''}
                                            </Text>
                                            <Button
                                                onPress={() =>
                                                    removePowerId(power)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Card>
                                    </>
                                ))}
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {objectSelected.state.value &&
                                        objectsSelect.value
                                            ? objectsSelect.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      objectSelected.state
                                                          .value,
                                              )?.name || ''
                                            : 'Select a object'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            objectSelected.setState(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            objectSelected.state.value,
                                        ]}
                                    >
                                        {objectsSelect.value ? (
                                            objectsSelect.value.map(
                                                (object) => (
                                                    <Dropdown.Item
                                                        key={object.id}
                                                    >
                                                        {object.name}
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
                                    disabled={!objectSelected.state.value}
                                    onPress={() =>
                                        addObjectcId(objectSelected.state.value)
                                    }
                                >
                                    Add Object
                                </Button>
                                <Spacer x={1} />
                                {objectIds.value.map((object) => (
                                    <>
                                        <Card
                                            css={{
                                                padding: 10,
                                                alignItems: 'center',
                                                marginBottom: 20,
                                                background: '#575757',
                                            }}
                                        >
                                            <Text h3>
                                                {objectsSelect.value?.find(
                                                    (e) => e.id === object,
                                                )?.name || ''}
                                            </Text>
                                            <Button
                                                onPress={() =>
                                                    removeObjectId(object)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Card>
                                    </>
                                ))}
                                <Spacer x={1} />
                                <Button
                                    disabled={!addCharacterIsSubmitable()}
                                    onPress={() => addCharacter()}
                                >
                                    Add Character
                                </Button>
                                {characters.value.map((character) => (
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            background: '#575757',
                                        }}
                                    >
                                        <Text h3>
                                            {charactersToSelect.value?.find(
                                                (e) => e.id === character.id,
                                                character.id,
                                            )?.name || ''}
                                        </Text>
                                        <Text h3>{character.kind}</Text>
                                        <Text h3>Powers:</Text>
                                        {character.powers.map((power) => (
                                            <Text h3>
                                                {powersSelect.value?.find(
                                                    (e) => e.id === power,
                                                )?.name || ''}
                                            </Text>
                                        ))}
                                        <Text h3>Objects:</Text>
                                        {character.objects.map((object) => (
                                            <Text h3>
                                                {objectsSelect.value?.find(
                                                    (e) => e.id === object,
                                                )?.name || ''}
                                            </Text>
                                        ))}
                                    </Card>
                                ))}
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
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
