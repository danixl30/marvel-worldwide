import { lazy, Suspense } from 'react'
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom'
import { MAIN_PAGE } from '../../../../../main/presentation/page/route'
import { LOGIN_PAGE } from '../../../../../login/presentation/page'
import { REGISTER_PAGE } from '../../../../../register/presentation/page/page'
import { CHOOSE_PROFILE } from '../../../../../choose-profile/presentation/page/page'
import { CREATE_PROFILE } from '../../../../../create-profile/presentation/page/page'
import { CREATE_VILLAIN } from '../../../../../create-villain/page/page'
import { CREATE_VIDEOGAME } from '../../../../../create-videogame/page/page'
import { CREATE_ORGANIZATION } from '../../../../../create-organization/page/page'
import { CREATE_COMBAT } from '../../../../../create-combat/page/page'
import { CREATE_CIVIL } from '../../../../../create-civil/page/page'
import { CREATE_HEROE } from '../../../../../create-heroe/page/page'
import { CREATE_MOVIE } from '../../../../../create-movie/page/page'
import { CREATE_SERIE } from '../../../../../create-serie/page/page'
import { REPORTS_PAGE } from '../../../../../reports/page/page'
import { HOME_PAGE } from '../../../../../home/page/page'
import { CIVIL_DETAILS } from '../../../../../details-civil/page/page'
import { COMBAT_DETAILS } from '../../../../../details-combat/page/page'
import { HEROE_DETAILS } from '../../../../../details-heroe/page/page'
import { MOVIE_DETAILS } from '../../../../../details-movie/page/page'
import { ORGANIZATION_DETAILS } from '../../../../../details-organization/page/page'
import { SERIE_DETAILS } from '../../../../../details-serie/page/page'
import { VIDEOGAME_DETIALS } from '../../../../../details-videogame/page/page'
import { VILLAIN_DETAILS } from '../../../../../detials-villain/page/page'
import { SEARCH } from '../../../../../search/page/page'
import { UserStateProvider } from '../../../../../global-state/user/UserContext'
import { MODIFY_VIDEOGAME } from '../../../../../modify/videogame/page/page'
import { MODIFY_ORGANIZATION } from '../../../../../modify/organization/page/page'
import { MODIFY_COMBAT } from '../../../../../modify/combat/page/page'
import { MODIFY_CIVIL } from '../../../../../modify/civil/page/page'
import { MODIFY_HEROE } from '../../../../../modify/heroe/page/page'
import { MODIFY_MOVIE } from '../../../../../modify/movie/page/page'
import { MODIFY_SERIE } from '../../../../../modify/serie/page/page'

const MainPage = lazy(
    () => import('../../../../../main/presentation/page/MainPage'),
)
const LoginPage = lazy(() => import('../../../../../login/presentation/Login'))
const RegisterPage = lazy(
    () => import('../../../../../register/presentation/page/RegisterPage'),
)
const ChooseProfilePage = lazy(
    () =>
        import(
            '../../../../../choose-profile/presentation/page/ChooseProfilePage'
        ),
)
const CreateProfilePage = lazy(
    () =>
        import(
            '../../../../../create-profile/presentation/page/CreateProfilePage'
        ),
)
const CreateOrganizationPage = lazy(
    () => import('../../../../../create-organization/page/CreateOrganization'),
)
const CreateVideogamePage = lazy(
    () => import('../../../../../create-videogame/page/CreateVideogamePage'),
)
const CreateVillainPage = lazy(
    () => import('../../../../../create-villain/page/CreateVillainPage'),
)
const CreateCombatPage = lazy(
    () => import('../../../../../create-combat/page/CreateCombat'),
)
const CreateCivilPage = lazy(
    () => import('../../../../../create-civil/page/CreateCivil'),
)
const CreateHeroePage = lazy(
    () => import('../../../../../create-heroe/page/CreateHeroe'),
)
const CreateMoviePage = lazy(
    () => import('../../../../../create-movie/page/CreateMovie'),
)
const CreateSeriePage = lazy(
    () => import('../../../../../create-serie/page/CreateSerie'),
)
const ReportsPage = lazy(() => import('../../../../../reports/page/Reports'))
const HomePage = lazy(() => import('../../../../../home/page/Home'))
const CivilDetialsPage = lazy(
    () => import('../../../../../details-civil/page/CivilDetailsPage'),
)
const CombatDetailsPage = lazy(
    () => import('../../../../../details-combat/page/CombatDetails'),
)
const HeroeDetialsPage = lazy(
    () => import('../../../../../details-heroe/page/HeroeDetails'),
)
const MovieDetailsPage = lazy(
    () => import('../../../../../details-movie/page/MovieDetails'),
)
const OrganizationDetailsPage = lazy(
    () =>
        import('../../../../../details-organization/page/OrganizationDetials'),
)
const SerieDetailsPage = lazy(
    () => import('../../../../../details-serie/page/SerieDetails'),
)
const VideogameDetailsPage = lazy(
    () => import('../../../../../details-videogame/page/VideogameDetails'),
)
const VillainDetailsPage = lazy(
    () => import('../../../../../detials-villain/page/VillainDetails'),
)
const ModifyCivilPage = lazy(
    () => import('../../../../../modify/civil/page/ModifyCivil'),
)
const ModifyCombatPage = lazy(
    () => import('../../../../../modify/combat/page/ModifyCombat'),
)
const ModifyHeroePage = lazy(
    () => import('../../../../../modify/heroe/page/ModifyHeroe'),
)
const ModifyMoviePage = lazy(
    () => import('../../../../../modify/movie/page/ModifyMovie'),
)
const ModifyOrganizationPage = lazy(
    () => import('../../../../../modify/organization/page/ModifyOrganization'),
)
const ModifySeriePage = lazy(
    () => import('../../../../../modify/serie/page/ModifySerie'),
)
const ModifyVideogamePage = lazy(
    () => import('../../../../../modify/videogame/page/ModifyVideogame'),
)
const ModifyVillainPage = lazy(
    () => import('../../../../../modify/villain/page/ModifyVillain'),
)
const SearchPage = lazy(() => import('../../../../../search/page/SearchPage'))

