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
      {
        title: 'Principios SOLID',
        description:
          'Diseño orientado al dominio con separación clara entre lógica de negocio e infraestructura.',
      },
      {
        title: 'API RESTful',
        description:
          'Endpoints diseñados siguiendo los estándares REST con versionado y manejo de errores consistente.',
      },
      {
        title: 'JWT Seguro',
        description:
          'Tokens con expiración y renovación automática usando refresh tokens.',
      },
      {
        title: 'Patrón Gateway',
        description:
          'Punto único de entrada con balanceo de carga y ruteo inteligente a microservicios.',
      },
    ],
    architectureImage: 'assets/arquitecura del week planner.png',
    architectureCaption:
      'Diagrama que ilustra el flujo desde el API Gateway hasta la capa de persistencia de PostgreSQL.',
    videoUrl: '#',
  },
];
