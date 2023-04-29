import { ApplicationService } from 'src/core/application/service/application.service'
import { GetOrganizationByIdDTO } from './type/dto'
import { GetOrganizationByIdResponse } from './type/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { OrganizationId } from 'src/organization/domain/value-objects/organization.id'
import { OrganizationNotFoundError } from '../../errors/organization.not.found'

export class GetOrganizationByIdQuery
    implements
        ApplicationService<
            GetOrganizationByIdDTO,
            GetOrganizationByIdResponse,
            ApplicationError
        >
{
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) {}

    async execute(
        data: GetOrganizationByIdDTO,
    ): Promise<Result<GetOrganizationByIdResponse, ApplicationError>> {
        const organization = await this.organizationRepository.getById(
            new OrganizationId(data.id),
        )
        if (!organization) return Result.error(new OrganizationNotFoundError())
        return Result.success({
            id: organization.id.value,
            name: organization.name.value,
            slogan: organization.slogan.value,
            headquarter: {
                id: organization.headquarter.id.value,
                name: organization.headquarter.name.value,
                kind: organization.headquarter.kind.value,
                place: {
                    city: organization.headquarter.place.value.split(',')[1],
                    country: organization.headquarter.place.value.split(',')[0],
                },
            },
            firstApparition: organization.firstApparition.value,
            creationPlace: organization.creationPlace.value,
            objetive: organization.objetive.value,
            founder: organization.founder.value,
            leader: organization.leader.value,
            members: organization.members.map((e) => ({
                id: e.id.value,
                charge: e.charge.value,
            })),
        })
    }
}