export default function Router() {
    return (
        <>
            <Suspense fallback={null}>
                <BrowserRouter>
                    <Routes>
                        <Route path={MAIN_PAGE} element={<MainPage />} />
                        <Route path={LOGIN_PAGE} element={<LoginPage />} />
                        <Route
                            path={REGISTER_PAGE}
                            element={<RegisterPage />}
                        />
                        <Route
                            element={
                                <UserStateProvider>
                                    <Outlet />
                                </UserStateProvider>
                            }
                        >
                            <Route
                                path={CHOOSE_PROFILE}
                                element={<ChooseProfilePage />}
                            />
                            <Route
                                path={CREATE_PROFILE}
                                element={<CreateProfilePage />}
                            />
                            <Route
                                path={CREATE_VILLAIN}
                                element={<CreateVillainPage />}
                            />
                            <Route
                                path={CREATE_VIDEOGAME}
                                element={<CreateVideogamePage />}
                            />
                            <Route
                                path={CREATE_ORGANIZATION}
                                element={<CreateOrganizationPage />}
                            />
                            <Route
                                path={CREATE_COMBAT}
                                element={<CreateCombatPage />}
                            />
                            <Route
                                path={CREATE_CIVIL}
                                element={<CreateCivilPage />}
                            />
                            <Route
                                path={CREATE_HEROE}
                                element={<CreateHeroePage />}
                            />
                            <Route
                                path={CREATE_MOVIE}
                                element={<CreateMoviePage />}
                            />
                            <Route
                                path={CREATE_SERIE}
                                element={<CreateSeriePage />}
                            />
                            <Route
                                path={REPORTS_PAGE}
                                element={<ReportsPage />}
                            />
                            <Route path={HOME_PAGE} element={<HomePage />} />
                            <Route
                                path={CIVIL_DETAILS}
                                element={<CivilDetialsPage />}
                            />
                            <Route
                                path={COMBAT_DETAILS}
                                element={<CombatDetailsPage />}
                            />
                            <Route
                                path={HEROE_DETAILS}
                                element={<HeroeDetialsPage />}
                            />
                            <Route
                                path={MOVIE_DETAILS}
                                element={<MovieDetailsPage />}
                            />
                            <Route
                                path={ORGANIZATION_DETAILS}
                                element={<OrganizationDetailsPage />}
                            />
                            <Route
                                path={SERIE_DETAILS}
                                element={<SerieDetailsPage />}
                            />
                            <Route
                                path={VIDEOGAME_DETIALS}
                                element={<VideogameDetailsPage />}
                            />
                            <Route
                                path={VILLAIN_DETAILS}
                                element={<VillainDetailsPage />}
                            />
                            <Route path={SEARCH} element={<SearchPage />} />
                            <Route
                                path={MODIFY_VIDEOGAME}
                                element={<ModifyVillainPage />}
                            />
                            <Route
                                path={MODIFY_VIDEOGAME}
                                element={<ModifyVideogamePage />}
                            />
                            <Route
                                path={MODIFY_ORGANIZATION}
                                element={<ModifyOrganizationPage />}
                            />
                            <Route
                                path={MODIFY_COMBAT}
                                element={<ModifyCombatPage />}
                            />
                            <Route
                                path={MODIFY_CIVIL}
                                element={<ModifyCivilPage />}
                            />
                            <Route
                                path={MODIFY_HEROE}
                                element={<ModifyHeroePage />}
                            />
                            <Route
                                path={MODIFY_MOVIE}
                                element={<ModifyMoviePage />}
                            />
                            <Route
                                path={MODIFY_SERIE}
                                element={<ModifySeriePage />}
                            />
                        </Route>
                        <Route path="*" element={<Navigate to={MAIN_PAGE} />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}
