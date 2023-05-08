import { CreateProfileDTO } from 'src/profile/application/commands/create-profile/types/dto'

export type AddProfileDTO = CreateProfileDTO & {
    userId: string
}
