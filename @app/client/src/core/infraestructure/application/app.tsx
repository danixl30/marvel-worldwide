import { EventProvider } from '../event-handler/context/EventProvider'
import Router from '../router/router-dom/routes/Router'
import ToastContainer from '../toast/toastify/container/ToastifyContainer'

export default function App() {
    return (
        <>
            <ToastContainer>
                <EventProvider>
                    <Router />
                </EventProvider>
            </ToastContainer>
        </>
    )
}
