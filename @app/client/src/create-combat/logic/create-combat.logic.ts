import { Optional } from '@mono/types-utils'
import { InputManager } from '../../core/application/input-manager'
import { StateFactory } from '../../core/application/state/state-factory'
import { ToastProvider } from '../../core/application/toast/toast'
import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { OnInitJobLazy } from '../../core/application/on-init-job/lazy/on-init-job-lazy'
import { getAllHeroesVillainsApplicationService } from '../../create-videogame/application/get.all.heroes.villains'
import { createCombatApplicationService } from '../application/create.combat'
import { Alerts } from '../../core/application/toast/types/alerts'
import { getAllObjectsApplicationService } from '../../create-heroe/application/get.all.objects'
import { getAllPowersApplicationService } from '../../create-heroe/application/get.all.powers'

type Charater = {
    id: string
    kind: string
    powers: string[]
    objects: string[]
}

type CharcterSelected = {
    id: string
    kind: string
}

export const createCombatLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
    onInitJobFactory: OnInitJob,
    onInitJobLazy: OnInitJobLazy,
    getAllHeroesVillainsServige: ReturnType<
        typeof getAllHeroesVillainsApplicationService
    >,
    getAllObjectsService: ReturnType<typeof getAllObjectsApplicationService>,
    getAllPowersService: ReturnType<typeof getAllPowersApplicationService>,
    createCombatService: ReturnType<typeof createCombatApplicationService>,
) => {
    const charactesTask = onInitJobFactory(() =>
        getAllHeroesVillainsServige.execute(undefined),
    )

    const powersJob = onInitJobFactory(() =>
        getAllPowersService.execute(undefined),
    )
    const objectsJob = onInitJobFactory(() =>
        getAllObjectsService.execute(undefined),
    )

    const createCombatTask = onInitJobLazy(
        () =>
            createCombatService.execute({
                place: placeNameInput.value.value,
                date: dateState.state.value!,
                characters: characters.state.value,
            }),
        () => {
            const pending = toastManager.pending('Creating')
            return {
                success: () => {
                    pending('Combat created!!!', Alerts.SUCCESS)
                },
                error: (_e) => {
                    pending('Error creating combat', Alerts.ERROR)
                },
            }
        },
    )
    const placeNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid person name'
            return ''
        },
        (data) => data,
    )
    const objectIds = stateFactory<string[]>([])
    const powerIds = stateFactory<string[]>([])
    const characters = stateFactory<Charater[]>([])
    const characterSelected = stateFactory<Optional<CharcterSelected>>(null)
    const dateState = stateFactory<Optional<Date>>(null)

    const onChangeDate = (date: Date) => {
        dateState.setState(date)
    }

    const selectCharacter = (cha: CharcterSelected) => {
        characterSelected.setState(cha)
    }

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

    const addCharacterIsSubmitable = () =>
        Boolean(characterSelected.state.value)

    const addCharacter = () => {
        if (!addCharacterIsSubmitable) {
            toastManager.error('Invalid character')
            return
        }
        if (
            characters.state.value.find(
                (e) => e.id === characterSelected.state.value?.id,
            )
        ) {
            toastManager.error('Character already exist')
            return
        }
        characters.setState([
            ...characters.state.value,
            {
                id: characterSelected.state.value!.id,
                kind: characterSelected.state.value!.kind,
                powers: powerIds.state.value,
                objects: objectIds.state.value,
            },
        ])
    }

    const removeCharacter = (cha: Charater) => {
        characters.setState(
            characters.state.value.filter(
                (e) => e.id !== cha.id && cha.kind !== cha.kind,
            ),
        )
    }

    const isSubmitable = () =>
        placeNameInput.value.value &&
        !placeNameInput.error.value &&
        dateState.state.value

    const submit = async () => {
        if (!isSubmitable()) {
            toastManager.error('Invalid combat')
            return
        }
        await createCombatTask.do().catch((e) => console.log(e))
    }

    return {
        submit,
        isSubmitable,
        addPowerId,
        addCharacter,
        addObjectcId,
        addCharacterIsSubmitable,
        date: dateState.state,
        character: characterSelected.state,
        removeCharacter,
        removePowerId,
        removeObjectId,
        selectCharacter,
        onChangeDate,
        placeNameInput,
        characters: characters.state,
        charactersToSelect: charactesTask.data,
        isLoadingCharacters: charactesTask.isLoading,
        errorCharacters: charactesTask.error,
        powersSelect: powersJob.data,
        isLoadingPowers: powersJob.isLoading,
        errorPowers: powersJob.error,
        objectsSelect: objectsJob.data,
        isLoadingObjects: objectsJob.isLoading,
        errorObjects: objectsJob.error,
        objectIds: objectIds.state,
        powerIds: powerIds.state,
    }
}
