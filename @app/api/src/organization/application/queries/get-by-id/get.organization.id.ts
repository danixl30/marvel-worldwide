import { ApplicationService } from 'src/core/application/service/application.service'
import { GetOrganizationByIdDTO } from './type/dto'
import { GetOrganizationByIdResponse } from './type/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { OrganizationRepository } from '../../repositories/organization.repository'
import { Result } from 'src/core/application/result-handler/result.handler'
import { OrganizationId } from 'src/organization/domain/value-objects/organization.id'
import { OrganizationNotFoundError } from '../../errors/organization.not.found'
import { HeroeRepository } from 'src/heroe/application/repositories/heroe.repository'
import { VillainRepository } from 'src/villain/application/repositories/villain.repository'
import { CivilRepository } from 'src/civil/application/repositories/civil.repository'
import { MemberId } from 'src/organization/domain/entities/member/value-objects/member.id'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'

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
        private readonly heroeRepository: HeroeRepository,
        private readonly villainRepository: VillainRepository,
        private readonly civilRepository: CivilRepository,
    ) {}

    async getHeroeVillainOrCivil(id: MemberId) {
        const civil = await this.civilRepository.getById(new CivilId(id.id))
        if (civil)
            return {
                id: civil.id.value,
                name: civil.person.name.value,
                kind: 'civil',
            }
        const heroe = await this.heroeRepository.getById(new HeroeId(id.id))
        if (heroe)
            return {
                id: heroe.id.value,
                name: heroe.name.value,
                kind: 'heroe',
            }
        const villain = await this.villainRepository.getById(
            new VillainId(id.id),
        )
        if (villain)
            return {
                id: villain.id.value,
                name: villain.name.value,
                kind: 'villain',
            }
        throw new Error('Target not found')
    }

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
            founder: await this.getHeroeVillainOrCivil(
                new MemberId(organization.founder.value, 'civil'),
            ),
            leader: await this.getHeroeVillainOrCivil(
                new MemberId(organization.leader.id, 'civil'),
            ),
            members: await organization.members.asyncMap(async (e) => {
                const character = await this.getHeroeVillainOrCivil(e.id)
                return {
                    id: e.id.id,
                    name: character.name,
                    kind: character.kind,
                    charge: e.charge.value,
                }
            }),
        })
    }
}
