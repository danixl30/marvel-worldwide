import { ApplicationError } from '../error/application.error'
import { ApplicationService } from '../service/application.service'
import { ExceptionReductor } from '../exception-reductor/exception.reductor'
import { Result } from '../result-handler/result.handler'

export class ExceptionDecorator<T, U, E extends ApplicationError> implements ApplicationService<T, U, E> {
    constructor(private service: ApplicationService<T, U, E>, private reductor: ExceptionReductor) {}
    async execute(data: T): Promise<Result<U, E>> {
        try {
            return this.service.execute(data)
        } catch (e) {
            this.reductor.reduce(e)
            throw e
        }
    }
}
