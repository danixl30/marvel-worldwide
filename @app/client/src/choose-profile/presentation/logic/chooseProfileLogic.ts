import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { SessionManager } from '../../../core/application/session/session.manager'
import { CREATE_PROFILE } from '../../../create-profile/presentation/page/page'
import { MAIN_PAGE } from '../../../main/presentation/page/route'
import { GetProfilesResponse } from '../../../profile/application/services/dto/profile.list'
import { getProfilesService } from '../../../profile/application/services/get.profiles'

export const chooseProfileLogic = (
    navigationManager: NavigationManager,
    getProfiles: ReturnType<typeof getProfilesService>,
    onIniJob: OnInitJob,
    sessionManager: SessionManager,
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

    const logout = () => {
        sessionManager.removeProfile()
        sessionManager.deleteSession()
        navigationManager.goToPopBack(MAIN_PAGE)
    }

    return {
        addProfile,
        profilesData,
        error,
        isLoading,
        logout,
    }
}
