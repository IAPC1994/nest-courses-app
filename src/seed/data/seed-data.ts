import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedCourse {
  title: string;
  description?: string;
  price?: number;
}

interface SeedData {
  users: SeedUser[];
  courses: SeedCourse[];
}

export const initialData: SeedData = {
  users: [
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
  ],
  courses: [
    {
      title: 'ReactJS zero to hero',
      description:
        'ReactJS course that start from the basic to advance level. Shared components, HOC, Hooks and more...',
      price: 200,
    },
    {
      title: 'VueJS zero to hero',
      description:
        'VueJS course that start from the basic to advance level. Shared components, composition API, Pinia and more...',
      price: 150,
    },
    {
      title: 'Java School',
      description:
        'Java course that start from the basic until large enterprise projects. Types, functions, inheritance, POO and more...',
      price: 250,
    },
    {
      title: 'Angular 20, The evolution of Google Framework',
      description:
        'Angular course that start using the new version of Angular. Types, functions, inheritance, POO, new conditionals and more...',
      price: 300,
    },
  ],
};
