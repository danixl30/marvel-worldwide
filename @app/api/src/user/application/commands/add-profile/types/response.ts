import { CreateProfileResponse } from 'src/profile/application/commands/create-profile/types/response'

export type AddProfileResponse = CreateProfileResponse & {
    userId: string
}
