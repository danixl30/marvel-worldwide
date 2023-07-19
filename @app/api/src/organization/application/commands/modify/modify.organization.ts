import { ApplicationService } from 'src/core/application/service/application.service'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { ApplicationError } from 'src/core/application/error/application.error'
import { Result } from 'src/core/application/result-handler/result.handler'
import { HeadquarterId } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.id'
import { HeadquarterName } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.name'
import { HeadquarterKind } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.kind'
import { HeadquarterPlace } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.place'
import { Member } from 'src/organization/domain/entities/member/member'
import { MemberId } from 'src/organization/domain/entities/member/value-objects/member.id'
import { MemberCharge } from 'src/organization/domain/entities/member/value-objects/member.charge'
import { OrganizationId } from 'src/organization/domain/value-objects/organization.id'
import { OrganizationName } from 'src/organization/domain/value-objects/name'
import { OrganizationObjetive } from 'src/organization/domain/value-objects/objetive'
import { Slogan } from 'src/organization/domain/value-objects/slogan'
import { OrganizationLeader } from 'src/organization/domain/value-objects/leader'
import { CreationPlace } from 'src/organization/domain/value-objects/creation.place'
import { FirstAparition } from 'src/organization/domain/value-objects/first.aparition'
import { HeadquarterNotFoundError } from '../../errors/headquarter.not.found'
import { ModifyOrganizationDTO } from './types/dto'
import { CreateOrganizationResponse } from '../create/types/response'
import { OrganizationNotFoundError } from '../../errors/organization.not.found'

export class ModifyOrganizationCommand
    implements
        ApplicationService<
            ModifyOrganizationDTO,
            CreateOrganizationResponse,
            ApplicationError
        >
{
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    private createMembersByDTO(dto: ModifyOrganizationDTO): Member[] {
        return dto.members.map(
            (e) =>
                new Member(
                    new MemberId(e.id, e.kind),
                    new MemberCharge(e.charge),
                ),
        )
    }

    async execute(
        data: ModifyOrganizationDTO,
    ): Promise<Result<CreateOrganizationResponse, ApplicationError>> {
        const organization = await this.organizationRepository.getById(
            new OrganizationId(data.id),
        )
        if (!organization) throw new OrganizationNotFoundError()
        if (data.headquarterId) {
            const headquarter =
                await this.organizationRepository.getHeadquarterById(
                    new HeadquarterId(data.headquarterId),
                )
            if (!headquarter)
                return Result.error(new HeadquarterNotFoundError())
            organization.changeHeadQuarter(headquarter)
        }
        const members = this.createMembersByDTO(data)
        if (data.name) organization.changeName(new OrganizationName(data.name))
        if (data.objetive)
            organization.changeObjetive(new OrganizationObjetive(data.objetive))
        if (data.slogan) organization.changeSlogan(new Slogan(data.slogan))
        if (data.leader)
            organization.changeLeader(
                new OrganizationLeader(data.leader.id, data.leader.kind),
            )
        if (data.creationPlace)
            organization.changeCreationPlace(
                new CreationPlace(data.creationPlace),
            )
        if (data.firstApparition)
            organization.changeFirstApparition(
                new FirstAparition(data.firstApparition),
            )
        if (data.headquarter) {
            const headquarter = organization.headquarter
            if (data.headquarter.name)
                headquarter.changeName(
                    new HeadquarterName(data.headquarter.name),
                )
            if (data.headquarter.place)
                headquarter.changePlace(
                    new HeadquarterPlace(
                        data.headquarter.place.country,
                        data.headquarter.place.city,
                    ),
                )
            if (data.headquarter.kind)
                headquarter.changeKind(
                    new HeadquarterKind(data.headquarter.kind),
                )
            organization.changeHeadQuarter(headquarter)
        }
        data.membersToRemove.forEach((e) =>
            organization.removeMember(new MemberId(e.id, e.kind)),
        )
        members.forEach((e) => organization.addMember(e))
        await this.organizationRepository.save(organization)
        this.eventHandler.publish(organization.pullEvents())
        return Result.success({
            id: organization.id.value,
        })
    }
}
