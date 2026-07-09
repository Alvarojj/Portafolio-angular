import { BlogPost } from '../models/blog-post.interface';

export const BLOG_TAGS = ['#All', '#Java', '#SpringBoot', '#Architecture', '#Security', '#PostgreSQL'] as const;

export const BLOG_POSTS: BlogPost[] = [
  /*{
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
    content: [
      {
        type: 'paragraph',
        content:
          'La adopción masiva de JWT como mecanismo de autenticación en APIs REST ha traído consigo una falsa sensación de seguridad. Si bien los tokens JWT permiten construir sistemas sin estado y escalables horizontalmente, su naturaleza inherentemente no revocable introduce riesgos de seguridad que muchas implementaciones pasan por alto.',
      },
      {
        type: 'paragraph',
        content:
          'En este artículo exploramos las vulnerabilidades más comunes en implementaciones de JWT y las estrategias para mitigarlas, incluyendo listas de revocación, tokens de referencia, y rotación de claves.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'El Problema de la No Revocación',
      },
      {
        type: 'paragraph',
        content:
          'Un token JWT, una vez emitido, es válido hasta su fecha de expiración. No hay forma de invalidarlo antes de tiempo sin mantener estado en el servidor —lo que precisamente buscábamos evitar. Esto significa que si un token es robado o filtrado, el atacante puede utilizarlo hasta que expire.',
      },
      {
        type: 'list',
        items: [
          '<strong>Tokens de larga duración:</strong> Incrementan la ventana de exposición ante un robo. Lo recomendable es usar expiración corta (15-30 minutos).',
          '<strong>Refresh tokens:</strong> Deben ser almacenados de forma segura (HttpOnly, Secure, SameSite) y rotados en cada uso.',
          '<strong>Listas de revocación:</strong> Una alternativa pragmática es mantener una lista negra en Redis con los jti (JWT ID) revocados antes de su expiración.',
        ],
      },
      {
        type: 'blockquote',
        content:
          '"La seguridad no es un producto, sino un proceso. Los JWT sin estado son convenientes, pero la conveniencia nunca debe sacrificar la capacidad de respuesta ante incidentes de seguridad."',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Implementando Revocación con una Blacklist en Redis',
      },
      {
        type: 'paragraph',
        content:
          'La solución más equilibrada entre rendimiento y seguridad consiste en mantener una lista de revocación efímera en Redis. Al hacer logout o detectar un posible compromiso, el jti del token se agrega a Redis con un TTL igual al tiempo restante del token. De esta forma, solo los tokens recientemente revocados requieren consulta a Redis.',
      },
      {
        type: 'code',
        filename: 'JwtAuthenticationFilter.java',
        language: 'java',
        code:
          '@Component\npublic class JwtAuthenticationFilter extends OncePerRequestFilter {\n\n    private final JwtTokenProvider tokenProvider;\n    private final RedisTemplate<String, String> redisTemplate;\n\n    @Override\n    protected void doFilterInternal(HttpServletRequest request,\n                                    HttpServletResponse response,\n                                    FilterChain filterChain)\n            throws ServletException, IOException {\n\n        String token = extractToken(request);\n\n        if (token != null) {\n            String jti = tokenProvider.getJti(token);\n\n            if (redisTemplate.hasKey(\"blacklist:\" + jti)) {\n                response.setStatus(HttpStatus.UNAUTHORIZED.value());\n                return;\n            }\n\n            if (tokenProvider.validateToken(token)) {\n                Authentication auth = tokenProvider.getAuthentication(token);\n                SecurityContextHolder.getContext().setAuthentication(auth);\n            }\n        }\n\n        filterChain.doFilter(request, response);\n    }\n}',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Rotación de Claves y JwkSet',
      },
      {
        type: 'paragraph',
        content:
          'Para entornos de alta seguridad, la rotación periódica de claves de firma es esencial. Implementar un JWK Set (JWKS) endpoint permite a los clientes obtener la clave pública actual para verificar la firma, mientras el servidor rota las claves privadas sin interrumpir el servicio.',
      },
      {
        type: 'code',
        filename: 'JwkConfig.java',
        language: 'java',
        code:
          '@Configuration\npublic class JwkConfig {\n\n    @Bean\n    public JWKSource<SecurityContext> jwkSource() {\n        RSAKey rsaKey = new RSAKey.Builder(publicKey)\n                .privateKey(privateKey)\n                .keyID(UUID.randomUUID().toString())\n                .build();\n\n        JWKSet jwkSet = new JWKSet(rsaKey);\n        return new ImmutableJWKSet<>(jwkSet);\n    }\n\n    @Bean\n    public NimbusJwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {\n        return NimbusJwtDecoder.withJwkSource(jwkSource).build();\n    }\n}',
      },
      {
        type: 'blockquote',
        content:
          '"La rotación de claves no es opcional. Es un pilar fundamental de cualquier estrategia de seguridad que aspire a ser robusta. Rotar las claves cada 90 días debería ser el mínimo aceptable."',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Conclusión',
      },
      {
        type: 'paragraph',
        content:
          'Los JWT son una herramienta poderosa, pero no son una bala de plata. La seguridad de una API REST no depende exclusivamente del formato del token, sino de todo el ecosistema que lo rodea: políticas de expiración, mecanismos de revocación, rotación de claves, y almacenamiento seguro de tokens del lado del cliente.',
      },
      {
        type: 'paragraph',
        content:
          'Implementar estas capas adicionales de seguridad transforma una API vulnerable en un sistema robusto, preparado para enfrentar amenazas reales en entornos de producción.',
      },
    ],
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
  },*/
  {
  id: '9',
  slug: 'construyendo-laboratorio-microservicios-spring-boot',
  title: 'Construyendo un Laboratorio de Microservicios con Spring Boot',
  description:
    'Por qué decidí construir un laboratorio incremental para comprender la arquitectura de microservicios desde sus fundamentos, utilizando Spring Boot y Spring Cloud como base para experimentar con patrones, herramientas y buenas prácticas.',
  date: 'Junio 30, 2026',
  tags: ['#SpringBoot', '#Microservices', '#SpringCloud'],
  content: [
    {
      type: 'paragraph',
      content:
        'Cuando comencé a estudiar arquitecturas basadas en microservicios encontré un problema recurrente: la mayoría de los ejemplos disponibles eran demasiado simples para comprender cómo interactúan realmente los componentes de una arquitectura distribuida, mientras que los proyectos de producción incorporaban tantas tecnologías al mismo tiempo que resultaba difícil identificar la responsabilidad de cada una. En ambos casos el aprendizaje terminaba siendo superficial.',
    },
    {
      type: 'paragraph',
      content:
        'En lugar de construir una aplicación de negocio desde el primer día, decidí crear un laboratorio técnico cuyo único propósito fuera experimentar. La idea era avanzar de forma incremental, incorporando un componente a la vez y entendiendo el problema que resuelve antes de añadir el siguiente. De esta forma, cada decisión de arquitectura tendría un motivo claro y sería posible observar cómo evoluciona el sistema conforme aumenta su complejidad.',
    },
    {
      type: 'blockquote',
      content:
        '"Aprender arquitectura no consiste en utilizar muchas herramientas al mismo tiempo, sino en comprender por qué existe cada una y qué problema resuelve dentro del sistema."',
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Por qué crear un laboratorio y no un proyecto de negocio?',
    },
    {
      type: 'paragraph',
      content:
        'Los proyectos reales suelen incorporar reglas de negocio, bases de datos, autenticación, interfaces gráficas y múltiples integraciones externas desde las primeras etapas. Aunque esto representa escenarios muy cercanos a producción, también introduce una gran cantidad de variables que dificultan comprender la arquitectura por sí misma.',
    },
    {
      type: 'paragraph',
      content:
        'Un laboratorio elimina esa complejidad innecesaria y permite enfocarse exclusivamente en la infraestructura que sostiene una arquitectura distribuida. En este caso, el objetivo inicial no era desarrollar funcionalidades complejas, sino comprender cómo los servicios descubren su ubicación, cómo se comunican, cómo centralizar el acceso y, posteriormente, cómo proteger los recursos expuestos.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Objetivos del laboratorio',
    },
    {
      type: 'list',
      items: [
        '<strong>Comprender Service Discovery:</strong> Analizar cómo los servicios pueden registrarse y descubrirse automáticamente mediante Eureka.',
        '<strong>Centralizar el acceso:</strong> Incorporar un API Gateway como punto único de entrada para todas las solicitudes.',
        '<strong>Explorar seguridad:</strong> Implementar autenticación y autorización directamente en el Gateway antes de llegar a los microservicios.',
        '<strong>Construir una arquitectura evolutiva:</strong> Agregar nuevos componentes de forma incremental sin modificar la estructura existente.',
        '<strong>Documentar el aprendizaje:</strong> Registrar cada decisión de arquitectura para comprender no solo cómo implementar una tecnología, sino cuándo utilizarla.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Arquitectura inicial',
    },
    {
      type: 'paragraph',
      content:
        'La primera versión del laboratorio fue diseñada deliberadamente pequeña. En lugar de construir múltiples servicios con lógica de negocio compleja, cada microservicio expone únicamente un endpoint sencillo. Esto permite concentrar toda la atención en la infraestructura que soporta la arquitectura.',
    },
    {
      type: 'code',
      filename: 'Arquitectura Inicial',
      language: 'text',
      code:
`                Cliente
                    │
                    ▼
          Spring Cloud Gateway
                    │
                    ▼
             Eureka Server
               ↙         ↘
        Service A     Service B`,
    },
    {
      type: 'paragraph',
      content:
        'Aunque los servicios únicamente responden con un mensaje de prueba, representan nodos completamente independientes que se registran en Eureka y pueden ser consumidos a través del API Gateway. Esta base permitirá incorporar nuevas capacidades sin modificar la estructura principal del sistema.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Tecnologías utilizadas',
    },
    {
      type: 'list',
      items: [
        '<strong>Java 21:</strong> Lenguaje principal del laboratorio.',
        '<strong>Spring Boot:</strong> Framework para la construcción de cada microservicio.',
        '<strong>Spring Cloud:</strong> Ecosistema utilizado para Service Discovery y API Gateway.',
        '<strong>Eureka Server:</strong> Registro y descubrimiento automático de servicios.',
        '<strong>Spring Cloud Gateway:</strong> Punto único de entrada para todas las peticiones.',
        '<strong>Maven Multi Module:</strong> Organización del laboratorio mediante un proyecto padre y módulos independientes.',
        '<strong>GitHub:</strong> Control de versiones y evolución pública del laboratorio.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Una arquitectura pensada para evolucionar',
    },
    {
      type: 'paragraph',
      content:
        'Desde el inicio el laboratorio fue concebido como una plataforma de experimentación. La arquitectura no pretende permanecer estática, sino servir como base para incorporar gradualmente nuevas tecnologías del ecosistema Spring sin necesidad de reconstruir el proyecto desde cero.',
    },
    {
      type: 'list',
      items: [
        'Spring Security para proteger el Gateway.',
        'JWT y Refresh Tokens.',
        'Docker y Docker Compose.',
        'OpenFeign para comunicación entre servicios.',
        'Spring Cloud Config.',
        'Resilience4j.',
        'RabbitMQ y Kafka.',
        'Observabilidad.',
        'Kubernetes.',
      ],
    },
    {
      type: 'blockquote',
      content:
        '"Una buena arquitectura no es aquella que incorpora muchas tecnologías, sino la que permite incorporar nuevas capacidades sin reescribir las existentes."',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Conclusión',
    },
    {
      type: 'paragraph',
      content:
        'Construir este laboratorio confirmó una idea que suele pasar desapercibida: comprender una arquitectura distribuida depende mucho más de entender la responsabilidad de cada componente que de la cantidad de microservicios existentes. Al avanzar de manera incremental es posible observar cómo cada nueva tecnología resuelve un problema específico y cómo todas terminan trabajando juntas como parte de un mismo sistema.',
    },
    {
      type: 'paragraph',
      content:
        'En el siguiente artículo de esta serie profundizaré en una de las primeras decisiones de diseño del laboratorio: organizar todos los componentes mediante un monorepo con Maven Multi Module, analizando las ventajas, limitaciones y los escenarios en los que esta estrategia resulta una buena elección.',
    },
  ],
  },
  {
  id: '10',
  slug: 'monorepo-vs-multirepo-microservicios-maven',
  title: 'Monorepo vs Multirepo: Organizando Microservicios con Maven',
  description:
    'Analizando las ventajas y limitaciones de utilizar un monorepo con Maven Multi Module para construir una arquitectura de microservicios, y por qué decidí adoptar este enfoque durante las primeras etapas de mi laboratorio.',
  date: 'Julio 02, 2026',
  tags: ['#Architecture', '#Maven', '#SpringBoot'],
  content: [
    {
      type: 'paragraph',
      content:
        'Una de las primeras decisiones que aparece al comenzar una arquitectura basada en microservicios no tiene relación con Spring Boot, Docker o Kubernetes. Antes incluso de escribir el primer endpoint, es necesario decidir cómo se organizará el código fuente. ¿Debe cada microservicio vivir en un repositorio independiente o es mejor centralizar todo en un único repositorio? La respuesta depende del contexto del proyecto, del tamaño del equipo y del objetivo que persiga la arquitectura.',
    },
    {
      type: 'paragraph',
      content:
        'En el caso de este laboratorio opté por un monorepo utilizando Maven Multi Module. El objetivo no era replicar exactamente una arquitectura de producción, sino construir un entorno de aprendizaje que pudiera evolucionar gradualmente sin aumentar innecesariamente la complejidad operativa.',
    },
    {
      type: 'blockquote',
      content:
        '"La estructura de un proyecto también es una decisión de arquitectura. Una mala organización puede convertirse en un obstáculo incluso antes de escribir la lógica de negocio."',
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Qué es un Monorepo?',
    },
    {
      type: 'paragraph',
      content:
        'Un monorepo consiste en mantener múltiples proyectos relacionados dentro de un único repositorio. En una arquitectura de microservicios esto significa que cada servicio continúa siendo independiente desde el punto de vista de ejecución, pero comparte un mismo historial de versiones y una estructura común de construcción.',
    },
    {
      type: 'code',
      filename: 'Estructura del proyecto',
      language: 'text',
      code:
`spring-microservice-lab
│
├── pom.xml
├── discovery-server
├── gateway-service
├── service-a
└── service-b`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'El papel del POM Padre',
    },
    {
      type: 'paragraph',
      content:
        'Maven Multi Module permite centralizar configuraciones comunes dentro de un proyecto padre. Gracias a esto, cada módulo hereda versiones, plugins y dependencias compartidas, reduciendo considerablemente la duplicación de configuración.',
    },
    {
      type: 'code',
      filename: 'pom.xml',
      language: 'xml',
      code:
`<modules>
    <module>discovery-server</module>
    <module>gateway-service</module>
    <module>service-a</module>
    <module>service-b</module>
</modules>`,
    },
    {
      type: 'paragraph',
      content:
        'Esta estructura facilita mantener una única versión de Spring Boot, del ecosistema Spring Cloud y de los plugins de compilación, evitando inconsistencias entre los diferentes servicios.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Ventajas de un Monorepo durante las primeras etapas',
    },
    {
      type: 'list',
      items: [
        '<strong>Configuración centralizada:</strong> Una sola ubicación para administrar versiones y plugins.',
        '<strong>Menor duplicación:</strong> Los módulos comparten configuración sin necesidad de copiar archivos.',
        '<strong>Evolución coordinada:</strong> Actualizar una dependencia impacta todos los servicios de forma controlada.',
        '<strong>Mayor productividad:</strong> Resulta más sencillo trabajar cuando el número de servicios todavía es reducido.',
        '<strong>Visión completa de la arquitectura:</strong> Todos los componentes permanecen organizados dentro del mismo proyecto.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Tiene desventajas?',
    },
    {
      type: 'paragraph',
      content:
        'Como cualquier decisión de arquitectura, un monorepo también presenta limitaciones. A medida que el número de equipos, servicios y despliegues independientes aumenta, el repositorio puede crecer significativamente y hacer más compleja la coordinación entre desarrolladores.',
    },
    {
      type: 'list',
      items: [
        'Incremento del tiempo de construcción en proyectos muy grandes.',
        'Mayor cantidad de cambios concurrentes sobre el mismo repositorio.',
        'Pipelines de integración continua más complejos.',
        'Necesidad de definir claramente qué módulos deben construirse en cada cambio.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Cuándo elegir un Multirepo?',
    },
    {
      type: 'paragraph',
      content:
        'En organizaciones donde múltiples equipos mantienen servicios completamente independientes, un repositorio por microservicio suele facilitar la autonomía de los equipos y permite ciclos de despliegue desacoplados. Este enfoque es habitual en arquitecturas de gran escala donde cada servicio evoluciona de manera prácticamente independiente.',
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Por qué elegí un Monorepo para este laboratorio?',
    },
    {
      type: 'paragraph',
      content:
        'El propósito de este proyecto es aprender arquitectura, no gestionar decenas de repositorios. Centralizar todos los componentes me permite concentrarme en comprender cómo interactúan Eureka, Spring Cloud Gateway, Spring Security y los demás componentes que iré incorporando en las siguientes etapas. Una vez consolidados estos conceptos, será mucho más sencillo experimentar con estrategias de organización más complejas.',
    },
    {
      type: 'blockquote',
      content:
        '"La mejor decisión de arquitectura no siempre es la más sofisticada, sino la que mejor responde al problema que intentas resolver en este momento."',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Conclusión',
    },
    {
      type: 'paragraph',
      content:
        'Elegir entre un monorepo y un multirepo no es una cuestión de cuál opción es mejor, sino de cuál se adapta mejor al contexto. Para este laboratorio, Maven Multi Module proporciona una estructura organizada, consistente y fácil de mantener, permitiendo que el foco permanezca en comprender los componentes de una arquitectura distribuida en lugar de invertir tiempo administrando múltiples repositorios.',
    },
    {
      type: 'paragraph',
      content:
        'En el próximo artículo profundizaré en uno de los pilares de cualquier arquitectura basada en microservicios: el Service Discovery. Analizaré cómo Eureka permite que los servicios se registren automáticamente y elimina la necesidad de conocer direcciones IP o puertos para establecer comunicación entre ellos.',
    },
  ],
  },
  {
  id: '11',
  slug: 'service-discovery-eureka-spring-cloud',
  title: 'Service Discovery con Eureka: Eliminando el Acoplamiento entre Microservicios',
  description:
    'Cómo Spring Cloud Eureka permite que los microservicios se registren y descubran automáticamente, eliminando la necesidad de configurar direcciones IP y puertos de forma manual en arquitecturas distribuidas.',
  date: 'Julio 04, 2026',
  tags: ['#SpringCloud', '#Microservices', '#Architecture'],
  content: [
    {
      type: 'paragraph',
      content:
        'Una de las primeras dificultades que aparecen al construir una arquitectura basada en microservicios es la comunicación entre servicios. Mientras un sistema está compuesto por dos o tres aplicaciones, utilizar direcciones IP y puertos fijos puede parecer una solución suficiente. Sin embargo, esa estrategia deja de ser viable cuando los servicios comienzan a escalar, cambian de instancia o son desplegados dinámicamente en diferentes entornos.',
    },
    {
      type: 'paragraph',
      content:
        'Durante el desarrollo de este laboratorio me encontré exactamente con este problema. Necesitaba que el API Gateway pudiera localizar los microservicios sin depender de una dirección específica. La solución fue incorporar un componente de Service Discovery utilizando Spring Cloud Eureka.',
    },
    {
      type: 'blockquote',
      content:
        '"En una arquitectura distribuida, conocer la ubicación física de un servicio genera un acoplamiento innecesario. Lo importante no es dónde está un servicio, sino cómo encontrarlo cuando se necesita."',
    },
    {
      type: 'heading',
      level: 2,
      content: 'El problema del direccionamiento estático',
    },
    {
      type: 'paragraph',
      content:
        'Supongamos una arquitectura donde un Gateway necesita consumir un microservicio de usuarios. La solución más sencilla consiste en configurar la URL directamente dentro del Gateway.',
    },
    {
      type: 'code',
      filename: 'Gateway Configuration',
      language: 'yaml',
      code:
`spring:
  cloud:
    gateway:
      routes:
        - id: service-a
          uri: http://localhost:8081`,
    },
    {
      type: 'paragraph',
      content:
        'Aunque este enfoque funciona durante el desarrollo, introduce varios problemas. Si el servicio cambia de puerto, se despliega en otra máquina o existen múltiples instancias ejecutándose al mismo tiempo, será necesario modificar la configuración del Gateway. Esto crea un fuerte acoplamiento entre los componentes.',
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Qué es Service Discovery?',
    },
    {
      type: 'paragraph',
      content:
        'Service Discovery es un patrón arquitectónico que permite a los servicios registrarse automáticamente en un registro centralizado para que otros componentes puedan localizarlos mediante un nombre lógico en lugar de una dirección IP.',
    },
    {
      type: 'paragraph',
      content:
        'En el ecosistema Spring Cloud, Eureka actúa precisamente como ese registro central. Cada microservicio informa su existencia al iniciar y envía periódicamente señales de vida para indicar que continúa disponible.',
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Cómo funciona Eureka?',
    },
    {
      type: 'code',
      filename: 'Arquitectura',
      language: 'text',
      code:
`              Cliente
                  │
                  ▼
         Spring Cloud Gateway
                  │
                  ▼
            Eureka Server
           ↙             ↘
     Service A      Service B`,
    },
    {
      type: 'paragraph',
      content:
        'Cuando un microservicio inicia, registra automáticamente su nombre, dirección y puerto dentro de Eureka. Posteriormente envía heartbeats periódicos para indicar que continúa disponible. Si estos mensajes dejan de recibirse durante un tiempo determinado, Eureka elimina la instancia del registro para evitar que otros componentes intenten comunicarse con un servicio que ya no existe.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Registro automático de servicios',
    },
    {
      type: 'paragraph',
      content:
        'Una de las mayores ventajas de Eureka es que elimina la necesidad de registrar manualmente cada nuevo servicio. Basta con configurar el cliente de Eureka y definir el nombre de la aplicación.',
    },
    {
      type: 'code',
      filename: 'application.yml',
      language: 'yaml',
      code:
`spring:
  application:
    name: service-a

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka`,
    },
    {
      type: 'paragraph',
      content:
        'A partir de este momento el servicio aparecerá automáticamente en el dashboard de Eureka y podrá ser descubierto por otros componentes de la arquitectura.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Integración con Spring Cloud Gateway',
    },
    {
      type: 'paragraph',
      content:
        'La verdadera ventaja aparece cuando el Gateway deja de conocer direcciones físicas y comienza a trabajar únicamente con nombres de servicio. En lugar de consumir una URL fija, puede resolver dinámicamente la ubicación del servicio consultando Eureka.',
    },
    {
      type: 'code',
      filename: 'Gateway Route',
      language: 'yaml',
      code:
`spring:
  cloud:
    gateway:
      routes:
        - id: service-a
          uri: lb://SERVICEA`,
    },
    {
      type: 'paragraph',
      content:
        'El prefijo "lb://" indica que la dirección será resuelta utilizando el mecanismo de descubrimiento de servicios. Esto permite agregar nuevas instancias sin modificar la configuración del Gateway.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Beneficios obtenidos en el laboratorio',
    },
    {
      type: 'list',
      items: [
        '<strong>Desacoplamiento:</strong> El Gateway ya no necesita conocer direcciones IP específicas.',
        '<strong>Mayor flexibilidad:</strong> Los servicios pueden cambiar de puerto sin afectar a los consumidores.',
        '<strong>Escalabilidad:</strong> Es posible incorporar múltiples instancias del mismo servicio.',
        '<strong>Descubrimiento automático:</strong> Los nuevos servicios aparecen inmediatamente en el registro.',
        '<strong>Preparación para entornos distribuidos:</strong> La arquitectura puede evolucionar hacia escenarios mucho más complejos sin modificar su base.',
      ],
    },
    {
      type: 'blockquote',
      content:
        '"El verdadero valor de Eureka no está en registrar servicios, sino en eliminar el conocimiento que unos servicios tienen sobre la ubicación física de otros."',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Lecciones aprendidas',
    },
    {
      type: 'paragraph',
      content:
        'Antes de implementar Eureka veía el Service Discovery como un componente más dentro del ecosistema Spring Cloud. Sin embargo, después de integrarlo comprendí que representa uno de los pilares fundamentales de una arquitectura distribuida. Permite que los servicios evolucionen de forma independiente y prepara el sistema para escenarios donde las instancias cambian constantemente, como ocurre en plataformas basadas en contenedores.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Conclusión',
    },
    {
      type: 'paragraph',
      content:
        'Implementar Service Discovery permitió eliminar una de las principales fuentes de acoplamiento de la arquitectura: el conocimiento explícito de las direcciones de los servicios. A partir de este momento, el API Gateway puede localizar automáticamente cualquier microservicio registrado en Eureka utilizando únicamente su nombre lógico.',
    },
    {
      type: 'paragraph',
      content:
        'En el siguiente artículo de esta serie exploraré el papel del API Gateway dentro de una arquitectura de microservicios y por qué terminó convirtiéndose en el punto ideal para centralizar la comunicación, el enrutamiento y posteriormente la seguridad del sistema.',
    },
  ],
  },
  {
  id: '12',
  slug: 'spring-cloud-gateway-punto-entrada-microservicios',
  title: 'Spring Cloud Gateway: Mucho Más que un Punto de Entrada',
  description:
    'Descubriendo por qué un API Gateway es una pieza fundamental en una arquitectura de microservicios, centralizando el acceso, el enrutamiento y preparando la plataforma para incorporar seguridad, observabilidad y políticas transversales.',
  date: 'Julio 09, 2026',
  tags: ['#SpringCloud', '#Gateway', '#Architecture'],
  content: [
    {
      type: 'paragraph',
      content:
        'Después de incorporar Eureka al laboratorio, los microservicios ya podían registrarse y descubrirse automáticamente. Sin embargo, apareció un nuevo interrogante: ¿debería un cliente comunicarse directamente con cada microservicio o existe una mejor forma de centralizar el acceso al sistema? La respuesta llevó a incorporar uno de los componentes más importantes dentro de una arquitectura distribuida: el API Gateway.',
    },
    {
      type: 'paragraph',
      content:
        'Al principio pensé que el Gateway únicamente serviría para redirigir peticiones. Sin embargo, a medida que el laboratorio fue evolucionando comprendí que este componente representa mucho más que un simple router. Es el punto donde convergen aspectos como seguridad, observabilidad, políticas de acceso y comunicación entre clientes y microservicios.',
    },
    {
      type: 'blockquote',
      content:
        '"En una arquitectura distribuida, el Gateway no solo recibe solicitudes. Define la forma en que todo el sistema será consumido."',
    },
    {
      type: 'heading',
      level: 2,
      content: 'El problema de exponer directamente los microservicios',
    },
    {
      type: 'paragraph',
      content:
        'Imaginemos una aplicación compuesta por múltiples microservicios. Si cada uno expone su propia dirección, el cliente deberá conocer dónde se encuentra cada servicio, qué puerto utiliza e incluso adaptarse cuando la infraestructura cambie.',
    },
    {
      type: 'code',
      filename: 'Arquitectura sin Gateway',
      language: 'text',
      code:
`Cliente
   │
   ├────────► Service A :8081
   │
   ├────────► Service B :8082
   │
   └────────► Service C :8083`,
    },
    {
      type: 'paragraph',
      content:
        'Aunque este enfoque puede funcionar en sistemas pequeños, introduce un fuerte acoplamiento entre el cliente y la infraestructura. Cualquier modificación en la ubicación de un servicio obliga a actualizar los consumidores.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Centralizando el acceso',
    },
    {
      type: 'paragraph',
      content:
        'El API Gateway resuelve este problema proporcionando un único punto de entrada. A partir de este momento el cliente deja de conocer la ubicación de los microservicios y únicamente interactúa con el Gateway.',
    },
    {
      type: 'code',
      filename: 'Arquitectura con Gateway',
      language: 'text',
      code:
`               Cliente
                  │
                  ▼
        Spring Cloud Gateway
                  │
                  ▼
             Eureka Server
             ↙          ↘
       Service A    Service B`,
    },
    {
      type: 'paragraph',
      content:
        'Esta capa adicional reduce significativamente el acoplamiento. El cliente permanece completamente ajeno a los cambios internos de la arquitectura mientras el Gateway se encarga de localizar el destino adecuado utilizando Eureka.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Enrutamiento dinámico',
    },
    {
      type: 'paragraph',
      content:
        'Gracias a la integración con Spring Cloud Eureka, el Gateway ya no necesita conocer direcciones IP o puertos específicos. En su lugar utiliza nombres lógicos que son resueltos automáticamente mediante el mecanismo de Service Discovery.',
    },
    {
      type: 'code',
      filename: 'application.yml',
      language: 'yaml',
      code:
`spring:
  cloud:
    gateway:
      routes:
        - id: service-a
          uri: lb://SERVICEA
          predicates:
            - Path=/serviceA/**`,
    },
    {
      type: 'paragraph',
      content:
        'El prefijo "lb://" indica que Spring Cloud Gateway delegará la resolución del destino al balanceador de carga, consultando previamente el registro de Eureka. De esta forma, el Gateway puede enviar solicitudes a cualquiera de las instancias disponibles sin necesidad de modificar su configuración.',
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Qué otras responsabilidades puede asumir un Gateway?',
    },
    {
      type: 'paragraph',
      content:
        'Durante el desarrollo del laboratorio comprendí que el Gateway se convierte en el lugar ideal para centralizar funcionalidades transversales. En lugar de repetir la misma configuración en cada microservicio, muchas responsabilidades pueden resolverse antes de que la solicitud llegue a los servicios de negocio.',
    },
    {
      type: 'list',
      items: [
        '<strong>Autenticación:</strong> Verificar la identidad del usuario antes de acceder a cualquier servicio.',
        '<strong>Autorización:</strong> Determinar qué rutas puede consumir cada usuario según sus permisos.',
        '<strong>Logging:</strong> Registrar todas las solicitudes entrantes en un único punto.',
        '<strong>Observabilidad:</strong> Medir tiempos de respuesta y comportamiento del sistema.',
        '<strong>Rate Limiting:</strong> Limitar la cantidad de solicitudes por cliente para proteger la plataforma.',
        '<strong>Versionado:</strong> Mantener múltiples versiones de una API sin afectar a los consumidores.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: '¿Por qué elegí Spring Cloud Gateway?',
    },
    {
      type: 'paragraph',
      content:
        'Existen múltiples soluciones para implementar un API Gateway. En este laboratorio decidí utilizar Spring Cloud Gateway porque forma parte del ecosistema Spring Cloud y ofrece una integración natural con Eureka, filtros reactivos y Spring Security. Esto permite construir una arquitectura consistente sin incorporar herramientas adicionales durante las primeras etapas del aprendizaje.',
    },
    {
      type: 'blockquote',
      content:
        '"Centralizar responsabilidades comunes no solo reduce la duplicación de código; también facilita la evolución de toda la arquitectura."',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Preparando el siguiente paso',
    },
    {
      type: 'paragraph',
      content:
        'Una vez que todas las solicitudes comenzaron a pasar por el Gateway, apareció una nueva necesidad: controlar quién podía acceder a cada recurso. En lugar de implementar mecanismos de autenticación en todos los microservicios, el Gateway se convirtió en el lugar ideal para aplicar políticas de seguridad antes de que una solicitud alcanzara cualquier servicio de negocio.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Conclusión',
    },
    {
      type: 'paragraph',
      content:
        'La incorporación de Spring Cloud Gateway transformó por completo la arquitectura del laboratorio. Lo que inicialmente parecía un simple componente de enrutamiento terminó convirtiéndose en el núcleo de la comunicación entre clientes y microservicios. Al centralizar el acceso, desacoplar a los consumidores de la infraestructura y preparar el terreno para incorporar seguridad y observabilidad, el Gateway pasó a desempeñar un papel estratégico dentro del sistema.',
    },
    {
      type: 'paragraph',
      content:
        'En el siguiente artículo comenzaré a construir la primera capa de seguridad del laboratorio. Implementaré Spring Security directamente sobre el API Gateway para proteger los endpoints mediante autenticación HTTP Basic y autorización basada en roles, demostrando por qué centralizar la seguridad simplifica considerablemente la arquitectura.',
    },
  ],
  },
];
