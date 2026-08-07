import { Project } from '../models/project.interface';

export const PROJECTS: Project[] = [
  {
    id: 'mis-finanzas',
    title: 'MIS FINANZAS',
    category: 'Full-stack / Finanzas personales',
    description:
      'Aplicación full-stack para gestionar tus finanzas personales. Permite registrar ingresos y gastos del mes, compras a 1 cuota en tarjeta de crédito con acumulación del saldo pendiente, y registrar los pagos ya realizados. Muestra el saldo disponible y el gasto mensual en tiempo real. El backend es un monolito modular.',
    techs: ['Angular', 'Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JWT'],
    viewUrl: 'https://finanzas.aejimenez.online',
    codeUrl: 'https://github.com/aejimenez19/MisFinanzas',
  },
  {
    id: 'week-planner',
    title: 'PLANIFICADOR SEMANAL',
    description:
      'Aplicación full-stack para la planificación semanal y gestión de tareas. Implementa una arquitectura de microservicios con un API Gateway, un Servicio de Autenticación y un Servicio de Tareas, usando Angular, Spring Boot y PostgreSQL.',
    techs: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Microservicios'],
    image: 'assets/GymVirtual.jpg',
    category: 'Full-stack / Microservicios',
    viewUrl: '#',
    codeUrl: 'https://github.com/aejimenez19/WeekPlanner',
  }
];
