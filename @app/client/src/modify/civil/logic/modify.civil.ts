import { Optional } from '@mono/types-utils'
import { StateFactory } from '../../../core/application/state/state-factory'
import { InputManager } from '../../../core/application/input-manager'
import { ToastProvider } from '../../../core/application/toast/toast'
import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { OnInitJobLazy } from '../../../core/application/on-init-job/lazy/on-init-job-lazy'
import { getAllHeroesVillainsApplicationService } from '../../../create-videogame/application/get.all.heroes.villains'
import { createCivilApplicationService } from '../../../create-civil/application/create.civil'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { getCivilByIdApplicationService } from '../../../details-civil/application/get.civil.id'
import { Alerts } from '../../../core/application/toast/types/alerts'
import { modifyCivilApplicationService } from '../application/modify.civil'
import { HOME_PAGE } from '../../../home/page/page'

export const maritialStatuses = ['S', 'M', 'W', 'D']

export const genders = ['M', 'F', 'U', 'O']

export const modifyCivilLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
    onInitJobFactory: OnInitJob,
    onInitJobLazy: OnInitJobLazy,
    getHeroesVillainsService: ReturnType<
        typeof getAllHeroesVillainsApplicationService
    >,
    modifyCivilService: ReturnType<typeof modifyCivilApplicationService>,
    getCivilService: ReturnType<typeof getCivilByIdApplicationService>,
    navigation: NavigationManager,
) => {
    const charactersTask = onInitJobFactory(() =>
        getHeroesVillainsService.execute(undefined),
    )

    onInitJobFactory(async () => {
        const civil = await getCivilService.execute(navigation.getParam('id'))
        character.setState({
            id: civil.relation.target,
            kind: civil.relation.kind,
        })
        personNameInput.onChange(civil.person.name)
        phrseInput.onChange(civil.person.phrase)
        maritialStatusInput.onChange(civil.person.maritialStatus)
        genderStatusInput.onChange(civil.person.gender)
        eyesColorInput.onChange(civil.person.eyesColor)
        hairColorInput.onChange(civil.person.hairColor)
    })

    const modifyCivilTask = onInitJobLazy(
        () =>
            modifyCivilService.execute({
                id: navigation.getParam('id'),
                personId: personId.state.value || undefined,
                relation: {
                    target: character.state.value?.id || '',
                    kind: character.state.value?.kind || '',
                },
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
            }),
        () => {
            const pending = toastManager.pending('Creating')
            return {
                success: () => {
                    pending('Civil created!!!', Alerts.SUCCESS)
                    navigation.goTo(HOME_PAGE)
                },
                error: (_e) => {
                    pending('Error creating civil', Alerts.ERROR)
                },
            }
        },
    )

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
            if (data.length < 5) return 'Invalid occupation'
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
    const nationalities = stateFactory<string[]>([])
    const occupations = stateFactory<string[]>([])
    const personId = stateFactory<Optional<string>>(null)
    const character = stateFactory<
        Optional<{
            id: string
            kind: string
        }>
    >(null)

    const setCharacter = (cha: { id: string; kind: string }) => {
        character.setState(cha)
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

    const isSubmitable = () =>
        character.state.value &&
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
        await modifyCivilTask.do().catch((e) => console.log(e))
    }

    return {
        submit,
        isSubmitable,
        personId: personId.state,
        personNameInput,
        addOccupation,
        addNationality,
        occupations: occupations.state,
        nationalities: nationalities.state,
        removeOccupation,
        removeNationality,
        hairColorInput,
        eyesColorInput,
        nationalityInput,
        occupationInput,
        genderStatusInput,
        maritialStatusInput,
        phrseInput,
        character: character.state,
        setCharacter,
        characters: charactersTask.data,
        isLoadingCharacters: charactersTask.isLoading,
        errorCharacters: charactersTask.error,
    }
}
