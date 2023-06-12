import { CHOOSE_PROFILE } from '../../../choose-profile/presentation/page/page'
import { InputManager } from '../../../core/application/input-manager'
import { OnInitJobLazy } from '../../../core/application/on-init-job/lazy/on-init-job-lazy'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { ToastProvider } from '../../../core/application/toast/toast'
import { Alerts } from '../../../core/application/toast/types/alerts'
import { LoginService } from '../../../user/application/services/login'
import { emailRegExp } from '../../../utils/reg-exps/email'
import { regExpPassword } from '../../../utils/reg-exps/password'

export const loginPageLogic = (
    inputManagerFactory: InputManager,
    toastProvider: ToastProvider,
    navigation: NavigationManager,
    loginService: ReturnType<typeof LoginService>,
    onInitLazyJob: OnInitJobLazy,
) => {
    const loginTask = onInitLazyJob(
        () =>
            loginService.execute({
                email: emailInput.value.value,
                password: passwordInput.value.value,
            }),
        () => {
            const pending = toastProvider.pending('Procesing')
            return {
                success: () => {
                    pending('Login successfully', Alerts.SUCCESS)
                    navigation.goTo(CHOOSE_PROFILE)
                },
                error: () => {
                    pending('Error on login', Alerts.ERROR)
                },
            }
        },
    )

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
        await loginTask.do().catch((e) => console.log(e))
    }

    return {
        emailInput,
        passwordInput,
        isSubmitable,
        submit,
    }
}
