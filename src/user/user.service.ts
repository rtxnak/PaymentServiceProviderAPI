import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { NewUserDTO } from './dto/new-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createNewUser(data: NewUserDTO) {
    if (
      await this.usersRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Email já existente');
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async listAllUsers() {
    return this.usersRepository.find();
  }

  async showOneUserById(id: number) {
    if (
      await this.usersRepository.exist({
        where: {
          id,
        },
      })
    ) {
      return this.usersRepository.findOne({
        where: {
          id,
        },
      });
    }
    throw new BadRequestException('Usuário não encontrado');
  }
}
