import { Optional } from '@mono/types-utils'
import { InputManager } from '../../core/application/input-manager'
import { StateFactory } from '../../core/application/state/state-factory'
import { ToastProvider } from '../../core/application/toast/toast'

type Characters = {
    id: string
    kind: string
    name: string
}
type CharacterSelected = {
    id: string
    kind: string
}
type Member = {
    id: string
    kind: string
    charge: string
}
export const createOrganizationLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
) => {
    const nameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid title'
            return ''
        },
        (data) => data,
    )
    const objetiveInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid synopsis'
            return ''
        },
        (data) => data,
    )
    const sloganInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const creationPlaceInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const founderInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const firstApparitionInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const headquarterNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const headquarterKindInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const headquarterCountryInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const headquarterCityInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const headquarterIdInput = inputManagerFactory(
        '',
        (data) => {
            return ''
        },
        (data) => data,
    )
    const leader = stateFactory<Optional<CharacterSelected>>(null)
    const selectedMemberCharacter =
        stateFactory<Optional<CharacterSelected>>(null)
    const members = stateFactory<Member[]>([])
    const chargeInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const setLeader = (le: CharacterSelected) => {
        leader.setState(le)
    }
    const setSelectedMember = (cha: CharacterSelected) => {
        selectedMemberCharacter.setState(cha)
    }
    const addMemberIsSubmitable = () =>
        selectedMemberCharacter.state.value &&
        chargeInput.value.value &&
        !chargeInput.error.value

    const addMember = () => {
        if (!addMemberIsSubmitable()) {
            toastManager.error('Invalid member')
            return
        }
        if (
            members.state.value.find(
                (e) =>
                    e.id === selectedMemberCharacter.state.value?.id &&
                    e.kind === selectedMemberCharacter.state.value.kind,
            )
        ) {
            return
        }
        members.setState([
            ...members.state.value,
            {
                id: selectedMemberCharacter.state.value!.id,
                kind: selectedMemberCharacter.state.value!.kind,
                charge: chargeInput.value.value,
            },
        ])
    }

    const removeMember = (mem: Member) => {
        members.setState(
            members.state.value.filter(
                (e) => e.id !== mem.id && e.kind !== mem.kind,
            ),
        )
    }

    const isSubmitable = () =>
        nameInput.value &&
        !nameInput.error.value &&
        leader.state.value &&
        founderInput.value.value &&
        creationPlaceInput.value.value &&
        !creationPlaceInput.error.value &&
        firstApparitionInput.value.value &&
        !firstApparitionInput.error.value &&
        (headquarterIdInput.value.value ||
            (headquarterNameInput.value &&
                !headquarterNameInput.error.value &&
                headquarterKindInput.value.value &&
                !headquarterKindInput.error.value &&
                headquarterCountryInput.value.value &&
                !headquarterCountryInput.error.value &&
                headquarterCityInput.value.value &&
                !headquarterCityInput.error.value))
}
