import { Optional } from '@mono/types-utils'
import { InputManager } from '../../core/application/input-manager'
import { StateFactory } from '../../core/application/state/state-factory'
import { ToastProvider } from '../../core/application/toast/toast'
import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { OnInitJobLazy } from '../../core/application/on-init-job/lazy/on-init-job-lazy'
import { Alerts } from '../../core/application/toast/types/alerts'
import { getAllCharactersApplicationService } from '../../create-videogame/application/get.all.characters'
import { getAllOrganizationsApplicationService } from '../../create-videogame/application/get.all.organizations'
import { createSerieApplicationService } from '../application/create.serie'

export const serieTypes = [
    '2D animation',
    '3D animation',
    'live-action',
    'stop-motion',
    'hybrid',
    'children',
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
export const createSerieLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
    onInitJobFactory: OnInitJob,
    onInitJobLazy: OnInitJobLazy,
    getAllCharacters: ReturnType<typeof getAllCharactersApplicationService>,
    getAllOrganizations: ReturnType<
        typeof getAllOrganizationsApplicationService
    >,
    createSerie: ReturnType<typeof createSerieApplicationService>,
) => {
    const charactersTask = onInitJobFactory(() =>
        getAllCharacters.execute(undefined),
    )
    const organizationsTask = onInitJobFactory(() =>
        getAllOrganizations.execute(undefined),
    )

    const createSerieTask = onInitJobLazy(
        () =>
            createSerie.execute({
                title: titleInput.value.value,
                synopsis: synopsisInput.value.value,
                release: releaseState.state.value!,
                creator: creatorInput.value.value,
                type: typeInput.value.value,
                actors: actors.state.value,
                comic: comicInput.value.value,
                organizations: organizations.state.value,
                episodes: Number(episodesInput.value.value),
                channel: channelInput.value.value,
            }),
        () => {
            const pending = toastManager.pending('Creating')
            return {
                success: () => {
                    pending('Serie created!!!', Alerts.SUCCESS)
                },
                error: (_e) => {
                    pending('Error creating serie', Alerts.ERROR)
                },
            }
        },
    )

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
    const channelInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )
    const episodesInput = inputManagerFactory(
        '',
        () => {
            return ''
        },
        (data) => data,
    )
    const typeInput = inputManagerFactory(
        '',
        (data) => {
            if (!serieTypes.find((e) => e === data)) return 'Invalid type'
            return ''
        },
        (data) => data,
    )
    const comicInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid comic'
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
        channelInput.value.value &&
        !channelInput.error.value &&
        typeInput.value.value &&
        !typeInput.error.value &&
        synopsisInput.value.value &&
        !synopsisInput.error.value &&
        creatorInput.value.value &&
        !creatorInput.error.value &&
        releaseState.state.value &&
        comicInput.value.value &&
        !comicInput.error.value

    const submit = async () => {
        if (!isSubmitable()) {
            toastManager.error('Invalid videogame')
            return
        }
        await createSerieTask.do().catch((e) => console.log(e))
    }

    return {
        comicInput,
        release: releaseState.state,
        creatorInput,
        onChangeRelease,
        submit,
        isSubmitable,
        addOrganization,
        organizations: organizations.state,
        titleInput,
        synopsisInput,
        actors: actors.state,
        addActor,
        removeActor,
        typeInput,
        submitAddActor,
        removeOrganization,
        setCharacter,
        character: character.state,
        actorRoleInput,
        actorLastNameInput,
        actorFirstNameInput,
        characters: charactersTask.data,
        isLoadingCharacters: charactersTask.isLoading,
        errorCharacters: charactersTask.error,
        organizationsOptions: organizationsTask.data,
        isLoadingOrgs: organizationsTask.isLoading,
        errorOrganizations: organizationsTask.error,
        actorAddSubmitable,
        channelInput,
        episodesInput,
    }
}
