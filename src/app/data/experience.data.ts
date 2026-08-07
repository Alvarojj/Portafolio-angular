import { Experience } from '../models/experience.interface';

export const EXPERIENCES: Experience[] = [
  {
    id: 'carvajal',
    period: 'Nov 2022 — Nov 2025',
    company: 'CARVAJAL TECNOLOGÍA & SERVICIOS',
    role: 'Professional Development Engineer',
    achievements: [
      'Desarrollé microservicios con Java y Spring Boot dentro de una arquitectura distribuida, procesando miles de órdenes de compra diarias entre grandes cadenas minoristas y proveedores.',
      'Diseñé e implementé APIs REST, incorporando paginación y filtros dinámicos para optimizar el acceso y manejo eficiente de datos.',
      'Optimicé consultas, reduciendo el tiempo de generación de reportes de varios minutos a menos de 3 segundos.',
    ],
  },
];
