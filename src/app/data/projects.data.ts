import { Project } from '../models/project.interface';

export const PROJECTS: Project[] = [
  {
  id: 'AJ-STUDIO-ecommerce',
  title: 'AJ STUDIO E-COMMERCE (En desarrollo)',
  description:
    'Plataforma e-commerce full-stack en desarrollo para una empresa de sublimación y productos personalizados. Diseñada con una arquitectura de microservicios utilizando API Gateway, autenticación centralizada y servicios independientes para la gestión del catálogo y los pedidos.',

  techs: [
    'Angular',
    'Java',
    'Spring Boot',
    'Spring Cloud',
    'PostgreSQL',
    'JWT',
    'Microservices'
  ],

  image: 'assets/aj-studio-ecommerce.jpg',

  viewUrl: '#',

  codeUrl: 'https://github.com/aejimenez19/aj-studio-ecommerce',

  detail:
    'Proyecto en desarrollo orientado a digitalizar el proceso de venta de una empresa de sublimación. La aplicación permitirá administrar productos, categorías y pedidos mediante una arquitectura de microservicios. Los clientes podrán explorar el catálogo, agregar productos al carrito y generar un pedido que será enviado automáticamente a WhatsApp para finalizar la compra con el negocio.',

  challenge:
    'Diseñar una solución escalable basada en microservicios, desacoplando la autenticación, el catálogo de productos y la gestión de pedidos mediante Spring Cloud, API Gateway y bases de datos independientes por servicio.',

  bestPractices: [
    {
      title: 'Arquitectura de Microservicios',
      description:
        'Separación de responsabilidades mediante servicios independientes con API Gateway, Eureka Server y Config Server.',
    },
    {
      title: 'Diseño Orientado al Dominio',
      description:
        'Modelado del dominio antes de la implementación para garantizar una correcta separación entre negocio e infraestructura.',
    },
    {
      title: 'API RESTful',
      description:
        'Diseño de endpoints siguiendo principios REST, utilizando DTOs, validaciones y manejo consistente de respuestas y errores.',
    },
    {
      title: 'Autenticación con JWT',
      description:
        'Protección de los servicios mediante Spring Security y autenticación basada en JSON Web Tokens.',
    },
  ],

  architectureImage: 'assets/aj-studio-architecture.png',

  architectureCaption:
    'Arquitectura basada en Spring Cloud con API Gateway, Eureka Server, Config Server y microservicios independientes para autenticación, catálogo y pedidos.',

  videoUrl: '#',
},
];
