import { InputManager } from '../../core/application/input-manager'
import { NavigationManager } from '../../core/application/router/router.manager'
import { SEARCH } from '../../search/page/page'

export const homeLogic = (
    inputManager: InputManager,
    navigation: NavigationManager,
) => {
    const searchInput = inputManager(
        '',
        () => '',
        (data) => data,
    )

    const submitSearch = () =>
        navigation.goTo(SEARCH + '/?term=' + searchInput.value.value)

    return {
        searchInput,
        submitSearch,
    }
}
