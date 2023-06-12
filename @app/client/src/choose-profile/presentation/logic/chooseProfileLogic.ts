import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { CREATE_PROFILE } from '../../../create-profile/presentation/page/page'
import { GetProfilesResponse } from '../../../profile/application/services/dto/profile.list'
import { getProfilesService } from '../../../profile/application/services/get.profiles'

export const chooseProfileLogic = (
    navigationManager: NavigationManager,
    getProfiles: ReturnType<typeof getProfilesService>,
    onIniJob: OnInitJob,
) => {
    const {
        data: profilesData,
        error,
        isLoading,
    } = onIniJob<GetProfilesResponse, unknown>(() =>
        getProfiles.execute(undefined),
    )

    const addProfile = () => {
        if (profilesData.value && profilesData.value.length > 5) return
        navigationManager.goTo(CREATE_PROFILE)
    }

    return {
        addProfile,
        profilesData,
        error,
        isLoading,
    }
}
