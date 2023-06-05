import { NavigationManager } from '../../../core/application/router/router.manager'
import { CREATE_PROFILE } from '../../../create-profile/presentation/page/page'

export const chooseProfileLogic = (navigationManager: NavigationManager) => {
    const addProfile = () => {
        navigationManager.goTo(CREATE_PROFILE)
    }

    return {
        addProfile,
    }
}
