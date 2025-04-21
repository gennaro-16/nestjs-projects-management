
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
.
├── admin
│   ├── admin.controller.spec.ts
│   ├── admin.controller.ts
│   ├── admin.module.ts
│   ├── admin.service.spec.ts
│   ├── admin.service.ts
│   └── dto
├── announcement
│   ├── announcement.controller.spec.ts
│   ├── announcement.controller.ts
│   ├── announcement.module.ts
│   ├── announcement.service.spec.ts
│   ├── announcement.service.ts
│   └── dto
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── approval-status
│   ├── approval-status.controller.spec.ts
│   ├── approval-status.controller.ts
│   ├── approval-status.module.ts
│   ├── approval-status.service.spec.ts
│   ├── approval-status.service.ts
│   └── dto
├── auth
│   ├── auth.controller.spec.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.spec.ts
│   ├── auth.service.ts
│   ├── dto
│   └── jwt.strategy.ts
├── config
├── decorators
│   ├── roles
│   └── user.decorator.ts
├── filters
│   ├── auth
│   └── http-exception
├── guards
│   ├── auth
│   ├── is-verified
│   ├── ownership
│   └── roles
├── jwt
│   ├── jwt.module.ts
│   ├── jwt.service.spec.ts
│   └── jwt.service.ts
├── mail
│   ├── dto
│   ├── mail.controller.spec.ts
│   ├── mail.controller.ts
│   ├── mail.module.ts
│   ├── mail.service.spec.ts
│   └── mail.service.ts
├── main.ts
├── middleware
│   ├── auth
│   └── logger
├── notification
│   ├── dto
│   ├── notification.controller.spec.ts
│   ├── notification.controller.ts
│   ├── notification.module.ts
│   ├── notification.service.spec.ts
│   └── notification.service.ts
├── pipes
│   ├── auth
│   └── parse-int
├── prisma
│   ├── prisma.module.ts
│   ├── prisma.service.spec.ts
│   └── prisma.service.ts
├── project
│   ├── dto
│   ├── project.controller.spec.ts
│   ├── project.controller.ts
│   ├── project.service.spec.ts
│   └── project.service.ts
├── soutenance
│   ├── dto
│   ├── soutenance.controller.spec.ts
│   ├── soutenance.controller.ts
│   ├── soutenance.module.ts
│   ├── soutenance.service.spec.ts
│   └── soutenance.service.ts
├── types
│   ├── ApprovalStatus.ts
│   ├── AuditLog.ts
│   ├── Comment.ts
│   ├── Feedback.ts
│   ├── File.ts
│   ├── Milestone.type.ts
│   ├── Notification.ts
│   ├── Soutenance.ts
│   ├── Task.ts
│   ├── custom-prisma.types.ts
│   ├── jwt-payload.type.ts
│   ├── project.types.ts
│   ├── request-with-user.type.ts
│   ├── roles.enum.ts
│   └── user.type.ts
├── user
│   ├── dto
│   ├── user.controller.spec.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.service.spec.ts
│   └── user.service.ts
├── utils
│   └── verfication.ts
└── workshop
    ├── workshop.controller.spec.ts
    ├── workshop.controller.ts
    ├── workshop.module.ts
    ├── workshop.service.spec.ts
    └── workshop.service.ts

