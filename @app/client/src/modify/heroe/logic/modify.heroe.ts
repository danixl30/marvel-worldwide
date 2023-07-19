import { Optional } from '@mono/types-utils'
import { StateFactory } from '../../../core/application/state/state-factory'
import { InputManager } from '../../../core/application/input-manager'
import { ToastProvider } from '../../../core/application/toast/toast'
import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { OnInitJobLazy } from '../../../core/application/on-init-job/lazy/on-init-job-lazy'
import { getAllVillainsApplicationService } from '../../../create-heroe/application/get.all.villains'
import { getAllObjectsApplicationService } from '../../../create-heroe/application/get.all.objects'
import { getAllPowersApplicationService } from '../../../create-heroe/application/get.all.powers'
import { createHeroeApplicationService } from '../../../create-heroe/application/create.heroe'
import { getHeroeByIdApplicationService } from '../../../details-heroe/application/get.heroe.id'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { Alerts } from '../../../core/application/toast/types/alerts'
import { modifyHeroeApplicationService } from '../application/modify.heroe'
import { HOME_PAGE } from '../../../home/page/page'

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

export const modifyHeroeLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
    onInitJobFactory: OnInitJob,
    onInitJobLazy: OnInitJobLazy,
    getVillainsService: ReturnType<typeof getAllVillainsApplicationService>,
    getAllObjectsService: ReturnType<typeof getAllObjectsApplicationService>,
    getAllPowersService: ReturnType<typeof getAllPowersApplicationService>,
    modifyHeroeService: ReturnType<typeof modifyHeroeApplicationService>,
    getHeroeService: ReturnType<typeof getHeroeByIdApplicationService>,
    navigation: NavigationManager,
) => {
    const villainsJob = onInitJobFactory(() =>
        getVillainsService.execute(undefined),
    )
    const powersJob = onInitJobFactory(() =>
        getAllPowersService.execute(undefined),
    )
    const objectsJob = onInitJobFactory(() =>
        getAllObjectsService.execute(undefined),
    )

    onInitJobFactory(async () => {
        const heroe = await getHeroeService.execute(navigation.getParam('id'))
        personNameInput.onChange(heroe.person.name)
        phrseInput.onChange(heroe.person.phrase)
        maritialStatusInput.onChange(heroe.person.maritialStatus)
        genderStatusInput.onChange(heroe.person.gender)
        eyesColorInput.onChange(heroe.person.eyesColor)
        hairColorInput.onChange(heroe.person.hairColor)
        nameInput.onChange(heroe.name)
        creatorFirstNameInput.onChange(heroe.creator.firstName)
        creatorLastNameNameInput.onChange(heroe.creator.lastName)
        archEnemyInput.onChange(heroe.archEnemy.id)
        objectsBase.setState(heroe.objects.map((e) => e.id))
        powersBase.setState(heroe.powers.map((e) => e.id))
    })

    const modifyHeroeTask = onInitJobLazy(
        () =>
            modifyHeroeService.execute({
                id: navigation.getParam('id'),
                name: nameInput.value.value,
                personId: personId.state.value || undefined,
                person: personId.state.value
                    ? undefined
                    : {
                          name: personNameInput.value.value,
                          nationalities: nationalities.state.value,
                          occupations: occupations.state.value,
                          hairColor: hairColorInput.value.value,
                          eyesColor: eyesColorInput.value.value,
                          gender: genderStatusInput.value.value,
                          maritialStatus: maritialStatusInput.value.value,
                          lastName: 'lastName',
                          phrase: phrseInput.value.value,
                      },
                objectsIdToAdd: objectIds.state.value,
                powersIdToAdd: powerIds.state.value,
                powersIdToRemove: powersToRemove.state.value,
                objectsIdToRemove: objectsToRemove.state.value,
                powers: powers.state.value,
                objects: objects.state.value,
                logo: 'logo',
                phrase: phrseInput.value.value,
                creator: {
                    firstName: creatorFirstNameInput.value.value,
                    lastName: creatorLastNameNameInput.value.value,
                },
                colors: colors.state.value,
                archEnemy: archEnemyInput.value.value,
            }),
        () => {
            const pending = toastManager.pending('Creating')
            return {
                success: () => {
                    pending('Heroe created!!!', Alerts.SUCCESS)
                    navigation.goTo(HOME_PAGE)
                },
                error: (_e) => {
                    pending('Error creating heroe', Alerts.ERROR)
                },
            }
        },
    )

    const personNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 3) return 'Invalid person name'
            return ''
        },
        (data) => data,
    )
    const phrseInput = inputManagerFactory(
        '',
        () => {
            return ''
        },
        (data) => data,
    )
    const hairColorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 3) return 'Invalid color'
            return ''
        },
        (data) => data,
    )
    const nationalityInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid nationality'
            return ''
        },
        (data) => data,
    )
    const occupationInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid occupation'
            return ''
        },
        (data) => data,
    )
    const eyesColorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 3) return 'Invalid color'
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
            if (!genders.find((e) => e === data)) return 'Invalid gender'
            return ''
        },
        (data) => data,
    )
    const nameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 3) return 'Invalid name'
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
            if (data.length < 6) return 'Invalid last name'
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
            if (data.length < 6) return 'Invalid description'
            return ''
        },
        (data) => data,
    )
    const objectKindInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid kind'
            return ''
        },
        (data) => data,
    )
    const objectCreatorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const objectMaterialInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid material'
            return ''
        },
        (data) => data,
    )
    const colorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 3) return 'Invalid color'
            return ''
        },
        (data) => data,
    )
    const archEnemyInput = inputManagerFactory(
        '',
        () => {
            return ''
        },
        (data) => data,
    )
    const objectIds = stateFactory<string[]>([])
    const powerIds = stateFactory<string[]>([])
    const nationalities = stateFactory<string[]>([])
    const occupations = stateFactory<string[]>([])
    const powers = stateFactory<PowerInput[]>([])
    const objects = stateFactory<ObjectInput[]>([])
    const personId = stateFactory<Optional<string>>(null)
    const powersBase = stateFactory<string[]>([])
    const objectsBase = stateFactory<string[]>([])
    const powersToRemove = stateFactory<string[]>([])
    const objectsToRemove = stateFactory<string[]>([])
    const colors = stateFactory<string[]>([])

    const removePowerBase = (id: string) => {
        powersBase.setState(powersBase.state.value.filter((e) => e !== id))
        powersToRemove.setState([...powersToRemove.state.value, id])
    }

    const removeObjectBase = (id: string) => {
        objectsBase.setState(objectsBase.state.value.filter((e) => e !== id))
        objectsToRemove.setState([...objectsToRemove.state.value, id])
    }

    const addObjectcId = (id: string) => {
        if (objectIds.state.value.find((e) => e === id)) return
        objectIds.setState([...objectIds.state.value, id])
    }
    const removeObjectId = (id: string) => {
        objectIds.setState(objectIds.state.value.filter((e) => e !== id))
    }

    const addColor = () => {
        if (colors.state.value.find((e) => e === colorInput.value.value)) {
            toastManager.error('Color already exist')
            return
        }
        colors.setState([...colors.state.value, colorInput.value.value])
    }

    const removeColor = (color: string) => {
        colors.setState(colors.state.value.filter((e) => e !== color))
    }

    const addPowerId = (id: string) => {
        if (powerIds.state.value.find((e) => e === id)) return
        powerIds.setState([...powerIds.state.value, id])
    }

    const removePowerId = (id: string) => {
        powerIds.setState(powerIds.state.value.filter((e) => e !== id))
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
        if (occupations.state.value.find((e) => e === oc)) return
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
        archEnemyInput.value.value &&
        !archEnemyInput.error.value &&
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

    const submit = async () => {
        if (!isSubmitable()) {
            toastManager.error('Invalid villain')
            return
        }
        await modifyHeroeTask.do().catch((e) => console.log(e))
    }

    return {
        submit,
        isSubmitable,
        personId: personId.state,
        personNameInput,
        nameInput,
        objects: objects.state,
        powers: powers.state,
        powerIds: powerIds.state,
        powerNameInput,
        powerTypeInput,
        powerDescriptionInput,
        powerInputIsSubmitable,
        objectIds: objectIds.state,
        objectKindInput,
        objectNameInput,
        objectCreatorInput,
        objectMaterialInput,
        objectDescriptionInput,
        objectInputIsSubmitable,
        addPowerId,
        addObjectcId,
        addOccupation,
        addNationality,
        occupations: occupations.state,
        nationalities: nationalities.state,
        submitAddPower,
        submitAddObject,
        removeObject,
        removePower,
        removePowerId,
        removeObjectId,
        removeOccupation,
        removeNationality,
        villains: villainsJob.data,
        isLoadingVillains: villainsJob.isLoading,
        errorVillains: villainsJob.error,
        powersSelect: powersJob.data,
        isLoadingPowers: powersJob.isLoading,
        errorPowers: powersJob.error,
        objectsSelect: objectsJob.data,
        isLoadingObjects: objectsJob.isLoading,
        errorObjects: objectsJob.error,
        creatorFirstNameInput,
        creatorLastNameNameInput,
        hairColorInput,
        eyesColorInput,
        nationalityInput,
        occupationInput,
        genderStatusInput,
        maritialStatusInput,
        phrseInput,
        enemyInput: archEnemyInput,
        colors: colors.state,
        colorInput,
        addColor,
        removeColor,
        objectsBase: objectsBase.state,
        powersBase: powersBase.state,
        objectsToRemove: objectsToRemove.state,
        powersToRemove: powersToRemove.state,
        removePowerBase,
        removeObjectBase,
    }
}
