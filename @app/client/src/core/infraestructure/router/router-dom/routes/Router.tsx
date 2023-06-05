import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MAIN_PAGE } from '../../../../../main/presentation/page/route'
import { LOGIN_PAGE } from '../../../../../login/presentation/page'
import { REGISTER_PAGE } from '../../../../../register/presentation/page/page'
import { CHOOSE_PROFILE } from '../../../../../choose-profile/presentation/page/page'
import { CREATE_PROFILE } from '../../../../../create-profile/presentation/page/page'

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
                        <Route path="*" element={<Navigate to={MAIN_PAGE} />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}
