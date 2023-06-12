import { Optional } from '@mono/types-utils'
import { SearchByCriteriaDTO } from 'src/civil/application/repositories/types/search.criteria.dto'
import { HeroeId } from 'src/heroe/domain/value-object/heroe.id'
import { OrganizationRepository } from 'src/organization/application/repositories/organization.repository'
import { Headquarter } from 'src/organization/domain/entities/headquarter/hearquarter'
import { HeadquarterId } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.id'
import { HeadquarterPlace } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.place'
import { Organization } from 'src/organization/domain/organization'
import { OrganizationId } from 'src/organization/domain/value-objects/organization.id'
import { VillainId } from 'src/villain/domain/value-object/villain.id'
import { Organization as OrganizationDB } from '../models/postgres/organization.entity'
import { Headquarter as HeadquarterDB } from '../models/postgres/headquarter.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lead } from '../models/postgres/lead.entity'
import { Belong } from '../models/postgres/belong.entity'
import { OrganizationName } from 'src/organization/domain/value-objects/name'
import { OrganizationObjetive } from 'src/organization/domain/value-objects/objetive'
import { Slogan } from 'src/organization/domain/value-objects/slogan'
import { OrganizationLeader } from 'src/organization/domain/value-objects/leader'
import { HeadquarterName } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.name'
import { HeadquarterKind } from 'src/organization/domain/entities/headquarter/value-objects/headquarter.kind'
import { OrganizationFounder } from 'src/organization/domain/value-objects/founder'
import { CreationPlace } from 'src/organization/domain/value-objects/creation.place'
import { Member } from 'src/organization/domain/entities/member/member'
import { MemberId } from 'src/organization/domain/entities/member/value-objects/member.id'
import { MemberCharge } from 'src/organization/domain/entities/member/value-objects/member.charge'
import { FirstAparition } from 'src/organization/domain/value-objects/first.aparition'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrganizationPostgresRepository implements OrganizationRepository {
    constructor(
        @InjectRepository(OrganizationDB)
        private readonly organizationDB: Repository<OrganizationDB>,
        @InjectRepository(HeadquarterDB)
        private readonly headquarterDB: Repository<HeadquarterDB>,
        @InjectRepository(Lead)
        private readonly leadDB: Repository<Lead>,
        @InjectRepository(Belong)
        private readonly belengDB: Repository<Belong>,
    ) {}
    async save(aggregate: Organization): Promise<void> {
        this.headquarterDB.upsert(
            this.headquarterDB.create({
                id: aggregate.headquarter.id.value,
                location: aggregate.headquarter.place.value,
                name: aggregate.headquarter.name.value,
                edificationType: aggregate.headquarter.kind.value,
            }),
            ['id'],
        )
        this.organizationDB.upsert(
            this.organizationDB.create({
                id: aggregate.id.value,
                name: aggregate.name.value,
                firstApparition: aggregate.firstApparition.value,
                type: '',
                headquarterId: aggregate.headquarter.id.value,
                slogan: aggregate.slogan.value,
                objetive: aggregate.objetive.value,
                creationPlace: aggregate.creationPlace.value,
            }),
            ['id'],
        )
        this.leadDB.upsert(
            this.leadDB.create({
                idOrganization: aggregate.id.value,
                idHeroe:
                    aggregate.leader.kind === 'heroe'
                        ? aggregate.leader.id
                        : undefined,
                idVillain:
                    aggregate.leader.kind === 'villain'
                        ? aggregate.leader.id
                        : undefined,
            }),
            ['idOrganization', 'idCharcter'],
        )
        await this.belengDB.delete({
            idOrganization: aggregate.id.value,
        })
        await aggregate.members.asyncMap((e) =>
            this.belengDB.insert(
                this.belengDB.create({
                    idOrganization: aggregate.id.value,
                    idHeroe: e.id.kind === 'heroe' ? e.id.id : undefined,
                    idVillain: e.id.kind === 'villain' ? e.id.id : undefined,
                    charge: e.charge.value,
                }),
            ),
        )
    }

    async delete(aggregate: Organization): Promise<void> {
        await this.organizationDB.delete({
            id: aggregate.id.value,
        })
        await this.leadDB.delete({
            idOrganization: aggregate.id.value,
        })
        await this.belengDB.delete({
            idOrganization: aggregate.id.value,
        })
    }

    async getById(id: OrganizationId): Promise<Optional<Organization>> {
        const organization = await this.organizationDB.findOneBy({
            id: id.value,
        })
        if (!organization) return null
        const leads = await this.leadDB.findOneBy({
            idOrganization: id.value,
        })
        const belong = await this.belengDB.findBy({
            idOrganization: id.value,
        })
        const headquarter = await this.headquarterDB.findOneBy({
            id: organization.headquarterId,
        })
        if (!headquarter) throw new Error('organization without headquarter')
        return new Organization(
            new OrganizationId(organization.id),
            new OrganizationName(organization.name),
            new OrganizationObjetive(organization.objetive),
            new Slogan(organization.slogan),
            new OrganizationLeader(
                (leads!.idHeroe || leads!.idVillain)!,
                leads?.idHeroe ? 'heroe' : 'villain',
            ),
            new Headquarter(
                new HeadquarterId(headquarter.id),
                new HeadquarterName(headquarter.name),
                new HeadquarterKind(headquarter.edificationType),
                new HeadquarterPlace(headquarter.location, ''),
            ),
            new OrganizationFounder(''),
            new CreationPlace(organization.creationPlace),
            belong.map(
                (e) =>
                    new Member(
                        new MemberId(
                            (e.idHeroe || e.idVillain)!,
                            e.idHeroe ? 'heroe' : 'villain',
                        ),
                        new MemberCharge(e.charge),
                    ),
            ),
            new FirstAparition(organization.firstApparition),
        )
    }

    async getByCriteria(
        criteria: SearchByCriteriaDTO,
    ): Promise<Organization[]> {
        const organizations = await this.organizationDB
            .createQueryBuilder()
            .limit(criteria.pagination?.limit || 10)
            .skip(
                (criteria.pagination?.page || 1) -
                    1 * (criteria.pagination?.limit || 0),
            )
            .andWhere({
                name: criteria.term,
            })
            .getMany()
        return organizations.asyncMap(async (organization) => {
            const leads = await this.leadDB.findOneBy({
                idOrganization: organization.id,
            })
            const belong = await this.belengDB.findBy({
                idOrganization: organization.id,
            })
            const headquarter = await this.headquarterDB.findOneBy({
                id: organization.headquarterId,
            })
            if (!headquarter)
                throw new Error('organization without headquarter')
            return new Organization(
                new OrganizationId(organization.id),
                new OrganizationName(organization.name),
                new OrganizationObjetive(organization.objetive),
                new Slogan(organization.slogan),
                new OrganizationLeader(
                    (leads!.idHeroe || leads!.idVillain)!,
                    leads?.idHeroe ? 'heroe' : 'villain',
                ),
                new Headquarter(
                    new HeadquarterId(headquarter.id),
                    new HeadquarterName(headquarter.name),
                    new HeadquarterKind(headquarter.edificationType),
                    new HeadquarterPlace(headquarter.location, ''),
                ),
                new OrganizationFounder(''),
                new CreationPlace(organization.creationPlace),
                belong.map(
                    (e) =>
                        new Member(
                            new MemberId(
                                (e.idHeroe || e.idVillain)!,
                                e.idHeroe ? 'heroe' : 'villain',
                            ),
                            new MemberCharge(e.charge),
                        ),
                ),
                new FirstAparition(organization.firstApparition),
            )
        })
    }

    async getHeadquarterById(
        id: HeadquarterId,
    ): Promise<Optional<Headquarter>> {
        const headquarter = await this.headquarterDB.findOneBy({
            id: id.value,
        })
        if (!headquarter) return null
        return new Headquarter(
            new HeadquarterId(headquarter.id),
            new HeadquarterName(headquarter.name),
            new HeadquarterKind(headquarter.edificationType),
            new HeadquarterPlace(headquarter.location, ''),
        )
    }

    async getHeadquarterByLocation(
        location: HeadquarterPlace,
    ): Promise<Optional<Headquarter>> {
        const headquarter = await this.headquarterDB.findOneBy({
            location: location.value,
        })
        if (!headquarter) return null
        return new Headquarter(
            new HeadquarterId(headquarter.id),
            new HeadquarterName(headquarter.name),
            new HeadquarterKind(headquarter.edificationType),
            new HeadquarterPlace(headquarter.location, ''),
        )
    }

    async getIfHeroeOrVillainIsLeader(
        id: HeroeId | VillainId,
    ): Promise<boolean> {
        const data = await this.leadDB
            .createQueryBuilder()
            .orWhere({
                idHeroe: id.value,
            })
            .orWhere({
                idVillain: id.value,
            })
            .getMany()
        return Boolean(data[0])
    }
}
