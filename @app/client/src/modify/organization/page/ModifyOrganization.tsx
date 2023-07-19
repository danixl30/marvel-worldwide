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
import { useRouterDomNavigation } from '../../../core/infraestructure/router/router-dom/react-router-dom-navigation'
import { useRefStateFactory } from '../../../core/infraestructure/state/useRefStateHandler'
import { createInputManager } from '../../../core/infraestructure/input-manager/useInputManager'
import { useToastToastify } from '../../../core/infraestructure/toast/toastify/toastify'
import { nativeOnInitJob } from '../../../core/infraestructure/on-init-job/nativeOnInitJob'
import { nativeOnInitJobLazy } from '../../../core/infraestructure/on-init-job/nativeOnInitJobLazy'
import { useEffectStateObserver } from '../../../core/infraestructure/state-observer/useEffectStateObserver'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { getAllHeroesVillainsApplicationService } from '../../../create-videogame/application/get.all.heroes.villains'
import { heroeHttpRepository } from '../../../heroe/infraestructure/repositories/heroe.http.repository'
import { useAxiosHttp } from '../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../../core/infraestructure/value-provider/useRefValueProvider'
import { villainHttpRepository } from '../../../villain/infraestructure/repositories/villain.http.repository'
import { organizationHttpRepository } from '../../../organization/infraestructure/repositories/organization.http.repository'
import { modifyOrganizationLogic } from '../logic/modify.organization'
import { getOrganizationByIdApplicationService } from '../../../details-organization/application/get.organization.id'
import { getAllCharactersApplicationService } from '../../../create-videogame/application/get.all.characters'
import { getAllHeadquartersApplicationService } from '../../../create-organization/application/get.all.headquarters'
import { modifyOrganizationApplicationService } from '../application/modify.organization'
import { civilHttpRepository } from '../../../civil/infraestructure/repositories/civil.http.repository'

