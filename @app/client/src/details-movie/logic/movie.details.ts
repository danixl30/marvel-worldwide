import { InputManager } from '../../core/application/input-manager'
import { OnInitJobLazy } from '../../core/application/on-init-job/lazy/on-init-job-lazy'
import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { OnInit } from '../../core/application/on-init/on-init'
import { NavigationManager } from '../../core/application/router/router.manager'
import { SessionManager } from '../../core/application/session/session.manager'
import { ToastProvider } from '../../core/application/toast/toast'
import { Alerts } from '../../core/application/toast/types/alerts'
import { CIVIL_DETAILS } from '../../details-civil/page/page'
import { HEROE_DETAILS } from '../../details-heroe/page/page'
import { ORGANIZATION_DETAILS } from '../../details-organization/page/page'
import { endHistoryApplicationService } from '../../details-videogame/application/end.history'
import { VILLAIN_DETAILS } from '../../detials-villain/page/page'
import { MODIFY_MOVIE } from '../../modify/movie/page/page'
import { getMovieByIdApplicationService } from '../application/get.movie.id'
import { rateMovieApplicationService } from '../application/rate.movie'

export const getMovieDetailsLogic = (
    onInitJob: OnInitJob,
    onInitLazy: OnInitJobLazy,
    onInit: OnInit,
    inputManager: InputManager,
    getMovieService: ReturnType<typeof getMovieByIdApplicationService>,
    sessionManager: SessionManager,
    rateService: ReturnType<typeof rateMovieApplicationService>,
    endHistoryService: ReturnType<typeof endHistoryApplicationService>,
    navigation: NavigationManager,
    toastManager: ToastProvider,
) => {
    const rateInput = inputManager(
        '1',
        (data) => {
            if (Number(data) < 1 && Number(data) > 5) return 'Invalid rate'
            return ''
        },
        (data) => data.trim(),
    )

    const movieJob = onInitJob(async () => {
        const data = await getMovieService.execute(navigation.getParam('id'))
        const ownRate = data.rates.find(
            (e) => e.id === sessionManager.getProfile(),
        )
        if (!ownRate) return data
        rateInput.onChange(String(ownRate.calification))
        data.rates = data.rates.filter(
            (e) => e.id !== sessionManager.getProfile(),
        )
        return data
    })

    const endHistoryJob = onInitLazy(() =>
        endHistoryService.execute(movieJob.data.value?.history || ''),
    )

    onInit(() => () => endHistoryJob.do())

    const onClickDetials = () =>
        navigation.goTo(
            MODIFY_MOVIE.replace(':id', movieJob.data.value?.id || ''),
        )

    const rateJob = onInitLazy(
        () =>
            rateService.execute({
                target: movieJob.data.value?.id || '',
                calification: Number(rateInput.value.value),
            }),
        () => {
            const pending = toastManager.pending('Procesing')
            return {
                success: () => {
                    pending('Rate Added successfully!!!', Alerts.SUCCESS)
                    movieJob.silentReload()
                },
                error: () => {
                    pending('Error in rate', Alerts.ERROR)
                },
            }
        },
    )

    const submitRate = async () => {
        if (rateInput.error.value) {
            toastManager.error('Invalid rate')
            return
        }
        await rateJob.do().catch((e) => console.log(e))
    }

    const onClickHeroe = (id: string) =>
        navigation.goTo(HEROE_DETAILS.replace(':id', id))

    const onClickCivil = (id: string) =>
        navigation.goTo(CIVIL_DETAILS.replace(':id', id))

    const onClickVillain = (id: string) =>
        navigation.goTo(VILLAIN_DETAILS.replace(':id', id))

    const onClickOrganization = (id: string) =>
        navigation.goTo(ORGANIZATION_DETAILS.replace(':id', id))

    return {
        data: movieJob.data,
        error: movieJob.error,
        isLoading: movieJob.isLoading,
        rateInput,
        submitRate,
        onClickCivil,
        onClickHeroe,
        onClickVillain,
        onClickOrganization,
        onClickDetials,
    }
}
