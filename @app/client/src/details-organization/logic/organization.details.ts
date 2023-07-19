import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../core/application/router/router.manager'
import { CIVIL_DETAILS } from '../../details-civil/page/page'
import { HEROE_DETAILS } from '../../details-heroe/page/page'
import { VILLAIN_DETAILS } from '../../detials-villain/page/page'
import { MODIFY_ORGANIZATION } from '../../modify/organization/page/page'
import { getOrganizationByIdApplicationService } from '../application/get.organization.id'

export const getOrganizationDetailsLogic = (
    onInitJob: OnInitJob,
    getOrganizationService: ReturnType<
        typeof getOrganizationByIdApplicationService
    >,
    navigation: NavigationManager,
) => {
    const organizationJob = onInitJob(() =>
        getOrganizationService.execute(navigation.getParam('id')),
    )

    const onClickHeroe = (id: string) =>
        navigation.goTo(HEROE_DETAILS.replace(':id', id))

    const onClickCivil = (id: string) =>
        navigation.goTo(CIVIL_DETAILS.replace(':id', id))

    const onClickVillain = (id: string) =>
        navigation.goTo(VILLAIN_DETAILS.replace(':id', id))

    const onClickDetials = () =>
        navigation.goTo(
            MODIFY_ORGANIZATION.replace(
                ':id',
                organizationJob.data.value?.id || '',
            ),
        )

    return {
        data: organizationJob.data,
        error: organizationJob.error,
        isLoading: organizationJob.isLoading,
        onClickCivil,
        onClickHeroe,
        onClickVillain,
        onClickDetials,
    }
}
