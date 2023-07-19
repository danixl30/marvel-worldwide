import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../core/application/router/router.manager'
import { VILLAIN_DETAILS } from '../../detials-villain/page/page'
import { MODIFY_HEROE } from '../../modify/heroe/page/page'
import { getHeroeByIdApplicationService } from '../application/get.heroe.id'

export const getHeroeDetailsLogic = (
    onInitJob: OnInitJob,
    getHeroeService: ReturnType<typeof getHeroeByIdApplicationService>,
    navigation: NavigationManager,
) => {
    const heroeJob = onInitJob(() =>
        getHeroeService.execute(navigation.getParam('id')),
    )

    const onClickVillain = (id: string) =>
        navigation.goTo(VILLAIN_DETAILS.replace(':id', id))

    const onClickDetials = () =>
        navigation.goTo(
            MODIFY_HEROE.replace(':id', heroeJob.data.value?.id || ''),
        )

    return {
        data: heroeJob.data,
        error: heroeJob.error,
        isLoading: heroeJob.isLoading,
        onClickVillain,
        onClickDetials,
    }
}
