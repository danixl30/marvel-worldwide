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
import { heroeHttpRepository } from '../../../heroe/infraestructure/repositories/heroe.http.repository'
import { useAxiosHttp } from '../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../../core/infraestructure/value-provider/useRefValueProvider'
import { villainHttpRepository } from '../../../villain/infraestructure/repositories/villain.http.repository'
import { getAllObjectsApplicationService } from '../../../create-heroe/application/get.all.objects'
import { getAllPowersApplicationService } from '../../../create-heroe/application/get.all.powers'
import {
    genders,
    maritialStatuses,
    modifyVillainLogic,
    powerTypes,
} from '../logic/modify.villain'
import { modifyVillainApplicationService } from '../application/modify.villain'
import { getVillainByIdApplicationService } from '../../../detials-villain/application/get.villain.id'
import { getAllHeroesApplicationService } from '../../../create-villain/application/get.all.heroes'

export default function ModifyVillainPage() {
    const stateFactory = useRefStateFactory()
    const {
        submit,
        isSubmitable,
        personId,
        personNameInput,
        nameInput,
        objects,
        powers,
        powerIds,
        powerNameInput,
        powerTypeInput,
        powerDescriptionInput,
        powerInputIsSubmitable,
        objectIds,
        objetiveInput,
        objectKindInput,
        objectNameInput,
        objectCreatorInput,
        objectMaterialInput,
        objectDescriptionInput,
        objectInputIsSubmitable,
        addEnemyId,
        addPowerId,
        addObjectcId,
        addOccupation,
        addNationality,
        occupations,
        nationalities,
        submitAddPower,
        submitAddObject,
        removeObject,
        removePower,
        removeEnemyId,
        removePowerId,
        removeObjectId,
        removeOccupation,
        removeNationality,
        heroes,
        isLoadingHeroes,
        errorHeroes,
        powersSelect,
        isLoadingPowers,
        errorPowers,
        objectsSelect,
        isLoadingObjects,
        errorObjects,
        creatorFirstNameInput,
        creatorLastNameNameInput,
        hairColorInput,
        eyesColorInput,
        nationalityInput,
        genderStatusInput,
        phrseInput,
        maritialStatusInput,
        enemyInput,
        occupationInput,
        enemiesIds,
        powersBase,
        powersToRemove,
        removePowerBase,
        objectsBase,
        objectsToRemove,
        removeObjectBase,
        enemiesIdsBase,
        enemiesIdsToRemove,
        removeEnemyBase,
    } = modifyVillainLogic(
        stateFactory,
        createInputManager(stateFactory),
        useToastToastify(),
        nativeOnInitJob(stateFactory, useEffectStateObserver, useEffectOnInit),
        nativeOnInitJobLazy(stateFactory),
        getAllHeroesApplicationService(
            heroeHttpRepository(
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
        modifyVillainApplicationService(
            villainHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        getVillainByIdApplicationService(
            villainHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
        useRouterDomNavigation(),
    )
    const powerSelected = stateFactory<string>('')
    const objectSelected = stateFactory<string>('')
    if (
        isLoadingHeroes.value ||
        isLoadingPowers.value ||
        isLoadingObjects.value
    ) {
        return (
            <>
                <Spinner />
            </>
        )
    }
    if (errorHeroes.value || errorPowers.value || errorObjects.value) {
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
                        Modify Villain
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
                                <Input
                                    value={objetiveInput.value.value}
                                    onChange={(e) =>
                                        objetiveInput.onChange(e.target.value)
                                    }
                                    helperText={objetiveInput.error.value}
                                    helperColor="error"
                                    placeholder=""
                                    label="Objetive"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={creatorFirstNameInput.value.value}
                                    onChange={(e) =>
                                        creatorFirstNameInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={
                                        creatorFirstNameInput.error.value
                                    }
                                    helperColor="error"
                                    placeholder=""
                                    label="Creator first name"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={creatorLastNameNameInput.value.value}
                                    onChange={(e) =>
                                        creatorLastNameNameInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    helperText={
                                        creatorLastNameNameInput.error.value
                                    }
                                    helperColor="error"
                                    placeholder=""
                                    label="Creator last name"
                                    rounded
                                    bordered
                                />
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
                                {powersBase.value
                                    .filter(
                                        (e) =>
                                            !powersToRemove.value.find(
                                                (po) => po === e,
                                            ),
                                    )
                                    .map((power) => (
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
                                                        removePowerBase(power)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </Card>
                                        </>
                                    ))}
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
                                            : 'Select an object'}
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
                                        disabledKeys={['None']}
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
                                            <Dropdown.Item key={'None'}>
                                                None
                                            </Dropdown.Item>
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
                                {objectsBase.value
                                    .filter(
                                        (e) =>
                                            !powersToRemove.value.find(
                                                (obj) => e === obj,
                                            ),
                                    )
                                    .map((object) => (
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
                                                        removeObjectBase(object)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </Card>
                                        </>
                                    ))}
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
                                <Input
                                    value={powerNameInput.value.value}
                                    onChange={(e) =>
                                        powerNameInput.onChange(e.target.value)
                                    }
                                    label="Power name"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Textarea
                                    value={powerDescriptionInput.value.value}
                                    onChange={(e) =>
                                        powerDescriptionInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    label="Power description"
                                    bordered
                                />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {powerTypeInput.value.value
                                            ? powerTypeInput.value.value
                                            : 'Select a pover type'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            powerTypeInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[
                                            powerTypeInput.value.value,
                                        ]}
                                    >
                                        {powerTypes.map((e) => (
                                            <Dropdown.Item key={e}>
                                                {e}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Button
                                    disabled={!powerInputIsSubmitable()}
                                    onPress={submitAddPower}
                                >
                                    Add power
                                </Button>
                                <Spacer x={1} />
                                {powers.value.map((e) => (
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            background: '#575757',
                                        }}
                                    >
                                        <Text>{e.name}</Text>
                                        <Text>{e.description}</Text>
                                        <Text>{e.type}</Text>
                                        <Button onPress={() => removePower(e)}>
                                            Remove
                                        </Button>
                                    </Card>
                                ))}
                                <Spacer y={1} />
                                <Input
                                    value={objectNameInput.value.value}
                                    onChange={(e) =>
                                        objectNameInput.onChange(e.target.value)
                                    }
                                    label="Object name"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Textarea
                                    value={objectDescriptionInput.value.value}
                                    onChange={(e) =>
                                        objectDescriptionInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    label="Object description"
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={objectKindInput.value.value}
                                    onChange={(e) =>
                                        objectKindInput.onChange(e.target.value)
                                    }
                                    label="Object kind"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={objectCreatorInput.value.value}
                                    onChange={(e) =>
                                        objectCreatorInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    label="Object creator"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Input
                                    value={objectMaterialInput.value.value}
                                    onChange={(e) =>
                                        objectMaterialInput.onChange(
                                            e.target.value,
                                        )
                                    }
                                    label="Object material"
                                    rounded
                                    bordered
                                />
                                <Spacer x={1} />
                                <Button
                                    disabled={!objectInputIsSubmitable()}
                                    onPress={submitAddObject}
                                >
                                    Add object
                                </Button>
                                <Spacer x={1} />
                                {objects.value.map((e) => (
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            background: '#575757',
                                        }}
                                    >
                                        <Text h3>Name: {e.name}</Text>
                                        <Text h3>
                                            Description: {e.description}
                                        </Text>
                                        <Text h3>Kind: {e.kind}</Text>
                                        <Text h3>Creator: {e.creator}</Text>
                                        <Text h3>Manerial: {e.material}</Text>
                                        <Button onPress={() => removeObject(e)}>
                                            Remove
                                        </Button>
                                    </Card>
                                ))}
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
                                <Spacer x={1} />
                                {nationalities.value.map((e) => (
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            background: '#575757',
                                        }}
                                    >
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
                                <Spacer x={1} />
                                {occupations.value.map((e) => (
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            background: '#575757',
                                        }}
                                    >
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
                                <Spacer x={1} />
                                <Spacer x={1} />
                                <Dropdown>
                                    <Dropdown.Button>
                                        {enemyInput.value.value &&
                                        heroes.value?.isNotEmpty()
                                            ? heroes.value.find(
                                                  (e) =>
                                                      e.id ===
                                                      enemyInput.value.value,
                                              )?.name || ''
                                            : 'Select a heroe for enemy'}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Static Actions"
                                        onSelectionChange={(keys) =>
                                            enemyInput.onChange(
                                                Array.from(
                                                    keys as Set<string>,
                                                )[0],
                                            )
                                        }
                                        selectionMode="single"
                                        selectedKeys={[enemyInput.value.value]}
                                    >
                                        {heroes.value ? (
                                            heroes.value.map((heroe) => (
                                                <Dropdown.Item key={heroe.id}>
                                                    {heroe.name}
                                                </Dropdown.Item>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Spacer x={1} />
                                <Button
                                    disabled={
                                        !Boolean(enemyInput.value) ||
                                        Boolean(enemyInput.error.value)
                                    }
                                    onPress={() =>
                                        addEnemyId(enemyInput.value.value)
                                    }
                                >
                                    Add enemy
                                </Button>
                                <Spacer x={1} />
                                {enemiesIds.value.map((e) => (
                                    <Card
                                        css={{
                                            padding: 10,
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            background: '#575757',
                                        }}
                                    >
                                        <Text h3>
                                            {heroes.value?.find(
                                                (h) => h.id === e,
                                            )?.name || ''}
                                        </Text>
                                        <Button
                                            onPress={() => removeEnemyId(e)}
                                        >
                                            Remove
                                        </Button>
                                    </Card>
                                ))}
                                <Spacer x={1} />
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
