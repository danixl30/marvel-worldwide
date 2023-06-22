import { Optional } from '@mono/types-utils'
import { InputManager } from '../../core/application/input-manager'
import { StateFactory } from '../../core/application/state/state-factory'
import { ToastProvider } from '../../core/application/toast/toast'

type PowerInput = {
    name: string
    description: string
    type: string
}

type ObjectInput = {
    name: string
    description: string
    kind: string
    material: string
    creator: string
}

export const powerTypes = ['artificial', 'natural', 'inherited']

export const maritialStatuses = ['S', 'M', 'W', 'D']

export const genders = ['M', 'F', 'U', 'O']

export const createVillainLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
) => {
    const personNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid person name'
            return ''
        },
        (data) => data,
    )
    const phrseInput = inputManagerFactory(
        '',
        (data) => {
            return ''
        },
        (data) => data,
    )
    const hairColorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid person name'
            return ''
        },
        (data) => data,
    )
    const eyesColorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid person name'
            return ''
        },
        (data) => data,
    )
    const maritialStatusInput = inputManagerFactory(
        '',
        (data) => {
            if (!maritialStatuses.find((e) => e === data))
                return 'Invalid maritial status'
            return ''
        },
        (data) => data,
    )
    const genderStatusInput = inputManagerFactory(
        '',
        (data) => {
            if (!genders.find((e) => e === data)) return 'Invalid person name'
            return ''
        },
        (data) => data,
    )
    const nameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const objetiveInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const creatorFirstNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const creatorLastNameNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const powerNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const powerDescriptionInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const powerTypeInput = inputManagerFactory(
        '',
        (data) => {
            if (!powerTypes.find((e) => e === data)) return 'Invalid power type'
            return ''
        },
        (data) => data,
    )
    const objectNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const objectDescriptionInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const objectKindInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const objectCreatorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const objectMaterialInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid name'
            return ''
        },
        (data) => data,
    )
    const objectIds = stateFactory<string[]>([])
    const powerIds = stateFactory<string[]>([])
    const enemiesIds = stateFactory<string[]>([])
    const nationalities = stateFactory<string[]>([])
    const occupations = stateFactory<string[]>([])
    const powers = stateFactory<PowerInput[]>([])
    const objects = stateFactory<ObjectInput[]>([])
    const personId = stateFactory<Optional<string>>(null)

    const addObjectcId = (id: string) => {
        if (objectIds.state.value.find((e) => e === id)) return
        objectIds.setState([...objectIds.state.value, id])
    }
    const removeObjectId = (id: string) => {
        objectIds.setState(objectIds.state.value.filter((e) => e !== id))
    }

    const addPowerId = (id: string) => {
        if (powerIds.state.value.find((e) => e === id)) return
        powerIds.setState([...powerIds.state.value, id])
    }

    const removePowerId = (id: string) => {
        powerIds.setState(powerIds.state.value.filter((e) => e !== id))
    }

    const addEnemyId = (id: string) => {
        if (enemiesIds.state.value.find((e) => e === id)) return
        enemiesIds.setState([...enemiesIds.state.value, id])
    }

    const removeEnemyId = (id: string) => {
        enemiesIds.setState(enemiesIds.state.value.filter((e) => e !== id))
    }

    const addNationality = (na: string) => {
        if (nationalities.state.value.find((e) => e === na)) return
        nationalities.setState([...nationalities.state.value, na])
    }

    const removeNationality = (na: string) => {
        nationalities.setState(
            nationalities.state.value.filter((e) => e !== na),
        )
    }

    const addOccupation = (oc: string) => {
        if (occupations.state.value.filter((e) => e === oc)) return
        occupations.setState([...occupations.state.value, oc])
    }

    const removeOccupation = (oc: string) => {
        occupations.setState(occupations.state.value.filter((e) => e !== oc))
    }

    const powerInputIsSubmitable = () =>
        powerNameInput.value.value &&
        !powerNameInput.error.value &&
        powerTypeInput.value &&
        !powerTypeInput.error.value

    const submitAddPower = () => {
        if (!powerInputIsSubmitable()) {
            toastManager.error('Invalid power')
            return
        }
        if (
            powers.state.value.find(
                (e) => e.name === powerNameInput.value.value,
            )
        ) {
            toastManager.error('power already exist')
            return
        }
        powers.setState([
            ...powers.state.value,
            {
                name: powerNameInput.value.value,
                description: powerDescriptionInput.value.value,
                type: powerTypeInput.value.value,
            },
        ])
    }

    const removePower = (po: PowerInput) => {
        powers.setState(powers.state.value.filter((e) => e.name !== po.name))
    }

    const objectInputIsSubmitable = () =>
        objectNameInput.value.value &&
        !objectNameInput.error.value &&
        objectKindInput.value.value &&
        !objectKindInput.error.value &&
        objectCreatorInput.value.value &&
        !objectCreatorInput.error.value &&
        objectMaterialInput.value.value &&
        !objectMaterialInput.error.value

    const submitAddObject = () => {
        if (!objectInputIsSubmitable()) {
            toastManager.error('Invalid object')
            return
        }
        if (
            objects.state.value.find(
                (e) => e.name === objectNameInput.value.value,
            )
        ) {
            toastManager.error('Object already exist')
            return
        }
        objects.setState([
            ...objects.state.value,
            {
                name: objectNameInput.value.value,
                description: objectDescriptionInput.value.value,
                kind: objectKindInput.value.value,
                creator: objectCreatorInput.value.value,
                material: objectMaterialInput.value.value,
            },
        ])
    }

    const removeObject = (po: ObjectInput) => {
        objects.setState(objects.state.value.filter((e) => e.name !== po.name))
    }

    const isSubmitable = () =>
        nameInput.value.value &&
        !nameInput.error.value &&
        creatorFirstNameInput.value.value &&
        !creatorLastNameNameInput.error.value &&
        (personId.state.value ||
            (personNameInput.value &&
                !personNameInput.error.value &&
                hairColorInput.value.value &&
                !hairColorInput.error.value &&
                eyesColorInput.value.value &&
                !eyesColorInput.error.value &&
                maritialStatusInput.value.value &&
                !maritialStatusInput.error.value &&
                genderStatusInput.value.value &&
                !genderStatusInput.error.value))
}
