import { Optional } from '@mono/types-utils'
import { InputManager } from '../../core/application/input-manager'
import { StateFactory } from '../../core/application/state/state-factory'
import { ToastProvider } from '../../core/application/toast/toast'

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
) => {
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
}
