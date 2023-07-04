import { Role } from '../enums/role.enum';
import { NewUserDTO } from '../user/dto/new-user.dto';

export const userSeeds: NewUserDTO = {
  name: 'admin',
  email: 'admin@email.com',
  password: '$2b$10$k525EQpgcM3c5EGN.tBlfuHoBKg1pgTis1QudOrni.fy4pqKA0jwG', //'123456a!A'
  role: Role.Admin,
};
