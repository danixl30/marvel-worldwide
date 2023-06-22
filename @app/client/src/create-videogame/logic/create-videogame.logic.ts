import { Optional } from '@mono/types-utils'
import { InputManager } from '../../core/application/input-manager'
import { StateFactory } from '../../core/application/state/state-factory'
import { ToastProvider } from '../../core/application/toast/toast'

export const videogameTypes = [
    'action',
    'adventure',
    'arcade',
    'fighter',
    'sports',
    'strategy',
    'card-collection',
    'role-playing',
    'tabletop',
    'platformer',
    'other',
]
type OrgPart = {
    id: string
    participationType: string
}
type Actor = {
    name: {
        firstName: string
        lastName: string
    }
    role: string
    character: {
        id: string
        kind: string
    }
}
export const actorRoles = ['protagonist', 'antagonist', 'secondary']
type Characters = {
    id: string
    kind: string
    name: string
}
export const createVideogameLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
) => {
    const titleInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid title'
            return ''
        },
        (data) => data,
    )
    const synopsisInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid synopsis'
            return ''
        },
        (data) => data,
    )
    const creatorInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const typeInput = inputManagerFactory(
        '',
        (data) => {
            if (!videogameTypes.find((e) => e === data)) return 'Invalid type'
            return ''
        },
        (data) => data,
    )
    const comicInput = inputManagerFactory(
        '',
        (data) => {
            if (!videogameTypes.find((e) => e === data)) return 'Invalid type'
            return ''
        },
        (data) => data,
    )
    const actorFirstNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid actor name'
            return ''
        },
        (data) => data,
    )
    const actorLastNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid actor lastName'
            return ''
        },
        (data) => data,
    )
    const actorRoleInput = inputManagerFactory(
        '',
        (data) => {
            if (!actorRoles.find((e) => e === data)) return 'Invalid role'
            return ''
        },
        (data) => data,
    )
    const releaseState = stateFactory<Optional<Date>>(null)
    const organizations = stateFactory<OrgPart[]>([])
    const actors = stateFactory<Actor[]>([])
    const platforms = stateFactory<string[]>([])
    const character = stateFactory<
        Optional<{
            id: string
            kind: string
        }>
    >(null)
    const onChangeRelease = (date: Date) => {
        releaseState.setState(date)
    }
    const addOrganization = (data: OrgPart) => {
        if (organizations.state.value.find((e) => e.id === data.id)) return
        organizations.setState([...organizations.state.value, data])
    }
    const removeOrganization = (data: OrgPart) => {
        organizations.setState(
            organizations.state.value.filter((e) => e.id !== data.id),
        )
    }
    const addActor = (actor: Actor) => {
        if (
            actors.state.value.find(
                (e) =>
                    e.name.firstName === actor.name.firstName &&
                    actor.name.lastName === e.name.lastName,
            )
        )
            return
        actors.setState([...actors.state.value, actor])
    }
    const removeActor = (actor: Actor) => {
        actors.setState(
            actors.state.value.filter(
                (e) =>
                    e.name.firstName !== actor.name.firstName &&
                    actor.name.lastName !== e.name.lastName,
            ),
        )
    }
    const addPlatform = (platform: string) => {
        if (platforms.state.value.find((e) => e === platform)) return
        platforms.setState([...platforms.state.value, platform])
    }

    const removePlatform = (platform: string) => {
        platforms.setState(platforms.state.value.filter((e) => e !== platform))
    }
    const setCharacter = (cha: { id: string; kind: string }) => {
        character.setState(cha)
    }

    const actorAddSubmitable = () =>
        actorRoleInput.value.value &&
        !actorRoleInput.error.value &&
        actorFirstNameInput.value.value &&
        !actorFirstNameInput.error.value &&
        actorLastNameInput.value.value &&
        !actorLastNameInput.error.value &&
        character.state.value

    const submitAddActor = () => {
        if (!actorAddSubmitable()) {
            toastManager.error('Invalid actor')
            return
        }
        addActor({
            name: {
                firstName: actorFirstNameInput.value.value,
                lastName: actorLastNameInput.value.value,
            },
            role: actorRoleInput.value.value,
            character: character.state.value!,
        })
    }
    const isSubmitable = () =>
        titleInput.value.value &&
        !titleInput.error.value &&
        typeInput.value.value &&
        !typeInput.error.value &&
        synopsisInput.value.value &&
        !synopsisInput.value.value &&
        creatorInput.value.value &&
        !creatorInput.error.value &&
        releaseState.state.value &&
        comicInput.value.value &&
        !comicInput.error.value
}
