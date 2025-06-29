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

### Source Code Structure

```bash
src
├── approval-status
│   ├── dto
│   │   └── approve-member.dto.ts
│   ├── approval-status.controller.ts
│   ├── approval-status.module.ts
│   └── approval-status.service.ts
├── auth
│   ├── dto
│   │   ├── forgot-password.dto.ts
│   │   ├── signin.dto.ts
│   │   ├── signup.dto.ts
│   │   └── verify-email.dto.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
├── decorators
│   ├── roles
│   │   └── roles.decorator.ts
│   └── user.decorator.ts
├── filters
│   ├── auth
│   │   └── auth.filter.ts
│   └── http-exception
│       └── http-exception.filter.ts
├── guards
│   ├── auth
│   │   └── auth.guard.ts
│   ├── is-verified
│   │   └── is-verified.guard.ts
│   ├── ownership
│   │   └── ownership.guard.ts
│   └── roles
│       └── roles.guard.ts
├── jwt
│   ├── jwt.module.ts
│   └── jwt.service.ts
├── mail
│   ├── mail.controller.ts
│   ├── mail.module.ts
│   └── mail.service.ts
├── module
│   ├── dto
│   │   ├── create-module.dto.ts
│   │   └── update-module.dto.ts
│   ├── module.controller.ts
│   ├── module.module.ts
│   └── module.service.ts
├── notification
│   ├── notification.controller.ts
│   ├── notification.module.ts
│   └── notification.service.ts
├── pipes
│   ├── auth
│   │   └── auth.pipe.ts
│   └── parse-int
│       └── parse-int.pipe.ts
├── prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── project
│   ├── dto
│   │   ├── create-project.dto.ts
│   │   ├── create-session.dto.ts
│   │   ├── get-project-team.dto.ts
│   │   ├── update-all-modules.dto.ts
│   │   ├── update-project.dto.ts
│   │   └── update-static-module.dto.ts
│   ├── project.controller.ts
│   └── project.service.ts
├── types
│   ├── ApprovalStatus.ts
│   ├── AuditLog.ts
│   ├── Comment.ts
│   ├── custom-prisma.types.ts
│   ├── Feedback.ts
│   ├── File.ts
│   ├── jwt-payload.type.ts
│   ├── Milestone.type.ts
│   ├── Notification.ts
│   ├── project.types.ts
│   ├── request-with-user.type.ts
│   ├── roles.enum.ts
│   ├── Soutenance.ts
│   ├── Task.ts
│   └── user.type.ts
├── user
│   ├── dto
│   │   └── update-user-password.dto.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
├── workshop
│   ├── dto
│   │   ├── CreateWorkshopDto.ts
│   │   └── UpdateWorkshopDto.ts
│   ├── workshop.controller.ts
│   ├── workshop.module.ts
│   └── workshop.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

### Database Entity Relationship Diagram

![Database ER Diagram](docs/er-diagram.png)

*Entity Relationship Diagram showing the database schema and relationships between entities.*

## API Endpoints
## Host : https://nestjs-projects-management.onrender.com
### Authentication

## POST /auth/signup – Register a new user

Registers a new user. Optional fields should be placed at the bottom of the request body.

### ✅ Request Body

```json
{
  "email": "example.example@esi-sba.dz",
  "password": "password123",
  "firstName": "Mohammed",
  "lastName": "Rabah",
  "role": "MEMBER",
  //optional fields
  "phoneNumber": "+213567890123",  // Optional, format: +[country code][phone number]
  "profilePicture": "http://example.com/profile.jpg",  // Optional, URL format
  "bio": "Software developer from Algeria, passionate about tech.",  // Optional
  "website": "http://example.com",  // Optional, URL format
}
```

### 🟢 Success Response

```json
{
  "message": "User created successfully. Please verify your email with the code sent to you."
}
```

---

## POST /auth/signin – Log in and receive a JWT token

### ✅ Request Body

```json
{
  "email": "example.example@esi-sba.dz",
  "password": "password123"
}

```

### 🟢 Success Response

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlZDg4OGUyLWY0NjMtNDIxYS1iMjhkLTRlZjVjOTI0NWFhMiIsImVtYWlsIjoieGFtcGxlLmV4YW1wbGUuZXNpLXNiby5kemoiLCJpYXQiOjE3NDM3OTA0MDksImV4cCI6MTc0Mzc5NDAwOX0.nNimLWRX_G_Y5xQ8dfQcxWSoZhCXmD8lbdqEk_jkoKU",
  "user": {
    "id": "3ed888e2-f463-421a-b28d-4ef5c9245aa2",
    "email": "example.example@esi-sba.dz",
    "firstName": "Mohammed",
    "lastName": "Rabah",
    "role": "MEMBER"
  }
}

```

### ❌ Error Responses

#### Invalid credentials

```json
{
  "message": "Invalid credentials",
  "error": "Bad Request",
  "statusCode": 400
}
```

#### Email not verified

```json
{
  "message": "Your email is not verified. Please verify your email first.",
  "error": "Forbidden",
  "statusCode": 403
}
```

---

## POST /auth/verify-email – Verify email using a token

### ✅ Request Body

```json
{
  "token": "678820"
}
```

### 🟢 Success Response

```json
{
  "message": "Email verified successfully!"
}
```

---

## POST /auth/forgot-password – Request password reset

### ✅ Request Body

```json
{
  "email": "john.doe@example.com"
}
```

---

## POST /auth/reset-password – Reset password using a token

### ✅ Request Body

```json
{
  "token": "reset-token-from-email",
  "newPassword": "newSecurePassword456"
}
```

---
# Project API Documentation

This document outlines the available routes for managing projects, members, and associated data within the system.

## Routes
## API Reference
- [projects API](readme/projects.md)
- [users](readme/users.md)


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

