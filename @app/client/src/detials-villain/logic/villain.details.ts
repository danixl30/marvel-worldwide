import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../core/application/router/router.manager'
import { HEROE_DETAILS } from '../../details-heroe/page/page'
import { MODIFY_VILLAIN } from '../../modify/villain/page/page'
import { getVillainByIdApplicationService } from '../application/get.villain.id'

export const getVillainDetailsLogic = (
    onInitJob: OnInitJob,
    getVillainService: ReturnType<typeof getVillainByIdApplicationService>,
    navigation: NavigationManager,
) => {
    const villainJob = onInitJob(() =>
        getVillainService.execute(navigation.getParam('id')),
    )

    const onClickHeroe = (id: string) =>
        navigation.goTo(HEROE_DETAILS.replace(':id', id))

    const onClickDetials = () =>
        navigation.goTo(
            MODIFY_VILLAIN.replace(':id', villainJob.data.value?.id || ''),
        )

    return {
        data: villainJob.data,
        error: villainJob.error,
        isLoading: villainJob.isLoading,
        onClickHeroe,
        onClickDetials,
    }
}
