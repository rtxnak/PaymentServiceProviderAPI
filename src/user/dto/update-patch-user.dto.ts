import { PartialType } from '@nestjs/mapped-types';
import { NewUserDTO } from './new-user.dto';

export class UpdatePatchUserDto extends PartialType(NewUserDTO) {}
