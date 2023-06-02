import {
    useNavigate,
    useLocation,
    useSearchParams,
    useParams,
} from 'react-router-dom'
import { NavigationManager } from '../../../application/router/router.manager'

export const useRouterDomNavigation = (): NavigationManager => {
    const navigation = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const params = useParams()

    const goTo = (route: string) => {
        navigation(route)
    }

    const goToPopBack = (route: string) => {
        navigation(route, { replace: true })
    }

    const getCurrentRoute = (): string => location.pathname

    const getQuery = (key: string) => searchParams.get(key)

    const getParam = (key: string): string => params[key] || ''

    return {
        goTo,
        goToPopBack,
        getCurrentRoute,
        getQuery,
        getParam,
    }
}
