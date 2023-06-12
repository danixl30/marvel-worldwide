import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateUserDTO } from './types/dto'
import { CreateUserResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UserRepository } from '../../repositories/user.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { Crypto } from 'src/core/application/crypto/crypto'
import { Result } from 'src/core/application/result-handler/result.handler'
import { regExpPassword } from 'src/utils/reg-exps/password'
import { User } from 'src/user/model/user'
import { regExpCardNumber } from 'src/utils/reg-exps/cardNumber'

export class CreateUserCommand
    implements
        ApplicationService<CreateUserDTO, CreateUserResponse, ApplicationError>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly crypto: Crypto,
    ) {}

    async execute(
        data: CreateUserDTO,
    ): Promise<Result<CreateUserResponse, ApplicationError>> {
        const possibleUser = await this.userRepository.getByEmail(data.email)
        if (
            possibleUser ||
            !regExpPassword.test(data.password) ||
            !regExpCardNumber.test(data.cardNumber)
        )
            throw new Error('Error in create')
        const user: User = {
            id: this.uuidGenerator.generate(),
            email: data.email,
            password: await this.crypto.encrypt(data.password),
            cardNumber: data.cardNumber,
            birthDate: data.birthDate,
            membreship: {
                id: this.uuidGenerator.generate(),
                initialDate: new Date(),
                endDate: new Date(),
                type: data.type,
            },
            profiles: [],
        }
        await this.userRepository.save(user)
        return Result.success({
            id: user.id,
        })
    }
}
