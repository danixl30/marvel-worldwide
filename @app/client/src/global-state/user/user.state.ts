import { Optional } from '@mono/types-utils'
import { StateViewer } from '../../core/application/state/state-provider'
import { User } from '../../user/application/services/dto/user'

export type UserState = {
    user: StateViewer<Optional<User>>
    refetch(): void
}
