import { Optional } from '@mono/types-utils'

export type NavigationManager = {
    goTo: (route: string) => void
    goToPopBack: (route: string) => void
    getCurrentRoute: () => string
    getQuery: (key: string) => Optional<string>
    getParam: (key: string) => string
}
