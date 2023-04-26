import { ApplicationService } from 'src/core/application/service/application.service'
import { CreateCivilDTO } from './types/dto'
import { CreateCivilResponse } from './types/response'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CivilRepository } from '../../repositories/civil.repository'
import { UUIDGenerator } from 'src/core/application/UUID/UUID.generator'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { Civil } from 'src/civil/domain/civil'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { Person } from 'src/heroe/domain/entities/person/person'
import { PersonId } from 'src/heroe/domain/entities/person/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { CivilRelationship } from 'src/civil/domain/value-objects/relationship'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonHair } from 'src/heroe/domain/entities/person/value-objects/hair'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { PersonNationality } from 'src/heroe/domain/entities/person/value-objects/nationality'
import { PersonOccupation } from 'src/heroe/domain/entities/person/value-objects/occupation'
import { PersonNotFoundError } from '../../exceptions/person.not.found'

export class CreateCivilCommand implements ApplicationService<CreateCivilDTO, CreateCivilResponse, ApplicationError> {
    constructor(
        private readonly civilRepository: CivilRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly eventHandler: EventHandler,
    ) {}

    private createPersonByDTO(dto: CreateCivilDTO): Person {
        return new Person(
            new PersonId(this.uuidGenerator.generate()),
            new PersonName(dto.person!.name, dto.person!.lastName),
            new PersonGender(dto.person!.gender),
            new MaritialStatus(dto.person!.maritialStatus),
            new PersonHair(dto.person!.hairColor),
            new PersonEye(dto.person!.eyesColor),
            dto.person!.occupations.map((e) => new PersonOccupation(e)),
            dto.person!.nationalities.map((e) => new PersonNationality(e)),
        )
    }

    async execute(data: CreateCivilDTO): Promise<Result<CreateCivilResponse, ApplicationError>> {
        const person = data.personId ? await this.civilRepository.getPersonById(new PersonId(data.personId!)) : this.createPersonByDTO(data)
        if (!person) return Result.error(new PersonNotFoundError())
        const civil = new Civil(new CivilId(this.uuidGenerator.generate()), person, new CivilRelationship(data.relation.target, data.relation.kind))
        await this.civilRepository.save(civil)
        this.eventHandler.publish(civil.pullEvents())
        return Result.success({
            id: civil.id.value,
        })
    }
}
