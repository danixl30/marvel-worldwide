import { ApplicationService } from 'src/core/application/service/application.service'
import { GetTop5ContentPremiumVIPResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { ProfileRepository } from '../../repositories/profile.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { MovieRepository } from 'src/movie/application/repositories/movie.repository'
import { SerieRepository } from 'src/serie/application/repositories/serie.repository'
import { HistoryTarget } from 'src/profile/domain/entities/history/value-objects/target'
import { MovieId } from 'src/movie/domain/value-objects/movie.id'
import { SerieId } from 'src/serie/domain/value-objects/id'
import { VideogameRepository } from 'src/videogame/application/repositories/videogame.repository'
import { VideogameId } from 'src/videogame/domain/value-objects/id'

export class GetTop5ContentPremiumVIPQuery
    implements
        ApplicationService<
            undefined,
            GetTop5ContentPremiumVIPResponse,
            ApplicationError
        >
{
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly movieRepository: MovieRepository,
        private readonly serieRepository: SerieRepository,
        private readonly videogameRepository: VideogameRepository,
    ) {}

    private async getDetailByKind(target: HistoryTarget) {
        const kindRecord = {
            movie: () =>
                this.movieRepository.getById(new MovieId(target.postId)),
            serie: () =>
                this.serieRepository.getById(new SerieId(target.postId)),
            videogame: () =>
                this.videogameRepository.getById(
                    new VideogameId(target.postId),
                ),
        }
        const post = await kindRecord[target.kind]?.()
        if (!post) throw new Error('Post not exist')
        return post
    }

    async execute(): Promise<
        Result<GetTop5ContentPremiumVIPResponse, ApplicationError>
    > {
        const data = await this.profileRepository.getTop5ContentPrimiumVIP()
        const posts = await data.asyncMap((e) => this.getDetailByKind(e.target))
        return Result.success(
            posts.map((e, index) => ({
                id: e.id.value,
                title: e.title.value,
                synopsis: e.synopsis.value,
                kind: data[index].target.kind,
            })),
        )
    }
}
