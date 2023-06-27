import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { NewUserDTO } from './dto/new-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

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
    throw new NotFoundException('Usuário não encontrado');
  }

  async updateUser(id: number, data: UpdatePutUserDto) {
    if (
      await this.usersRepository.exist({
        where: {
          id,
        },
      })
    ) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);

      await this.usersRepository.update(id, data);
      return { success: true };
    }
    throw new NotFoundException('Usuário não encontrado');
  }

  async updatePartialUser(id: number, data: UpdatePatchUserDto) {
    if (
      await this.usersRepository.exist({
        where: {
          id,
        },
      })
    ) {
      if (data.password) {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
      }
      await this.usersRepository.update(id, data);
      return { success: true };
    }
    throw new NotFoundException('Usuário não encontrado');
  }

  async deleteUser(id: number) {
    if (
      await this.usersRepository.exist({
        where: {
          id,
        },
      })
    ) {
      await this.usersRepository.delete(id);
      return { success: true };
    }
    throw new NotFoundException('Usuário não encontrado');
  }
}
