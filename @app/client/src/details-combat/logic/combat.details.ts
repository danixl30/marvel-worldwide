import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../core/application/router/router.manager'
import { HEROE_DETAILS } from '../../details-heroe/page/page'
import { VILLAIN_DETAILS } from '../../detials-villain/page/page'
import { MODIFY_COMBAT } from '../../modify/combat/page/page'
import { getCombatByIdApplicationService } from '../application/get.combat.id'

export const getCombatDetailsLogic = (
    onInitJob: OnInitJob,
    getCombatService: ReturnType<typeof getCombatByIdApplicationService>,
    navigation: NavigationManager,
) => {
    const combatJob = onInitJob(() =>
        getCombatService.execute(navigation.getParam('id')),
    )

    const onClickHeroe = (id: string) =>
        navigation.goTo(HEROE_DETAILS.replace(':id', id))

    const onClickVillain = (id: string) =>
        navigation.goTo(VILLAIN_DETAILS.replace(':id', id))

    const onClickDetials = () =>
        navigation.goTo(
            MODIFY_COMBAT.replace(':id', combatJob.data.value?.id || ''),
        )

    return {
        data: combatJob.data,
        error: combatJob.error,
        isLoading: combatJob.isLoading,
        onClickHeroe,
        onClickVillain,
        onClickDetials,
    }
}
