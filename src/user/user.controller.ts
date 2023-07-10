import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NewUserDTO } from './dto/new-user.dto';
import { UserService } from './user.service';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ParamId } from '../decorators/param-id.decorator';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAndDeleteResponseDTO } from './dto/update-delete-response.dto';

@ApiTags('users')
@ApiBasicAuth('defaultBearerAuth')
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() data: NewUserDTO) {
    return this.userService.createNewUser(data);
  }

  @Get()
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  async list() {
    return this.userService.listAllUsers();
  }

  @Get(':id')
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async showOneById(@ParamId() id: number) {
    return this.userService.showOneUserById(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UpdateAndDeleteResponseDTO })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async update(@Body() data: UpdatePutUserDto, @ParamId() id: number) {
    return this.userService.updateUser(id, data);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateAndDeleteResponseDTO })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async updatePartial(@Body() data: UpdatePatchUserDto, @ParamId() id: number) {
    return this.userService.updatePartialUser(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UpdateAndDeleteResponseDTO })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async delete(@ParamId() id: number) {
    return this.userService.deleteUser(id);
  }
}
