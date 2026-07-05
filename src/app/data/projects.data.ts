import { Project } from '../models/project.interface';

export const PROJECTS: Project[] = [
  {
    id: 'week-planner',
    title: 'WEEK PLANER',
    description:
      'Aplicación full-stack para la planificación semanal y la gestión de tareas. Implementa una arquitectura de microservicios con API Gateway, servicio de autenticación y servicio de tareas, utilizando Angular, Spring Boot y PostgreSQL.',
    techs: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Microservices'],
    image: 'assets/GymVirtual.jpg',
    viewUrl: '#',
    codeUrl: 'https://github.com/aejimenez19/WeekPlanner',
    detail:
      'Una planificación semanal full-stack integral que empodera a los usuarios para organizar tareas, establecer prioridades y rastrear el progreso de manera eficiente. El sistema cuenta con autenticación segura de usuarios, operaciones completas de CRUD de tareas y un frontend Angular responsive impulsado por un backend Spring Boot con persistencia en PostgreSQL.',
    challenge:
      'Diseñar una arquitectura de microservicios con un API Gateway para coordinar servicios de autenticación y gestión de tareas seguros, manteniendo la consistencia de datos y la comunicación perfecta a través de servicios distribuidos.',
    bestPractices: [
      'principios SOLID',
      'Diseño de API RESTful',
      'Autenticación con JWT',
      'Patrón de microservicios',
      'Diseño responsive con Angular',
    ],
  },
];
