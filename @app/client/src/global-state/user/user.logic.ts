import { OnInitJob } from '../../core/application/on-init-job/on-init-job'
import { getUserApplicationService } from '../../user/application/services/get.user'

export const userLogic = (
    onInitJob: OnInitJob,
    getUserService: ReturnType<typeof getUserApplicationService>,
) => {
    const userJob = onInitJob(() => getUserService.execute(undefined))

    const refetch = () => userJob.reload()

    return {
        user: userJob.data,
        refetch,
    }
}