export default function ModifyOrganizationPage() {
    const stateFactory = useRefStateFactory()
    const {
        submit,
        isSubmitable,
        nameInput,
        creationPlaceInput,
        chargeInput,
        leader,
        setLeader,
        setSelectedMember,
        selectedMemberCharacter,
        removeMember,
        addMember,
        addMemberIsSubmitable,
        sloganInput,
        objetiveInput,
        headquarterIdInput,
        headquarterCityInput,
        headquarterKindInput,
        headquarterNameInput,
        headquarterCountryInput,
        founderInput,
        members,
        charactersToSelect,
        isLoadingCharacters,
        errorCharacters,
        headquarters,
        isLoadingHeadquarters,
        errorHeadquarters,
        firstApparitionInput,
        membersBase,
        membersToRemove,
        removeMemberBase,
    } = modifyOrganizationLogic(
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
        getAllHeadquartersApplicationService(
            organizationHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        modifyOrganizationApplicationService(
            organizationHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getOrganizationByIdApplicationService(
            organizationHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        useRouterDomNavigation(),
    )
    if (isLoadingCharacters.value || isLoadingHeadquarters.value) {
        return (
            <>
                <Spinner />
            </>
        )
    }
    if (errorCharacters.value || errorHeadquarters.value) {
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
                        Modify Organization
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
                                    value={nameInput.value.value}
                                    onChange={(e) =>
                                        nameInput.onChange(e.target.value)
                                    }
                                    helperText={nameInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Name"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Textarea
                                    value={objetiveInput.value.value}
                                    onChange={(e) =>
                                        objetiveInput.onChange(e.target.value)
                                    }
                                    label="Objetive"
                                    bordered
                                />
                                <Spacer x={1} />
                                <Textarea
                                    value={sloganInput.value.value}
                                    onChange={(e) =>
                                        sloganInput.onChange(e.target.value)
                                    }
                                    label="Slogan"
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={creationPlaceInput.value.value}
                                    onChange={(e) =>
                                        creationPlaceInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={creationPlaceInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Creation place"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={firstApparitionInput.value.value}
                                    onChange={(e) =>
                                        firstApparitionInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={
                                        firstApparitionInput.error.value
                                    }
                                    helperColor="error"
                                    placeholder=""
                                    label="First Apparition"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={headquarterNameInput.value.value}
                                    onChange={(e) =>
                                        headquarterNameInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={
                                        headquarterNameInput.error.value
                                    }
                                    helperColor="error"
                                    placeholder=""
                                    label="Headquarter name"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={headquarterKindInput.value.value}
                                    onChange={(e) =>
                                        headquarterKindInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={
                                        headquarterKindInput.error.value
                                    }
                                    helperColor="error"
                                    placeholder=""
                                    label="Headquarter kind"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={headquarterCountryInput.value.value}
                                    onChange={(e) =>
                                        headquarterCountryInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={
                                        headquarterCountryInput.error.value
                                    }
                                    helperColor="error"
                                    placeholder=""
                                    label="Headquarter country"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={headquarterCityInput.value.value}
                                    onChange={(e) =>
                                        headquarterCityInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={
                                        headquarterCityInput.error.value
                                    }
                                    helperColor="error"
                                    placeholder=""
                                    label="Headquarter city"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {headquarterIdInput.value.value &&
                                        headquarters.value
                                            ? headquarters.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      headquarterIdInput.value
                                                          .value,
                                              )?.name || ''
                                            : 'Select a headquarter'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            headquarterIdInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            headquarterIdInput.value.value,
                                        ]}
                                    >
                                        {headquarters.value ? (
                                            headquarters.value.map(
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
                                        {charactersToSelect.value &&
                                        leader.value
                                            ? charactersToSelect.value.find(
                                                  (e) =>
                                                      e.id === leader.value?.id,
                                              )?.name || ''
                                            : 'Select a leader'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            setLeader(
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
                                        selectedKeys={[leader.value?.id || '']}
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
                                        {charactersToSelect.value &&
                                        founderInput.value.value
                                            ? charactersToSelect.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      founderInput.value.value,
                                              )?.name || ''
                                            : 'Select a founder'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            founderInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            founderInput.value.value || '',
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
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {charactersToSelect.value &&
                                        selectedMemberCharacter.value
                                            ? charactersToSelect.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      selectedMemberCharacter
                                                          .value?.id,
                                              )?.name || ''
                                            : 'Select a character'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            setSelectedMember(
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
                                        selectedKeys={[leader.value?.id || '']}
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
                                <Input
                                    value={chargeInput.value.value}
                                    onChange={(e) =>
                                        chargeInput.onChange(e.target.value)
                                    }
                                    helperText={chargeInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Charge"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Button
                                    disabled={!addMemberIsSubmitable()}
                                    onPress={() => addMember()}
                                >
                                    Add Member
                                </Button>
                                <Spacer x={1} />
                                {membersBase.value
                                    .filter(
                                        (e) =>
                                            !membersToRemove.value.find(
                                                (mem) => mem.id === e.id,
                                            ),
                                    )
                                    .map((member) => (
                                        <Card
                                            css={{
                                                padding: 10,
                                                alignItems: 'center',
                                                marginBottom: 20,
                                                background: '#575757',
                                            }}
                                        >
                                            <Text>
                                                {charactersToSelect.value?.find(
                                                    (e) => e.id === member.id,
                                                    member.id,
                                                )?.name || ''}
                                            </Text>
                                            <Text>{member.kind}</Text>
                                            <Text>{member.charge}</Text>
                                            <Button
                                                onPress={() =>
                                                    removeMemberBase(member)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Card>
                                    ))}
                                {members.value.map((member) => (
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            background: '#575757',
                                        }}
                                    >
                                        <Text>
                                            {charactersToSelect.value?.find(
                                                (e) => e.id === member.id,
                                                member.id,
                                            )?.name || ''}
                                        </Text>
                                        <Text>{member.kind}</Text>
                                        <Text>{member.charge}</Text>
                                        <Button
                                            onPress={() => removeMember(member)}
                                        >
                                            Remove
                                        </Button>
                                    </Card>
                                ))}
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Button
                                    disabled={!isSubmitable()}
                                    onPress={submit}
                                >
                                    Modify
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
