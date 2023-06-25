import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
                        <Route path={REPORTS_PAGE} element={<ReportsPage />} />
                        <Route path={HOME_PAGE} element={<HomePage />} />
                        <Route path="*" element={<Navigate to={MAIN_PAGE} />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}
