import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../core/application/router/router.manager'
import { HEROE_DETAILS } from '../../details-heroe/page/page'
import { VILLAIN_DETAILS } from '../../detials-villain/page/page'
import { MODIFY_CIVIL } from '../../modify/civil/page/page'
import { getCivilByIdApplicationService } from '../application/get.civil.id'

export const getCivilDetailsLogic = (
    onInitJob: OnInitJob,
    getCivilService: ReturnType<typeof getCivilByIdApplicationService>,
    navigation: NavigationManager,
) => {
    const civilJob = onInitJob(() =>
        getCivilService.execute(navigation.getParam('id')),
    )

    const onClickHeroe = (id: string) =>
        navigation.goTo(HEROE_DETAILS.replace(':id', id))

    const onClickVillain = (id: string) =>
        navigation.goTo(VILLAIN_DETAILS.replace(':id', id))

    const onClickDetials = () =>
        navigation.goTo(
            MODIFY_CIVIL.replace(':id', civilJob.data.value?.id || ''),
        )

    return {
        data: civilJob.data,
        error: civilJob.error,
        isLoading: civilJob.isLoading,
        onClickHeroe,
        onClickVillain,
        onClickDetials,
    }
}
