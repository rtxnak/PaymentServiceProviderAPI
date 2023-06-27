import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: '$2b$10$PLVDm6KtM7vliJ0yt7i8s.EuAIQy4oaeO5yApcwdNV29q4tJGg9P2',
    role: 2,
  },
  {
    id: 2,
    name: 'Mario Bros',
    email: 'mario@email.com',
    password: '$2b$10$PLVDm6KtM7vliJ0yt7i8s.EuAIQy4oaeO5yApcwdNV29q4tJGg9P2',
    role: 1,
  },
  {
    id: 3,
    name: 'Ash Ketium',
    email: 'ashket@email.com',
    password: '$2b$10$PLVDm6KtM7vliJ0yt7i8s.EuAIQy4oaeO5yApcwdNV29q4tJGg9P2',
    role: 3,
  },
];
