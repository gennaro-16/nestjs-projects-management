src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── auth.guard.ts
│   ├── auth.decorator.ts
│   └── auth.dto.ts
├── config/
│   ├── typeorm.config.ts
│   ├── prisma.config.ts
│   └── env.config.ts
├── filters/
│   ├── http-exception.filter.ts
├── guards/
│   ├── auth.guard.ts
│   ├── role.guard.ts
├── middleware/
│   ├── logger.middleware.ts
├── pipes/
│   ├── validation.pipe.ts
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── users.dto.ts
├── types/ 
│   ├── jwt-payload.type.ts
│   ├── request-with-user.type.ts
│   ├── user.type.ts
├── main.ts
└── app.module.ts
