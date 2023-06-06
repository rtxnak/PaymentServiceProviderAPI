import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NewUserDTO } from './dto/new-user.dto';
import { UserService } from './user.service';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

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
}
