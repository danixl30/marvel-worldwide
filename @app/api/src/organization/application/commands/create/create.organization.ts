import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateOrganizationDTO } from './types/dto'
import { CreateOrganizationResponse } from './types/response'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { HeadquarterId } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.id'
import { Headquarter } from 'src/organization/domain/entities/headquarter/hearquarter'
import { HeadquarterName } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.name'
import { HeadquarterKind } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.kind'
import { HeadquarterPlace } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.place'
import { Member } from 'src/organization/domain/entities/member/member'
import { MemberId } from 'src/organization/domain/entities/member/value-objects/member.id'
import { MemberCharge } from 'src/organization/domain/entities/member/value-objects/member.charge'
import { Organization } from 'src/organization/domain/organization'
import { OrganizationId } from 'src/organization/domain/value-objects/organization.id'
import { OrganizationName } from 'src/organization/domain/value-objects/name'
import { OrganizationObjetive } from 'src/organization/domain/value-objects/objetive'
import { Slogan } from 'src/organization/domain/value-objects/slogan'
import { OrganizationLeader } from 'src/organization/domain/value-objects/leader'
import { OrganizationFounder } from 'src/organization/domain/value-objects/founder'
import { CreationPlace } from 'src/organization/domain/value-objects/creation.place'
import { FirstAparition } from 'src/organization/domain/value-objects/first.aparition'
import { HeadquarterNotFoundError } from '../../errors/headquarter.not.found'

export class CreateOrganizationCommand
    implements
        ApplicationService<
            CreateOrganizationDTO,
            CreateOrganizationResponse,
            ApplicationError
        >
{
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createHeadquarterByDTO(dto: CreateOrganizationDTO): Headquarter {
        return new Headquarter(
            new HeadquarterId(this.uuidGenerator.generate()),
            new HeadquarterName(dto.headquarter!.name),
            new HeadquarterKind(dto.headquarter!.kind),
            new HeadquarterPlace(
                dto.headquarter!.place.country,
                dto.headquarter!.place.city,
            ),
        )
    }

    private createMembersByDTO(dto: CreateOrganizationDTO): Member[] {
        return dto.members.map(
            (e) => new Member(new MemberId(e.id), new MemberCharge(e.charge)),
        )
    }

    async execute(
        data: CreateOrganizationDTO,
    ): Promise<Result<CreateOrganizationResponse, ApplicationError>> {
        const headquarter = data.headquarterId
            ? await this.organizationRepository.getHeadquarterById(
                  new HeadquarterId(data.headquarterId),
              )
            : this.createHeadquarterByDTO(data)
        if (!headquarter) return Result.error(new HeadquarterNotFoundError())
        const members = this.createMembersByDTO(data)
        const organization = new Organization(
            new OrganizationId(this.uuidGenerator.generate()),
            new OrganizationName(data.name),
            new OrganizationObjetive(data.objetive),
            new Slogan(data.slogan),
            new OrganizationLeader(data.leader),
            headquarter,
            new OrganizationFounder(data.founder),
            new CreationPlace(data.creationPlace),
            members,
            new FirstAparition(data.creationPlace),
        )
        await this.organizationRepository.save(organization)
        this.eventHandler.publish(organization.pullEvents())
        return Result.success({
            id: organization.id.value,
        })
    }
}
