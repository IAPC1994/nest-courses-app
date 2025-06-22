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
      title: 'VueJS from Scratch',
      description:
        'VueJS course from beginner to advanced. Composition API, Pinia, and single file components explained.',
      price: 180,
    },
    {
      title: 'Angular Complete Guide',
      description:
        'Master Angular from fundamentals to advanced concepts like RxJS, state management and SSR.',
      price: 220,
    },
    {
      title: 'TypeScript Mastery',
      description:
        'Understand types, generics, decorators, and use TypeScript with React, Node, and more.',
      price: 160,
    },
    {
      title: 'NestJS Fundamentals',
      description:
        'Learn how to build powerful APIs using NestJS, including authentication, TypeORM, and guards.',
      price: 210,
    },
    {
      title: 'Next.js Fullstack Bootcamp',
      description:
        'Build fullstack apps with Next.js, API routes, middleware, authentication and deployment.',
      price: 250,
    },
    {
      title: 'Node.js Backend Essentials',
      description:
        'Backend fundamentals with Node.js, Express, REST APIs, middleware, and MongoDB.',
      price: 190,
    },
    {
      title: 'Fullstack GraphQL',
      description:
        'Use GraphQL with Apollo Server and Client. End-to-end fullstack app integration.',
      price: 230,
    },
    {
      title: 'Modern CSS & Tailwind',
      description:
        'Design beautiful interfaces with TailwindCSS and advanced responsive design techniques.',
      price: 140,
    },
    {
      title: 'Git & GitHub Pro',
      description:
        'Master Git branching, rebasing, stashing and GitHub collaboration workflows.',
      price: 100,
    },
    {
      title: 'Docker & Kubernetes 101',
      description:
        'Understand Docker, Docker Compose, and deploy scalable apps with Kubernetes.',
      price: 240,
    },
    {
      title: 'Python for Developers',
      description:
        'Python crash course focusing on scripting, OOP, and using Flask for web APIs.',
      price: 170,
    },
    {
      title: 'SQL and Relational Databases',
      description:
        'Learn SQL queries, joins, indexing, normalization and ER modeling for real-world apps.',
      price: 150,
    },
    {
      title: 'Java Fundamentals',
      description:
        'Object-oriented programming with Java, inheritance, interfaces, streams and Spring basics.',
      price: 200,
    },
    {
      title: 'Testing with Jest',
      description:
        'Write unit and integration tests using Jest, mocking techniques and code coverage tools.',
      price: 130,
    },
  ],
};
