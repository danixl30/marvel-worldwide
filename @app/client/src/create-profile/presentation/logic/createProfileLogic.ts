import { InputManager } from '../../../core/application/input-manager'
import { StateFactory } from '../../../core/application/state/state-factory'
import { ToastProvider } from '../../../core/application/toast/toast'
import { emailRegExp } from '../../../utils/reg-exps/email'

export const createProfileLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastProvider: ToastProvider,
) => {
    const language = stateFactory('')
    const preference1 = stateFactory('')
    const preference2 = stateFactory('')
    const preference3 = stateFactory('')
    const subPreference1 = stateFactory('')
    const subPreference2 = stateFactory('')
    const subPreference3 = stateFactory('')

    const emailInput = inputManagerFactory(
        '',
        (data) => {
            if (!emailRegExp.test(data)) return 'Invalid email'
            return ''
        },
        (data) => data.trim(),
    )

    const onChangePreference1 = (data: string) => {
        preference1.setState(data)
    }

    const onChangePreference2 = (data: string) => {
        preference2.setState(data)
    }

    const onChangePreference3 = (data: string) => {
        preference3.setState(data)
    }

    const onChangeSubPreference3 = (data: string) => {
        subPreference3.setState(data.trim())
    }

    const onChangeSubPreference2 = (data: string) => {
        subPreference2.setState(data.trim())
    }

    const onChangeSubPreference1 = (data: string) => {
        subPreference1.setState(data.trim())
    }

    const onChangeLanguage = (data: string) => {
        language.setState(data.trim())
    }

    const isSubmitable = () =>
        emailInput.value.value &&
        !emailInput.error.value &&
        preference1.state.value &&
        preference2.state.value &&
        preference3.state.value &&
        subPreference3.state.value &&
        subPreference2.state.value &&
        subPreference1.state.value

    const submit = async () => {
        if (!isSubmitable()) {
            toastProvider.warning('Invalid values...')
            return
        }
    }

    return {
        emailInput,
        isSubmitable,
        submit,
        preference1: preference1.state,
        preference2: preference2.state,
        preference3: preference3.state,
        subPreference3: subPreference3.state,
        subPreference2: subPreference2.state,
        subPreference1: subPreference1.state,
        language: language.state,
        onChangePreference1,
        onChangePreference2,
        onChangePreference3,
        onChangeSubPreference1,
        onChangeSubPreference2,
        onChangeSubPreference3,
        onChangeLanguage,
    }
}
