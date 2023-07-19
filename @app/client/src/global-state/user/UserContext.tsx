import { ReactNode, createContext, useContext } from 'react'
import { UserState } from './user.state'
import { Optional } from '@mono/types-utils'
import { userLogic } from './user.logic'
import { nativeOnInitJob } from '../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useRefStateFactory } from '../../core/infraestructure/state/useRefStateHandler'
import { useEffectStateObserver } from '../../core/infraestructure/state-observer/useEffectStateObserver'
import { useEffectOnInit } from '../../core/infraestructure/on-init/useEffectOnInit'
import { getUserApplicationService } from '../../user/application/services/get.user'
import { userHttpRepository } from '../../user/infraestructure/repositories/user.http.repository'
import { useAxiosHttp } from '../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { useCookieSession } from '../../core/infraestructure/session/cookie/session-cookie'
import { cancelHandler } from '../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useRefValueProvider } from '../../core/infraestructure/value-provider/useRefValueProvider'

export const UserContext = createContext<Optional<UserState>>(undefined)

export type UserStateProviderProps = {
    children: ReactNode | ReactNode[]
}

export const getUserState = () => useContext(UserContext)!

export const UserStateProvider = (props: UserStateProviderProps) => {
    const userData = userLogic(
        nativeOnInitJob(
            useRefStateFactory(),
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getUserApplicationService(
            userHttpRepository(
                useAxiosHttp(),
                useCookieSession(),
                cancelHandler(useRefValueProvider(), useEffectOnInit),
            ),
        ),
    )

    return (
        <UserContext.Provider value={userData}>
            {props.children}
        </UserContext.Provider>
    )
}
