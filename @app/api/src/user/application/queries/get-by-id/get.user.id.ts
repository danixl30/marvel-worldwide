import { ApplicationService } from 'src/core/application/service/application.service'
import { GetUserByIdDTO } from './types/dto'
import { GetUserByIdResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { UserRepository } from '../../repositories/user.repository'
import { Result } from 'src/core/application/result-handler/result.handler'

export class GetUserByIdQuery
    implements
        ApplicationService<
            GetUserByIdDTO,
            GetUserByIdResponse,
            ApplicationError
        >
{
    constructor(private readonly userRepository: UserRepository) {}

    async execute(
        data: GetUserByIdDTO,
    ): Promise<Result<GetUserByIdResponse, ApplicationError>> {
        const user = await this.userRepository.getById(data.id)
        if (!user) throw new Error('User not found')
        const response: GetUserByIdResponse & { password?: string } = user
        delete response.password
        return Result.success(response)
    }
}
