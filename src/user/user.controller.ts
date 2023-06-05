import { Body, Controller, Post } from '@nestjs/common';
import { NewUserDTO } from './dto/new-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: NewUserDTO) {
    return this.userService.createNewUser(data);
  }
}
