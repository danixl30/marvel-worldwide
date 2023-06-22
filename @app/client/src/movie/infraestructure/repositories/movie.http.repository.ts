import { HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateMovieDTO,
    MovieRepository,
} from '../../application/repositories/movie.repository'

export const movieHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
): MovieRepository => {
    const create = async (data: CreateMovieDTO) => {
        const { job } = httpHandler.post({
            url: '/movie/create',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })

        await job()
    }

    return {
        create,
    }
}
