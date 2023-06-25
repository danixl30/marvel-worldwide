import { CHOOSE_PROFILE } from '../../../choose-profile/presentation/page/page'
import { InputManager } from '../../../core/application/input-manager'
import { OnInitJobLazy } from '../../../core/application/on-init-job/lazy/on-init-job-lazy'
import { NavigationManager } from '../../../core/application/router/router.manager'
import { StateFactory } from '../../../core/application/state/state-factory'
import { ToastProvider } from '../../../core/application/toast/toast'
import { Alerts } from '../../../core/application/toast/types/alerts'
import { createProfileService } from '../../../profile/application/services/create.profile'
import { MediaType } from '../../../profile/application/services/dto/create.profile'
import { emailRegExp } from '../../../utils/reg-exps/email'

export const createProfileLogic = (
    stateFactory: StateFactory,
    inputManagerFactory: InputManager,
    toastProvider: ToastProvider,
    onInitJobLazy: OnInitJobLazy,
    createProfile: ReturnType<typeof createProfileService>,
    navigation: NavigationManager,
) => {
    const language = stateFactory('')
    const preference1 = stateFactory('')
    const preference2 = stateFactory('')
    const preference3 = stateFactory('')
    const subPreference1 = stateFactory('')
    const subPreference2 = stateFactory('')
    const subPreference3 = stateFactory('')

    const createProfileTask = onInitJobLazy(
        () =>
            createProfile.execute({
                email: emailInput.value.value,
                language: language.state.value,
                preferences: [
                    {
                        kind: subPreference1.state.value,
                        platform: preference1.state.value as MediaType,
                    },
                    {
                        kind: subPreference2.state.value,
                        platform: preference2.state.value as MediaType,
                    },
                    {
                        kind: subPreference3.state.value,
                        platform: preference3.state.value as MediaType,
                    },
                ],
            }),
        () => {
            const pending = toastProvider.pending('Procesing')
            return {
                success: () => {
                    pending('Profile created', Alerts.SUCCESS)
                    navigation.goTo(CHOOSE_PROFILE)
                },
                error: () => {
                    pending('Error during creating profile', Alerts.ERROR)
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

    const onChangePreference1 = (data: string) => {
        subPreference1.setState('')
        preference1.setState(data)
    }

    const onChangePreference2 = (data: string) => {
        subPreference2.setState('')
        preference2.setState(data)
    }

    const onChangePreference3 = (data: string) => {
        subPreference3.setState('')
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
        subPreference1.state.value &&
        language.state.value

    const submit = async () => {
        if (!isSubmitable()) {
            toastProvider.warning('Invalid values...')
            return
        }
        await createProfileTask.do().catch((e) => console.log(e))
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
