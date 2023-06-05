import { Optional } from '@mono/types-utils'
import { InputManager } from '../../../core/application/input-manager'
import { StateFactory } from '../../../core/application/state/state-factory'
import { ToastProvider } from '../../../core/application/toast/toast'
import { regExpCardNumber } from '../../../utils/reg-exps/cardNumber'
import { emailRegExp } from '../../../utils/reg-exps/email'
import { regExpPassword } from '../../../utils/reg-exps/password'

export const registerPageLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastProvider: ToastProvider,
) => {
    const dobState = stateFactory<Optional<Date>>(null)
    const errorDob = stateFactory('')

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

    const cardNumberInput = inputManagerFactory(
        '',
        (data) => {
            if (!regExpCardNumber.test(data)) return 'Invalid card number'
            return ''
        },
        (data) => data.trim(),
    )

    const onChangeDob = (date: Date) => {
        if (new Date().getFullYear() - date.getFullYear() < 12) {
            errorDob.setState('Invalid date of birth day')
            return
        }
        errorDob.setState('')
        dobState.setState(date)
    }

    const isSubmitable = () =>
        emailInput.value.value &&
        !emailInput.error.value &&
        passwordInput.value.value &&
        !passwordInput.error.value &&
        cardNumberInput.value.value &&
        !cardNumberInput.error.value &&
        dobState.state.value &&
        !errorDob.state.value

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
        cardNumberInput,
        dob: dobState.state,
        onChangeDob,
        errorDob: errorDob.state,
    }
}
