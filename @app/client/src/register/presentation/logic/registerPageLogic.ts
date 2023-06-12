import { Optional } from '@mono/types-utils'
import { InputManager } from '../../../core/application/input-manager'
import { StateFactory } from '../../../core/application/state/state-factory'
import { ToastProvider } from '../../../core/application/toast/toast'
import { regExpCardNumber } from '../../../utils/reg-exps/cardNumber'
import { emailRegExp } from '../../../utils/reg-exps/email'
import { regExpPassword } from '../../../utils/reg-exps/password'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { CreateUserService } from '../../../user/application/services/create.user'
import { OnInitJobLazy } from '../../../core/application/on-init-job/lazy/on-init-job-lazy'
import { Alerts } from '../../../core/application/toast/types/alerts'
import { LOGIN_PAGE } from '../../../login/presentation/page'
import { UserTypes } from '../../../user/application/services/dto/user.types'

export const registerPageLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastProvider: ToastProvider,
    navigation: NavigationManager,
    registerService: ReturnType<typeof CreateUserService>,
    onInitLazyJob: OnInitJobLazy,
) => {
    const getUserType = () => {
        const type = navigation.getParam('type')
        if (type === 'vip') return UserTypes.VIP
        if (type === 'gold') return UserTypes.GOLD
        if (type === 'premium') return UserTypes.PREMIUM
        return UserTypes.INVITED
    }

    const registerTask = onInitLazyJob(
        () =>
            registerService.execute({
                email: emailInput.value.value,
                password: passwordInput.value.value,
                birthDate: dobState.state.value!,
                cardNumber: cardNumberInput.value.value.replaceAll('-', ''),
                type: getUserType(),
            }),
        () => {
            const pending = toastProvider.pending('Creating user...')
            return {
                success: () => {
                    pending('User created!!!', Alerts.SUCCESS)
                    navigation.goTo(LOGIN_PAGE)
                },
                error: () => {
                    pending('Error in creating user', Alerts.ERROR)
                },
            }
        },
    )

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
        await registerTask.do().catch((e) => console.log(e))
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
