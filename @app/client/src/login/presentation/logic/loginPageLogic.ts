import { InputManager } from '../../../core/application/input-manager'
import { StateFactory } from '../../../core/application/state/state-factory'
import { ToastProvider } from '../../../core/application/toast/toast'
import { emailRegExp } from '../../../utils/reg-exps/email'
import { regExpPassword } from '../../../utils/reg-exps/password'

export const loginPageLogic = (
    inputManagerFactory: InputManager,
    toastProvider: ToastProvider,
) => {
    const emailInput = inputManagerFactory(
        '',
        (data) => {
            if (!emailRegExp.test(data)) return 'Invalid email'
            return ''
        },
        (data) => data.trim(),
    )
    const passwordInput = inputManagerFactory(
        '',
        (data) => {
            if (!regExpPassword.test(data)) return 'Invalid password'
            return ''
        },
        (data) => data.trim(),
    )

    const isSubmitable = () =>
        emailInput.value.value &&
        !emailInput.error.value &&
        passwordInput.value.value &&
        !passwordInput.error.value

    const submit = async () => {
        if (!isSubmitable()) {
            toastProvider.warning('Invalid values...')
            return
        }
    }

    return {
        emailInput,
        passwordInput,
        isSubmitable,
        submit,
    }
}
