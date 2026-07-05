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
  },
];
