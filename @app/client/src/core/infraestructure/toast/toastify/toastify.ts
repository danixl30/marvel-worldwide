import { toast } from 'react-toastify'
import { Alerts } from '../../../application/toast/types/alerts'
import { ToastProvider } from '../../../application/toast/toast'

export const useToastToastify = (): ToastProvider => {
    const success = (value: string) => toast.success(value)
    const warning = (value: string) => toast.warning(value)
    const info = (value: string) => toast.info(value)
    const error = (value: string) => toast.error(value)
    const pending = (value: string) => {
        const id = toast.loading(value)
        return (msg: string, alertType: Alerts) =>
            toast.update(id, {
                render: msg,
                type: alertType,
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
                hideProgressBar: false,
            })
    }

    return {
        success,
        info,
        warning,
        error,
        pending,
    }
}
