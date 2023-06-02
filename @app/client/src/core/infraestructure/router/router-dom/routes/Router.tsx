import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MAIN_PAGE } from '../../../../../main/presentation/page/route'

const MainPage = lazy(
    () => import('../../../../../main/presentation/page/MainPage'),
)

export default function Router() {
    return (
        <>
            <Suspense fallback={null}>
                <BrowserRouter>
                    <Routes>
                        <Route path={MAIN_PAGE} element={<MainPage />} />
                        <Route path="*" element={<Navigate to={MAIN_PAGE} />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}
