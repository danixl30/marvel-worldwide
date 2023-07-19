import { GetByCriteriaDTO } from '../../../civil/application/repositories/civil.repository'
import { CancelHandler, HttpHandler } from '../../../core/application/http'
import { SessionManager } from '../../../core/application/session/session.manager'
import {
    CreateMovieDTO,
    GetMovieByIdResponse,
    GetMovies2WResponse,
    GetMoviesByCriteriaResponse,
    GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse,
    GetMoviesTop10HistoryResponse,
    GetMoviesTrendingResponse,
    ModifyMovieDTO,
    MovieRepository,
} from '../../application/repositories/movie.repository'

export const movieHttpRepository = (
    httpHandler: HttpHandler,
    session: SessionManager,
    cancelHandler: CancelHandler,
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

    const modify = async (data: ModifyMovieDTO) => {
        const { job } = httpHandler.put({
            url: '/movie/modify',
            headers: {
                auth: session.getSession() || '',
            },
            body: data,
        })

        await job()
    }

    const getById = async (id: string) => {
        const { job, cancel } = httpHandler.get<unknown, GetMovieByIdResponse>({
            url: '/movie/detail/' + id,
            headers: {
                auth: session.getSession() || '',
                profile: session.getProfile() || '',
            },
        })

        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getByCriteria = async (dto: GetByCriteriaDTO) => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetMoviesByCriteriaResponse
        >({
            url: '/movie/criteria',
            headers: {
                auth: session.getSession() || '',
                profile: session.getProfile() || '',
            },
            queries: dto,
        })

        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getTrending = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetMoviesTrendingResponse
        >({
            url: '/movie/trending',
            headers: {
                auth: session.getSession() || '',
                profile: session.getProfile() || '',
            },
        })

        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getTop10History = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetMoviesTop10HistoryResponse
        >({
            url: '/movie/top/10/history',
            headers: {
                auth: session.getSession() || '',
                profile: session.getProfile() || '',
            },
        })

        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getMovies2HAnimated = async () => {
        const { job, cancel } = httpHandler.get<
            unknown,
            GetMoviesThatIsAnimatedAnd2hAndHalfMoreResponse
        >({
            url: '/movie/2h/animated',
            headers: {
                auth: session.getSession() || '',
                profile: session.getProfile() || '',
            },
        })

        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    const getLast2Weeks = async () => {
        const { job, cancel } = httpHandler.get<unknown, GetMovies2WResponse>({
            url: '/movie/2w/near',
            headers: {
                auth: session.getSession() || '',
                profile: session.getProfile() || '',
            },
        })

        cancelHandler.subscribeCancel(cancel)
        const resp = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return resp.body
    }

    return {
        create,
        getById,
        getTrending,
        getByCriteria,
        getTop10History,
        getMovies2HAnimated,
        getLast2Weeks,
        modify,
    }
}
