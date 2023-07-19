import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateCombatReponse } from 'src/combat/application/commands/create/types/response'
import { CombatPostgresRepository } from '../../repository/combat.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { COMBAT_ROUTE, COMBAT_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { ModifyCombatDTO } from './dto/dto'
import { ModifyCombatCommand } from 'src/combat/application/commands/modify/modify.combat'

@Controller(COMBAT_ROUTE)
@ApiTags(COMBAT_TAG)
export class ModifyCombatController
    implements ControllerContract<ModifyCombatDTO, CreateCombatReponse>
{
    constructor(
        private combatRepository: CombatPostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(@Body() data: ModifyCombatDTO): Promise<CreateCombatReponse> {
        const resp = await new ModifyCombatCommand(
            this.combatRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
