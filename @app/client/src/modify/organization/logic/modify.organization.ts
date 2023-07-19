import { Optional } from '@mono/types-utils'
import { StateFactory } from '../../../core/application/state/state-factory'
import { InputManager } from '../../../core/application/input-manager'
import { ToastProvider } from '../../../core/application/toast/toast'
import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { OnInitJobLazy } from '../../../core/application/on-init-job/lazy/on-init-job-lazy'
import { getAllCharactersApplicationService } from '../../../create-videogame/application/get.all.characters'
import { getAllHeadquartersApplicationService } from '../../../create-organization/application/get.all.headquarters'
import { createOrganizationApplicationService } from '../../../create-organization/application/create.organization'
import { getOrganizationByIdApplicationService } from '../../../details-organization/application/get.organization.id'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { Alerts } from '../../../core/application/toast/types/alerts'
import { modifyOrganizationApplicationService } from '../application/modify.organization'
import { HOME_PAGE } from '../../../home/page/page'

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
export const modifyOrganizationLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastManager: ToastProvider,
    onInitJobFactory: OnInitJob,
    onInitJobLazy: OnInitJobLazy,
    getAllCharacters: ReturnType<typeof getAllCharactersApplicationService>,
    getAllHeadquarters: ReturnType<typeof getAllHeadquartersApplicationService>,
    modifyOrganization: ReturnType<typeof modifyOrganizationApplicationService>,
    getOrganizationService: ReturnType<
        typeof getOrganizationByIdApplicationService
    >,
    navigation: NavigationManager,
) => {
    const charactersTask = onInitJobFactory(() =>
        getAllCharacters.execute(undefined),
    )
    const headquartersJob = onInitJobFactory(() =>
        getAllHeadquarters.execute(undefined),
    )

    onInitJobFactory(async () => {
        const organization = await getOrganizationService.execute(
            navigation.getParam('id'),
        )
        nameInput.onChange(organization.name)
        firstApparitionInput.onChange(organization.firstApparition)
        objetiveInput.onChange(organization.objetive)
        sloganInput.onChange(organization.slogan)
        leader.setState(organization.leader)
        founderInput.onChange(organization.founder.id)
        headquarterCityInput.onChange(organization.headquarter.place.city)
        headquarterCountryInput.onChange(organization.headquarter.place.country)
        headquarterKindInput.onChange(organization.headquarter.kind)
        headquarterNameInput.onChange(organization.headquarter.name)
        membersBase.setState(organization.members)
    })

    const modifyOrganizationTask = onInitJobLazy(
        () =>
            modifyOrganization.execute({
                id: navigation.getParam('id'),
                name: nameInput.value.value,
                headquarterId: headquarterIdInput.value.value || undefined,
                headquarter: headquarterIdInput.value.value
                    ? undefined
                    : {
                          name: headquarterNameInput.value.value,
                          kind: headquarterKindInput.value.value,
                          place: {
                              country: headquarterCountryInput.value.value,
                              city: headquarterCityInput.value.value,
                          },
                      },
                members: members.state.value,
                membersToRemove: membersToRemove.state.value,
                firstApparition: firstApparitionInput.value.value,
                leader: leader.state.value!,
                objetive: objetiveInput.value.value,
                slogan: sloganInput.value.value,
                founder: founderInput.value.value,
                creationPlace: creationPlaceInput.value.value,
            }),
        () => {
            const pending = toastManager.pending('Creating')
            return {
                success: () => {
                    pending('Organization created!!!', Alerts.SUCCESS)
                    navigation.goTo(HOME_PAGE)
                },
                error: (_e) => {
                    pending('Error creating organization', Alerts.ERROR)
                },
            }
        },
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
            if (data.length < 6) return 'Invalid objetive'
            return ''
        },
        (data) => data,
    )
    const sloganInput = inputManagerFactory(
        '',
        (data) => {
            return ''
        },
        (data) => data,
    )
    const creationPlaceInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 5) return 'Invalid creation place'
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
            if (data.length < 6) return 'Invalid first apparition'
            return ''
        },
        (data) => data,
    )
    const headquarterNameInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid headquarter name'
            return ''
        },
        (data) => data,
    )
    const headquarterKindInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid headquarter kind'
            return ''
        },
        (data) => data,
    )
    const headquarterCountryInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid headquarter country'
            return ''
        },
        (data) => data,
    )
    const headquarterCityInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid headquarter city'
            return ''
        },
        (data) => data,
    )
    const headquarterIdInput = inputManagerFactory(
        '',
        () => {
            return ''
        },
        (data) => data,
    )
    const leader = stateFactory<Optional<CharacterSelected>>(null)
    const selectedMemberCharacter =
        stateFactory<Optional<CharacterSelected>>(null)
    const members = stateFactory<Member[]>([])
    const membersBase = stateFactory<Member[]>([])
    const membersToRemove = stateFactory<Member[]>([])
    const chargeInput = inputManagerFactory(
        '',
        (data) => {
            if (data.length < 6) return 'Invalid creator'
            return ''
        },
        (data) => data,
    )

    const removeMemberBase = (mem: Member) => {
        if (membersToRemove.state.value.find((e) => e.id === mem.id)) return
        membersToRemove.setState([...membersToRemove.state.value, mem])
    }
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

    const submit = async () => {
        if (!isSubmitable()) {
            toastManager.error('Invalid organization')
            return
        }
        await modifyOrganizationTask.do().catch((e) => console.log(e))
    }

    return {
        submit,
        isSubmitable,
        nameInput,
        creationPlaceInput,
        chargeInput,
        leader: leader.state,
        setLeader,
        setSelectedMember,
        selectedMemberCharacter: selectedMemberCharacter.state,
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
        members: members.state,
        charactersToSelect: charactersTask.data,
        isLoadingCharacters: charactersTask.isLoading,
        errorCharacters: charactersTask.error,
        headquarters: headquartersJob.data,
        isLoadingHeadquarters: headquartersJob.isLoading,
        errorHeadquarters: headquartersJob.error,
        firstApparitionInput,
        membersBase: membersBase.state,
        membersToRemove: membersToRemove.state,
        removeMemberBase,
    }
}
