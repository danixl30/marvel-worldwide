import { EventProvider } from '../event-handler/context/EventProvider'
import Router from '../router/router-dom/routes/Router'
import ThemeProvider from '../theme/ThemeProvider'
import ToastContainer from '../toast/toastify/container/ToastifyContainer'

export default function App() {
    return (
        <>
            <ThemeProvider>
                <ToastContainer>
                    <EventProvider>
                        <Router />
                    </EventProvider>
                </ToastContainer>
            </ThemeProvider>
        </>
    )
}
