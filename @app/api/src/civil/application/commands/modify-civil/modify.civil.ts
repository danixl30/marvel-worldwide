import { ApplicationService } from 'src/core/application/service/application.service'
import { ModifyCivilDTO } from './types/dto'
import { ApplicationError } from 'src/core/application/error/application.error'
import { CivilRepository } from '../../repositories/civil.repository'
import { EventHandler } from 'src/core/application/event-handler/event.handler'
import { Result } from 'src/core/application/result-handler/result.handler'
import { CivilId } from 'src/civil/domain/value-objects/id'
import { PersonName } from 'src/heroe/domain/entities/person/value-objects/name'
import { PersonGender } from 'src/heroe/domain/entities/person/value-objects/gender'
import { CivilRelationship } from 'src/civil/domain/value-objects/relationship'
import { MaritialStatus } from 'src/heroe/domain/entities/person/value-objects/maritial.status'
import { PersonEye } from 'src/heroe/domain/entities/person/value-objects/eyes'
import { Phrase } from 'src/heroe/domain/entities/person/value-objects/phrase'
import { CreateCivilResponse } from '../create-civil/types/response'
import { CivilNotFoundError } from '../../exceptions/civil.not.found'

export class ModifyCivilCommand
    implements
        ApplicationService<
            ModifyCivilDTO,
            CreateCivilResponse,
            ApplicationError
        >
{
    constructor(
        private readonly civilRepository: CivilRepository,
        private readonly eventHandler: EventHandler,
    ) {}

    async execute(
        data: ModifyCivilDTO,
    ): Promise<Result<CreateCivilResponse, ApplicationError>> {
        const civil = await this.civilRepository.getById(new CivilId(data.id))
        if (!civil) throw new CivilNotFoundError()
        if (data.relation) {
            civil?.changeRelationship(
                new CivilRelationship(data.relation.target, data.relation.kind),
            )
        }
        if (data.person?.eyesColor) {
            civil?.changeEyes(new PersonEye(data.person.eyesColor))
        }
        if (data.person?.gender) {
            civil?.changeGender(new PersonGender(data.person.gender))
        }
        if (data.person?.lastName) {
            civil?.changeName(
                new PersonName(
                    civil.person.name.firstName,
                    data.person.lastName,
                ),
            )
        }
        if (data.person?.name) {
            civil?.changeName(
                new PersonName(data.person.name, civil.person.name.lastName),
            )
        }
        if (data.person?.maritialStatus)
            civil.changeMaritialStatus(
                new MaritialStatus(data.person.maritialStatus),
            )
        if (data.person?.phrase)
            civil.changePhrase(new Phrase(data.person.phrase))
        await this.civilRepository.save(civil)
        this.eventHandler.publish(civil.pullEvents())
        return Result.success({
            id: civil.id.value,
        })
    }
}
