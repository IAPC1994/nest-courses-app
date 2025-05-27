import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

export const initialUsers: SeedUser[] = [
  {
    email: 'test1@gmail.com',
    fullName: 'Test One',
    password: bcrypt.hashSync('Abc123', 10),
    roles: ['admin'],
  },
  {
    email: 'test2@gmail.com',
    fullName: 'Test Two',
    password: bcrypt.hashSync('Abc123', 10),
    roles: ['user'],
  },
];
