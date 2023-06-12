import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const GetUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        context.switchToHttp().getRequest().user,
)
