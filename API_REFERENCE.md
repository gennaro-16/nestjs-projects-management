# API Reference

Welcome to the API documentation for the NestJS Projects Management platform! This guide covers all available endpoints for managing users, projects, modules, and workshops.

---

## Table of Contents
- [Authentication & Users](#authentication--users)
- [Projects](#projects)
- [Modules](#modules)
- [Workshops](#workshops)

---

## Authentication & Users

### POST /auth/signin
**Description:** Log in and receive a JWT token.

**Request Body:**
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```
**Success Response:**
```json
{
  "message": "Login successful",
  "token": "<jwt-token>",
  "user": {
    "id": "uuid",
    "email": "example@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "MEMBER"
  }
}
```
**Error Responses:**
- 400: Invalid credentials
- 403: Email not verified

---

### POST /auth/signup
**Description:** Register a new user.

**Request Body:**
```json
{
  "email": "example@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "MEMBER"
}
```
**Success Response:**
```json
{
  "message": "User created successfully. Please verify your email with the code sent to you."
}
```

---

### POST /auth/verify-email
**Description:** Verify email using a token.

**Request Body:**
```json
{
  "token": "123456"
}
```
**Success Response:**
```json
{
  "message": "Email verified successfully!"
}
```

---

### User Management

#### GET /users/:id
Get user by ID.

#### GET /users/email/:email
Get user by email.

#### GET /users/name?firstName=...&lastName=...
Get users by name.

#### GET /users
Get all users.

#### POST /users
Create a new user.

#### PATCH /users/password
Update user password.

#### PATCH /users/profile
Update authenticated user profile. (Requires `Authorization: Bearer <token>`)

#### DELETE /users/:id
Delete user by ID.

#### POST /users/reset-token
Generate password reset token.

#### POST /users/validate-reset-token
Validate password reset token.

#### POST /users/verify-user
Verify user email with token.

#### PATCH /users/role/:id
Update user role (admin only).

**All endpoints above return standard user objects or success messages.**

---

## Projects

### POST /projects
**Create a new project.** (Authenticated)

**Request Body:**
```json
{
  "name": "Project X",
  "industry": "Tech",
  "about": "A groundbreaking project",
  "problem": "A tough challenge",
  "solution": "An innovative solution",
  "idea": "A game-changing concept",
  "targetAudience": "Young professionals",
  "competitiveAdvantage": "Unparalleled speed",
  "motivation": "To make a difference",
  "stage": "IDEA",
  "memberEmails": ["member@example.com"],
  "encadrantEmails": ["encadrant@example.com"]
}
```
**Success Response:**
```json
{
  "id": "uuid",
  "name": "Project X",
  ...
  "status": "PENDING",
  "stage": "IDEA",
  "createdAt": "2025-04-21T23:37:47.076Z"
}
```
**Error Responses:**
- 401: No token provided
- 409: Project with this name or industry already exists

---

### GET /projects/:projectId/relation
Get project relation data (members, encadrants, juryMembers).

**Query:** `relationType=members|encadrants|juryMembers`

**Success Response:**
```json
{
  "projectId": "abc123",
  "relationType": "members",
  "relationData": [
    { "userId": "user456", "name": "John Doe", "role": "MEMBER" }
  ]
}
```

---

### POST /projects/add-member
Add a member to a project. (Authenticated, Ownership required)

**Request Body:**
```json
{
  "projectId": "uuid",
  "userIdentifier": "uuid"
}
```

---

### POST /projects/add-encadrant
Add an encadrant to a project.

---

### POST /projects/add-jury
Add a jury member to a project.

---

### GET /projects/noencadrants
Get all projects without encadrants.

---

## Modules

### POST /modules
Create a new module.

**Request Body:**
```json
{
  "name": "Web Development",
  "description": "Covers frontend and backend technologies",
  "year": "1cs"
}
```
**Success Response:**
```json
{
  "id": "uuid",
  "name": "Web Development",
  "description": "Covers frontend and backend technologies",
  "year": "1cs"
}
```

---

### GET /modules
Get all modules.

---

### GET /modules/:id
Get a module by ID.

---

### PUT /modules/:id
Update a module.

---

### DELETE /modules/:id
Delete a module.

---

## Workshops

### POST /workshops
Create a new workshop.

**Request Body:**
```json
{
  "title": "NestJS Bootcamp",
  "description": "Learn NestJS basics and advanced patterns",
  "date": "2025-05-10T10:00:00Z",
  "location": "Online"
}
```
**Success Response:**
```json
{
  "id": "uuid",
  "title": "NestJS Bootcamp",
  "description": "...",
  "date": "2025-05-10T10:00:00Z",
  "location": "Online"
}
```

---

### GET /workshops
Get all workshops.

---

### GET /workshops/:id
Get a workshop by ID.

---

### PUT /workshops/:id
Update a workshop.

---

### DELETE /workshops/:id
Delete a workshop.

---

### GET /workshops/past
Get all past workshops.

---

### GET /workshops/upcoming
Get all upcoming workshops.

---

## Error Handling
All endpoints return standard HTTP error codes and error messages in the following format:
```json
{
  "message": "Error description",
  "error": "Error type",
  "statusCode": 400
}
```

---

## Authentication
Most endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Contact & Support
For questions, issues, or contributions, please open an issue or pull request on GitHub. 