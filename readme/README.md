
# NestJS API with Prisma & PostgreSQL

## Project Overview

This API is built using **NestJS**, **Prisma ORM**, and **PostgreSQL**. It includes a robust authentication system with JWT, email verification, role-based access control, and various user and project management functionalities.

### Features Implemented

- **Authentication**
  - JWT-based authentication
  - Email verification system
  - Role-based access control (RBAC)
  - Guards for authentication, role permissions, and verification status
- **User & Project Management**
  - CRUD operations for users and projects
  - Approval system (implementation in progress)
  - Task and milestone management
  - Notifications & audit logging
- **Security & Middleware**
  - Custom authentication guards
  - Exception filters for handling errors
  - Logging middleware for tracking requests

## Project Structure

```bash
├── admin
│   ├── admin.controller.ts
│   ├── admin.module.ts
│   ├── admin.service.ts
│   └── dto
├── announcement
│   ├── announcement.controller.ts
│   ├── announcement.module.ts
│   ├── announcement.service.ts
│   └── dto
├── app.module.ts
├── approval-status
│   ├── approval-status.controller.ts
│   ├── approval-status.module.ts
│   ├── approval-status.service.ts
│   └── dto
├── audit-log
│   ├── audit-log.controller.ts
│   ├── audit-log.module.ts
│   ├── audit-log.service.ts
│   └── dto
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto
│   ├── jwt.strategy.ts
├── config
├── decorators
│   ├── roles.decorator.ts
│   ├── user.decorator.ts
├── feedback
│   ├── feedback.controller.ts
│   ├── feedback.module.ts
│   ├── feedback.service.ts
│   └── dto
├── file
│   ├── file.controller.ts
│   ├── file.module.ts
│   ├── file.service.ts
│   └── dto
├── filters
├── guards
├── jwt
├── mail
├── middleware
├── milestone
├── notification
├── pipes
├── prisma
│   ├── prisma.module.ts
│   ├── prisma.service.ts
├── project
│   ├── project.controller.ts
│   ├── project.service.ts
│   ├── dto
├── soutenance
├── task
├── types
├── user
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.service.ts
│   ├── dto
└── utils
    └── verification.ts
```


## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Log in and receive a JWT token
- `POST /auth/verify-email` - Verify email using a token
- `POST /auth/forgot-password` - Request password reset

### Users

- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve a user by ID
- `PATCH /users/:id` - Update user information

### Projects

- `POST /projects` - Create a new project
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `PATCH /projects/:id` - Update project details
- `DELETE /projects/:id` - Delete a project

### Approval System (In Progress)

- `POST /approval-status/request` - Request approval
- `POST /approval-status/approve` - Approve a request

## What's Left to Implement

- Finalizing the approval system
- Additional utility endpoints
- Enhancing email notifications
- Further security enhancements

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

