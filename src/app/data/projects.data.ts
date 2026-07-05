import { Project } from '../models/project.interface';

export const PROJECTS: Project[] = [
  {
    id: 'week-planner',
    title: 'WEEK PLANER',
    description:
      'Full-stack application for weekly planning and task management. Implements a microservices architecture with an API Gateway, Authentication Service, and Task Service, using Angular, Spring Boot, and PostgreSQL.',
    techs: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Microservices'],
    image: 'assets/GymVirtual.jpg',
    viewUrl: '#',
    codeUrl: 'https://github.com/aejimenez19/WeekPlanner',
    detail:
      'A comprehensive full-stack weekly planner that empowers users to organize tasks, set priorities, and track progress efficiently. The system features secure user authentication, complete task CRUD operations, and a responsive Angular frontend powered by a Spring Boot backend with PostgreSQL persistence.',
    challenge:
      'Designing a microservices architecture with an API Gateway to coordinate secure authentication and task management services, while maintaining data consistency and seamless communication across distributed services.',
    bestPractices: [
      'SOLID Principles',
      'RESTful API Design',
      'JWT Authentication',
      'Microservices Pattern',
      'Responsive Design',
    ],
  },
];