```


## API Endpoints
## Host : https://nestjs-projects-management.onrender.com
### Authentication

## 📌 POST /auth/signup – Register a new user

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

## 📌 POST /auth/signin – Log in and receive a JWT token

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

## 📌 POST /auth/verify-email – Verify email using a token

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

## 📌 POST /auth/forgot-password – Request password reset

### ✅ Request Body

```json
{
  "email": "john.doe@example.com"
}
```

---

## 📌 POST /auth/reset-password – Reset password using a token

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

### 1. **Create a Project**
- **Method:** `POST`
- **Route:** `/projects`
- **Description:** Create a new project. Only authenticated users can create a project.
- **Guards:** `AuthGuard`
- **Request Body:** 
  - `CreateProjectDto`

### 2. **Get Project Relations**
- **Method:** `GET`
- **Route:** `/projects/:projectId/relation`
- **Description:** Get the relations for a project (e.g., members, encadrants).
- **Query Parameters:** 
  - `relationType` (string) - Type of relation (e.g., members, encadrants, jury).
- **Request Parameters:** 
  - `projectId` (string) - The ID of the project.

### 3. **Add Member to a Project**
- **Method:** `POST`
- **Route:** `/projects/add-member`
- **Description:** Add a member to a project.
- **Guards:** `AuthGuard`, `OwnershipGuard`
- **Request Body:** 
  - `projectId` (string)
  - `userIdentifier` (string)

### 4. **Add Encadrant to a Project**
- **Method:** `POST`
- **Route:** `/projects/add-encadrant`
- **Description:** Add an encadrant to a project.
- **Request Body:** 
  - `projectId` (string)
  - `userIdentifier` (string)

### 5. **Add Jury Member to a Project**
- **Method:** `POST`
- **Route:** `/projects/add-jury`
- **Description:** Add a jury member to a project.
- **Request Body:** 
  - `projectId` (string)
  - `userIdentifier` (string)

### 6. **Get Projects Without Encadrants**
- **Method:** `GET`
- **Route:** `/projects/noencadrants`
- **Description:** Get all projects that don't have any encadrants.

### 7. **Search Projects by Name**
- **Method:** `GET`
- **Route:** `/projects/search/name/:name`
- **Description:** Search for projects by name.
- **Request Parameters:** 
  - `name` (string)

### 8. **Search Projects by Owner**
- **Method:** `GET`
- **Route:** `/projects/search/owner/:ownerName`
- **Description:** Search for projects by owner's name.
- **Request Parameters:** 
  - `ownerName` (string)

### 9. **Get All Projects**
- **Method:** `GET`
- **Route:** `/projects`
- **Description:** Get a list of all projects.

### 10. **Get Project by ID**
- **Method:** `GET`
- **Route:** `/projects/:id`
- **Description:** Get a specific project by its ID.
- **Request Parameters:** 
  - `id` (string)

### 11. **Update a Project**
- **Method:** `PATCH`
- **Route:** `/projects/:id`
- **Description:** Update a project. Only authenticated project owners can update a project.
- **Guards:** `AuthGuard`, `OwnershipGuard`
- **Request Parameters:** 
  - `id` (string)
- **Request Body:** 
  - `UpdateProjectDto`

### 12. **Delete a Project**
- **Method:** `DELETE`
- **Route:** `/projects/:id`
- **Description:** Delete a project. Only authenticated project owners can delete a project.
- **Guards:** `AuthGuard`, `OwnershipGuard`
- **Request Parameters:** 
  - `id` (string)

### 13. **Search Projects by Industry**
- **Method:** `GET`
- **Route:** `/projects/search/industry/:industry`
- **Description:** Search for projects by industry.
- **Request Parameters:** 
  - `industry` (string)

### 14. **Add Member to a Project (Specific)**
- **Method:** `POST`
- **Route:** `/projects/:projectId/add-member/:userId`
- **Description:** Add a specific user as a member of a project.
- **Guards:** `AuthGuard`, `OwnershipGuard`
- **Request Parameters:** 
  - `projectId` (string)
  - `userId` (string)

### 15. **Remove Member from a Project**
- **Method:** `POST`
- **Route:** `/projects/:projectId/remove-member/:userId`
- **Description:** Remove a specific user from a project.
- **Guards:** `AuthGuard`, `OwnershipGuard`
- **Request Parameters:** 
  - `projectId` (string)
  - `userId` (string)

### 16. **Get Projects by Stage**
- **Method:** `GET`
- **Route:** `/projects/filter/stage/:stage`
- **Description:** Get projects filtered by stage.
- **Request Parameters:** 
  - `stage` (string) - The project stage.

### 17. **Get Projects by Status**
- **Method:** `GET`
- **Route:** `/projects/filter/status/:status`
- **Description:** Get projects filtered by status.
- **Request Parameters:** 
  - `status` (string) - The project status.

### 18. **Sort Projects by Date**
- **Method:** `GET`
- **Route:** `/projects/sort/date/:order`
- **Description:** Get projects sorted by date.
- **Request Parameters:** 
  - `order` (asc | desc) - Sorting order.

### 19. **Sort Projects by Members**
- **Method:** `GET`
- **Route:** `/projects/sort/members/:order`
- **Description:** Get projects sorted by the number of members.
- **Request Parameters:** 
  - `order` (asc | desc) - Sorting order.

### 20. **Get Top Industries**
- **Method:** `GET`
- **Route:** `/projects/stats/top-industries`
- **Description:** Get the top industries based on projects.

### 21. **Get Top Projects by Members**
- **Method:** `GET`
- **Route:** `/projects/stats/top-projects`
- **Description:** Get the top projects based on the number of members.



### Users

- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve a user by ID
- `PATCH /users/:id` - Update user information

### Projects

## 📌 `POST /projects` – Create a new project
Registers a new project. Optional fields should be placed at the bottom of the request body.

### ✅ Request Body
```json
{
  "name": "My Awesome Project",
  "description": "A detailed project description",
  "industry": "Tech",
  "startDate": "2025-05-01",
  "endDate": "2025-12-31",
  // Optional fields
  "tags": ["AI", "Innovation"],
  "budget": 50000
}
```

### 🟢 Success Response
```json
{
  "id": "abc123",
  "name": "My Awesome Project",
  "description": "A detailed project description",
  "industry": "Tech",
  "startDate": "2025-05-01",
  "endDate": "2025-12-31",
  "ownerId": "user123",
  "members": [],
  "encadrants": [],
  "juryMembers": [],
  "tags": ["AI", "Innovation"],
  "budget": 50000
}
```

---

## 📌 `GET /projects/:projectId/relation` – Get project relation
Fetches relation data for a specific project.

### ✅ Request Query Parameters
```json
{
  "relationType": "members" // Can be "members", "encadrants", or "juryMembers"
}
```

### 🟢 Success Response
```json
{
  "projectId": "abc123",
  "relationType": "members",
  "relationData": [
    {
      "userId": "user456",
      "name": "John Doe",
      "role": "MEMBER"
    },
    {
      "userId": "user789",
      "name": "Jane Smith",
      "role": "MEMBER"
    }
  ]
}
```

---

## 📌 `POST /projects/add-member` – Add a member to a project
Adds a member to a specified project.

### ✅ Request Body
```json
{
  "projectId": "abc123",
  "userIdentifier": "user456" // Can be user ID or email
}
```

### 🟢 Success Response
```json
{
  "success": true,
  "message": "Member added successfully",
  "updatedProject": {
    "id": "abc123",
    "name": "My Awesome Project",
    "members": [
      {
        "userId": "user456",
        "name": "John Doe"
      }
    ]
  }
}
```

---

## 📌 `GET /projects/noencadransts` – Get projects without encadrants
Fetches a list of projects with no encadrants assigned.

### ✅ Request Body
No body is required.

### 🟢 Success Response
```json
{
  "projects": [
    {
      "id": "project001",
      "name": "Project Alpha",
      "membersCount": 3
    },
    {
      "id": "project002",
      "name": "Project Beta",
      "membersCount": 2
    }
  ]
}
```

---

## 📌 `PATCH /projects/:id` – Update a project
Updates a specific project’s details.

### ✅ Request Body
```json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "startDate": "2025-06-01",
  "endDate": "2025-12-01"
}
```

### 🟢 Success Response
```json
{
  "success": true,
  "updatedProject": {
    "id": "abc123",
    "name": "Updated Project Name",
    "description": "Updated description",
    "startDate": "2025-06-01",
    "endDate": "2025-12-01"
  }
}
```



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

