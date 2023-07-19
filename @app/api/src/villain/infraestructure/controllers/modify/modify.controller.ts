import { ControllerContract } from 'src/core/infraestructure/controllers/controller-model/controller.contract'
import { CreateVillainResponse } from 'src/villain/application/commands/create/types/response'
import { VillainPostgresRepository } from '../../repositories/villain.postgres.repository'
import { ConcreteUUIDGenerator } from 'src/core/infraestructure/UUID/service/concrete.UUID.generator'
import { EventHandlerNative } from 'src/core/infraestructure/event-handler/native/service/event.hadler.native.service'
import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { VILLAIN_ROUTE, VILLAIN_TAG } from '../prefix'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Membresies } from 'src/user/infraestructure/metadata/membresy.metadata'
import { UserTypes } from 'src/user/model/user'
import { MembersyGuard } from 'src/user/infraestructure/guards/membresy.guard'
import { AuthCuard } from 'src/user/infraestructure/guards/auth.guard'
import { ModifyVillainDTO } from './dto/dto'
import { ModifyVillainCommand } from 'src/villain/application/commands/modify/modify.villain'

@Controller(VILLAIN_ROUTE)
@ApiTags(VILLAIN_TAG)
export class ModifyVillainController
    implements ControllerContract<ModifyVillainDTO, CreateVillainResponse>
{
    constructor(
        private villainRepository: VillainPostgresRepository,
        private uuidGen: ConcreteUUIDGenerator,
        private eventHandler: EventHandlerNative,
    ) {}

    @Put('modify')
    @ApiHeader({ name: 'auth' })
    @Membresies(UserTypes.VIP)
    @UseGuards(AuthCuard, MembersyGuard)
    async execute(
        @Body() data: ModifyVillainDTO,
    ): Promise<CreateVillainResponse> {
        const resp = await new ModifyVillainCommand(
            this.villainRepository,
            this.uuidGen,
            this.eventHandler,
        ).execute(data)
        return resp.unwrap()
    }
}
