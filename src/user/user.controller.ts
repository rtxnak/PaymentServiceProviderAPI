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

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: NewUserDTO) {
    return this.userService.createNewUser(data);
  }

  @Get()
  async list() {
    return this.userService.listAllUsers();
  }

  @Get(':id')
  async showOneById(@ParamId() id: number) {
    return this.userService.showOneUserById(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDto, @ParamId() id: number) {
    return this.userService.updateUser(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDto, @ParamId() id: number) {
    return this.userService.updatePartialUser(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.deleteUser(id);
  }
}
