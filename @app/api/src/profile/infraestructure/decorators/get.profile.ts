import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const GetProfile = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        context.switchToHttp().getRequest().profile,
)
