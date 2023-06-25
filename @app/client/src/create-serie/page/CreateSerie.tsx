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
import { getAllCharactersApplicationService } from '../../create-videogame/application/get.all.characters'
import { getAllOrganizationsApplicationService } from '../../create-videogame/application/get.all.organizations'
import { heroeHttpRepository } from '../../heroe/infraestructure/repositories/heroe.http.repository'
import { organizationHttpRepository } from '../../organization/infraestructure/repositories/organization.http.repository'
import { serieHttpRepository } from '../../serie/infraestructure/repositories/serie.http.repository'
import { villainHttpRepository } from '../../villain/infraestructure/repositories/villain.http.repository'
import { createSerieApplicationService } from '../application/create.serie'
import {
    actorRoles,
    createSerieLogic,
    serieTypes,
} from '../logic/create-serie.logic'

export default function CreateSeriePage() {
    const stateFactory = useRefStateFactory()
    const {
        comicInput,
        release,
        creatorInput,
        onChangeRelease,
        submit,
        isSubmitable,
        addOrganization,
        organizations,
        titleInput,
        synopsisInput,
        actors,
        removeActor,
        typeInput,
        submitAddActor,
        removeOrganization,
        setCharacter,
        character,
        actorRoleInput,
        actorLastNameInput,
        actorFirstNameInput,
        characters,
        isLoadingCharacters,
        errorCharacters,
        organizationsOptions,
        isLoadingOrgs,
        errorOrganizations,
        actorAddSubmitable,
        channelInput,
        episodesInput,
    } = createSerieLogic(
        stateFactory,
        createInputManager(stateFactory),
        useToastToastify(),
        nativeOnInitJob(stateFactory, useEffectStateObserver, useEffectOnInit),
        nativeOnInitJobLazy(stateFactory),
        getAllCharactersApplicationService(
            civilHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
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
        getAllOrganizationsApplicationService(
            organizationHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        createSerieApplicationService(
            serieHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
    )
    const organizationInput = stateFactory('')
    const organizationParticipationInput = stateFactory('')
    if (isLoadingCharacters.value || isLoadingOrgs.value) {
        return (
            <>
                <Spinner />
            </>
        )
    }
    if (errorCharacters.value || errorOrganizations.value) {
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
                        Create Serie
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
                                    value={titleInput.value.value}
                                    onChange={(e) =>
                                        titleInput.onChange(e.target.value)
                                    }
                                    helperText={titleInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Title"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Textarea
                                    value={synopsisInput.value.value}
                                    onChange={(e) =>
                                        synopsisInput.onChange(e.target.value)
                                    }
                                    label="Synopsis"
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={comicInput.value.value}
                                    onChange={(e) =>
                                        comicInput.onChange(e.target.value)
                                    }
                                    helperText={comicInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Comic"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={creatorInput.value.value}
                                    onChange={(e) =>
                                        creatorInput.onChange(e.target.value)
                                    }
                                    helperText={creatorInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Creator"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={channelInput.value.value}
                                    onChange={(e) =>
                                        channelInput.onChange(e.target.value)
                                    }
                                    helperText={channelInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Channel"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={episodesInput.value.value}
                                    onChange={(e) =>
                                        episodesInput.onChange(e.target.value)
                                    }
                                    helperText={episodesInput.error.value}
                                    type="number"
                                    min={1}
                                    helperColor="error"
                                    placeholder=""
                                    label="Num of episodes"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {typeInput.value.value
                                            ? typeInput.value.value
                                            : 'Select a type'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            typeInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[typeInput.value.value]}
                                    >
                                        {serieTypes.map((e) => (
                                            <Dropdown.Item key={e}>
                                                {e}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Input
                                    value={release.value?.getUTCDate() || ''}
                                    onChange={(e) =>
                                        onChangeRelease(
                                            new Date(e.target.value),
                                        )
                                    }
                                    type="date"
                                    label="Release"
                                    placeholder="Ex: 12/01/2000"
                                    rounded
                                    bordered
                                />
                                <Spacer y={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {organizationInput.state.value &&
                                        organizationsOptions.value
                                            ? organizationsOptions.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      organizationInput.state
                                                          .value,
                                              )?.name || ''
                                            : 'Select an organization'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            organizationInput.setState(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            organizationInput.state.value,
                                        ]}
                                    >
                                        {organizationsOptions.value ? (
                                            organizationsOptions.value.map(
                                                (organization) => (
                                                    <Dropdown.Item
                                                        key={organization.id}
                                                    >
                                                        {organization.name}
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
                                        {organizationParticipationInput.state
                                            .value
                                            ? organizationParticipationInput
                                                  .state.value
                                            : 'Select a organization participation'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            organizationParticipationInput.setState(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            organizationParticipationInput.state
                                                .value,
                                        ]}
                                    >
                                        {actorRoles.map((e) => (
                                            <Dropdown.Item key={e}>
                                                {e}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Button
                                    disabled={
                                        !organizationInput.state.value ||
                                        !organizationParticipationInput.state
                                            .value
                                    }
                                    onPress={() =>
                                        addOrganization({
                                            id: organizationInput.state.value,
                                            participationType:
                                                organizationParticipationInput
                                                    .state.value,
                                        })
                                    }
                                >
                                    Add Organization
                                </Button>
                                <Spacer x={1} />
                                {organizations.value.map((power) => (
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
                                                {organizationsOptions.value?.find(
                                                    (e) => e.id === power.id,
                                                )?.name || ''}
                                            </Text>
                                            <Button
                                                onPress={() =>
                                                    removeOrganization(power)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Card>
                                    </>
                                ))}
                                <Spacer x={1} />
                                <Spacer y={1} />
                                <Spacer x={1} />
                                <Input
                                    value={actorFirstNameInput.value.value}
                                    onChange={(e) =>
                                        actorFirstNameInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    label="Actor first name"
                                    rounded
                                    bordered
                                />
                                <Spacer y={1} />
                                <Input
                                    value={actorLastNameInput.value.value}
                                    onChange={(e) =>
                                        actorLastNameInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    label="Actor last name"
                                    rounded
                                    bordered
                                />
                                <Spacer y={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {character.value && characters.value
                                            ? characters.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      character.value?.id,
                                              )?.name || ''
                                            : 'Select a character'}
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
                                <Dropdown>
                                    <Dropdown.Button>
                                        {actorRoleInput.value.value
                                            ? actorRoleInput.value.value
                                            : 'Select a role'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            actorRoleInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            actorRoleInput.value.value,
                                        ]}
                                    >
                                        {actorRoles.map((e) => (
                                            <Dropdown.Item key={e}>
                                                {e}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Button
                                    disabled={!actorAddSubmitable()}
                                    onPress={() => submitAddActor()}
                                >
                                    Add Actor
                                </Button>
                                <Spacer x={1} />
                                {actors.value.map((actor) => (
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
                                                First name:{' '}
                                                {actor.name.firstName}
                                            </Text>
                                            <Text h3>
                                                Last name: {actor.name.lastName}
                                            </Text>
                                            <Text h3>Role: {actor.role}</Text>
                                            <Text h3>
                                                {characters.value?.find(
                                                    (e) =>
                                                        e.id ===
                                                        actor.character.id,
                                                )?.name || ''}
                                            </Text>
                                            <Button
                                                onPress={() =>
                                                    removeActor(actor)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Card>
                                    </>
                                ))}
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
