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
                idFounder: aggregate.founder.id,
            }),
            ['id'],
        )
        this.leadDB.upsert(
            this.leadDB.create({
                idOrganization: aggregate.id.value,
                idCharacter: aggregate.leader.id,
            }),
            ['idOrganization', 'idCharacter'],
        )
        await this.belengDB.delete({
            idOrganization: aggregate.id.value,
        })
        await aggregate.members.asyncMap((e) =>
            this.belengDB.insert(
                this.belengDB.create({
                    idOrganization: aggregate.id.value,
                    idCharacter: e.id.id,
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
        const organization = await this.organizationDB
            .createQueryBuilder('organization')
            .innerJoinAndSelect('organization.founder', 'founder')
            .where({
                id: id.value,
            })
            .getOne()
        if (!organization) return null
        const leads = await this.leadDB
            .createQueryBuilder('lead')
            .innerJoinAndSelect('lead.character', 'character')
            .where('lead.idOrganization = :id', {
                id: organization.id,
            })
            .getOne()
        const belong = await this.belengDB
            .createQueryBuilder('belong')
            .innerJoinAndSelect('belong.character', 'character')
            .where('belong.idOrganization = :id', {
                id: organization.id,
            })
            .getMany()
        const headquarter = await this.headquarterDB.findOneBy({
            id: organization.headquarterId,
        })
        if (!headquarter) throw new Error('organization without headquarter')
        return new Organization(
            new OrganizationId(organization.id),
            new OrganizationName(organization.name),
            new OrganizationObjetive(organization.objetive),
            new Slogan(organization.slogan),
            new OrganizationLeader(leads!.idCharacter, leads!.character.kind),
            new Headquarter(
                new HeadquarterId(headquarter.id),
                new HeadquarterName(headquarter.name),
                new HeadquarterKind(headquarter.edificationType),
                new HeadquarterPlace(
                    headquarter.location.split(', ')[0],
                    headquarter.location.split(', ')[1],
                ),
            ),
            new OrganizationFounder(organization.idFounder),
            new CreationPlace(organization.creationPlace),
            belong.map(
                (e) =>
                    new Member(
                        new MemberId(e.idCharacter, e.character.kind),
                        new MemberCharge(e.charge),
                    ),
            ),
            new FirstAparition(organization.firstApparition),
        )
    }

    async getAll(): Promise<Organization[]> {
        const organizations = await this.organizationDB
            .createQueryBuilder('organization')
            .innerJoinAndSelect('organization.founder', 'founder')
            .getMany()
        return organizations.asyncMap(async (organization) => {
            const leads = await this.leadDB
                .createQueryBuilder('lead')
                .innerJoinAndSelect('lead.character', 'character')
                .where('lead.idOrganization = :id', {
                    id: organization.id,
                })
                .getOne()
            const belong = await this.belengDB
                .createQueryBuilder('belong')
                .innerJoinAndSelect('belong.character', 'character')
                .where('belong.idOrganization = :id', {
                    id: organization.id,
                })
                .getMany()
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
                    leads!.idCharacter,
                    leads!.character.kind,
                ),
                new Headquarter(
                    new HeadquarterId(headquarter.id),
                    new HeadquarterName(headquarter.name),
                    new HeadquarterKind(headquarter.edificationType),
                    new HeadquarterPlace(headquarter.location, ''),
                ),
                new OrganizationFounder(organization.idFounder),
                new CreationPlace(organization.creationPlace),
                belong.map(
                    (e) =>
                        new Member(
                            new MemberId(e.idCharacter, e.character.kind),
                            new MemberCharge(e.charge),
                        ),
                ),
                new FirstAparition(organization.firstApparition),
            )
        })
    }

    async getAllHeadquarters(): Promise<Headquarter[]> {
        const headquarters = await this.headquarterDB.find()
        return headquarters.map(
            (headquarter) =>
                new Headquarter(
                    new HeadquarterId(headquarter.id),
                    new HeadquarterName(headquarter.name),
                    new HeadquarterKind(headquarter.edificationType),
                    new HeadquarterPlace(headquarter.location, ''),
                ),
        )
    }

    async getByCriteria(
        criteria: SearchByCriteriaDTO,
    ): Promise<Organization[]> {
        const organizations = await this.organizationDB
            .createQueryBuilder('organization')
            .innerJoinAndSelect('organization.founder', 'founder')
            .limit(criteria.pagination?.limit || 10)
            .skip(
                ((criteria.pagination?.page || 1) - 1) *
                    (criteria.pagination?.limit || 0),
            )
            .where('organization.name like :name', {
                name: `%${criteria.term}%`,
            })
            .getMany()
        return organizations.asyncMap(async (organization) => {
            const leads = await this.leadDB
                .createQueryBuilder('lead')
                .innerJoinAndSelect('lead.character', 'character')
                .where('lead.idOrganization = :id', {
                    id: organization.id,
                })
                .getOne()
            const belong = await this.belengDB
                .createQueryBuilder('belong')
                .innerJoinAndSelect('belong.character', 'character')
                .where('belong.idOrganization = :id', {
                    id: organization.id,
                })
                .getMany()
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
                    leads!.idCharacter,
                    leads!.character.kind,
                ),
                new Headquarter(
                    new HeadquarterId(headquarter.id),
                    new HeadquarterName(headquarter.name),
                    new HeadquarterKind(headquarter.edificationType),
                    new HeadquarterPlace(headquarter.location, ''),
                ),
                new OrganizationFounder(organization.idFounder),
                new CreationPlace(organization.creationPlace),
                belong.map(
                    (e) =>
                        new Member(
                            new MemberId(e.idCharacter, e.character.kind),
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
            .createQueryBuilder('lead')
            .where('lead.idCharacter = :id', {
                id: id.value,
            })
            .getOne()
        return Boolean(data)
    }
}
