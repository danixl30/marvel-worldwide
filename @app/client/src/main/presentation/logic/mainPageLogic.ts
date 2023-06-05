import { NavigationManager } from '../../../core/application/router/router.manager'
import { LOGIN_PAGE } from '../../../login/presentation/page'
import { REGISTER_PAGE } from '../../../register/presentation/page/page'

export const mainPageLogic = (navigationManager: NavigationManager) => {
    const goToLogin = () => {
        navigationManager.goTo(LOGIN_PAGE)
    }

    const goToRegisterInvited = () => {
        navigationManager.goTo(REGISTER_PAGE.replace(':type', 'invited'))
    }

    const goToRegisterGold = () => {
        navigationManager.goTo(REGISTER_PAGE.replace(':type', 'gold'))
    }

    const goToRegisterPremium = () => {
        navigationManager.goTo(REGISTER_PAGE.replace(':type', 'premium'))
    }

    const goToRegisterVIP = () => {
        navigationManager.goTo(REGISTER_PAGE.replace(':type', 'vip'))
    }

    return {
        goToLogin,
        goToRegisterVIP,
        goToRegisterGold,
        goToRegisterInvited,
        goToRegisterPremium,
    }
}
