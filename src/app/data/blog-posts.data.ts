import { BlogPost } from '../models/blog-post.interface';

export const BLOG_TAGS = ['#All', '#Java', '#SpringBoot', '#Architecture', '#Security', '#PostgreSQL'] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'migrando-monolito-distribuido-arquitectura-modular-limpia',
    title: 'Migrando de un Monolito Distribuido a una Arquitectura Modular Limpia',
    description:
      'Un análisis profundo de los problemas de latencia introducidos por microservicios granulares y cómo la consolidación en un monolito modular con Spring Boot 3 mejoró el rendimiento en un 40%.',
    date: 'Octubre 24, 2024',
    tags: ['#Architecture', '#SpringBoot'],
  },
  {
    id: '2',
    slug: 'estrategias-cache-distribuida-redis-jpa',
    title: 'Estrategias de Caché Distribuida con Redis y JPA',
    description:
      'Cómo implementar patrones de cache-aside efectivos para reducir la carga de PostgreSQL en consultas complejas de lectura intensiva, manteniendo la consistencia eventual.',
    date: 'Septiembre 12, 2024',
    tags: ['#Java', '#PostgreSQL'],
  },
  {
    id: '3',
    slug: 'asegurando-apis-rest-mas-alla-de-jwt',
    title: 'Asegurando APIs REST: Más allá de JWT',
    description:
      'Por qué los JWT sin estado pueden ser peligrosos si no se manejan correctamente. Explorando la implementación de listas de revocación y tokens de referencia en entornos de alta seguridad.',
    date: 'Agosto 05, 2024',
    tags: ['#Security', '#Architecture'],
  },
  {
    id: '4',
    slug: 'patron-saga-microservicios-kafka',
    title: 'Patrón Saga en Microservicios con Kafka',
    description:
      'Implementación del patrón Saga coreografiado usando Apache Kafka para mantener la consistencia de datos en transacciones distribuidas sin acoplar servicios.',
    date: 'Julio 18, 2024',
    tags: ['#SpringBoot', '#Architecture'],
  },
  {
    id: '5',
    slug: 'optimizacion-consultas-sql-indices-compuestos',
    title: 'Optimización de Consultas SQL con Índices Compuestos',
    description:
      'Guía práctica para diseñar índices compuestos en PostgreSQL que reducen el tiempo de consulta de segundos a milisegundos en tablas con millones de registros.',
    date: 'Junio 30, 2024',
    tags: ['#PostgreSQL'],
  },
  {
    id: '6',
    slug: 'dockerizacion-eficiente-spring-boot',
    title: 'Dockerización Eficiente para Aplicaciones Spring Boot',
    description:
      'Técnicas para crear imágenes Docker optimizadas con capas eficientes, reduciendo el tamaño del artefacto final y acelerando los tiempos de construcción en CI/CD.',
    date: 'Junio 02, 2024',
    tags: ['#SpringBoot', '#Java'],
  },
  {
    id: '7',
    slug: 'pruebas-integracion-testcontainers',
    title: 'Pruebas de Integración con Testcontainers',
    description:
      'Cómo integrar Testcontainers en un pipeline de pruebas para validar la interacción real con PostgreSQL, Redis y Kafka sin depender de entornos externos.',
    date: 'Mayo 10, 2024',
    tags: ['#Java', '#SpringBoot'],
  },
  {
    id: '8',
    slug: 'manejo-errores-apis-rest-spring-boot',
    title: 'Manejo de Errores en APIs REST con Spring Boot',
    description:
      'Implementación de un manejador global de excepciones que devuelve respuestas consistentes y semánticamente correctas siguiendo el estándar RFC 7807.',
    date: 'Abril 22, 2024',
    tags: ['#SpringBoot', '#Java'],
  },
];
