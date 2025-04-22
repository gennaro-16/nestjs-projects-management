### Users

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
### Get User by ID
**GET** `/:id`

Returns a user by their ID.

**Parameters:**
- `id` (string, required): User's UUID

**Response:**  
Same structure as `/me` endpoint

---

### Get User by Email
**GET** `/email/:email`

Returns a user by their email address.

**Parameters:**
- `email` (string, required): User's email address

**Response:**  
Same structure as `/me` endpoint

---

### Get User by Name
**GET** `/name`

Returns users matching the provided first and last names.

**Query Parameters:**
- `firstName` (string, required)
- `lastName` (string, required)

**Response:**
```json
[
  {
    "id": "uuid-string",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
]
Get All Users
GET /

Returns all users in the system.

Response:

json
[
  {
    "id": "uuid-string",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "MEMBER"
  }
]
Create User
POST /

Creates a new user.

Request Body:

json
{
  "email": "new@example.com",
  "password": "securePassword123",
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+9876543210",
  "role": "MEMBER"
}
Response:

json
{
  "id": "new-uuid-string",
  "email": "new@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
Update User Password
PATCH /password

Updates a user's password.

Request Body:

json
{
  "email": "user@example.com",
  "currentPassword": "oldPassword",
  "newPassword": "newSecurePassword"
}
Response:

json
{
  "success": true,
  "message": "Password updated successfully"
}
🔒 Update Authenticated User Profile
PATCH /profile

Updates the authenticated user's profile information.

Request:

Headers: Authorization: Bearer <token>

Body:

json
{
  "firstName": "Updated",
  "lastName": "Name",
  "bio": "New bio information"
}
Response:
Updated user object (same structure as /me)

Delete User
DELETE /:id

Deletes a user by ID.

Parameters:

id (string, required): User's UUID

Response:

json
{
  "success": true,
  "message": "User deleted successfully"
}
Generate Password Reset Token
POST /reset-token

Generates a password reset token for a user.

Request Body:

json
{
  "email": "user@example.com"
}
Response:

json
{
  "success": true,
  "message": "Reset token generated and sent to email"
}
Validate Reset Token
POST /validate-reset-token

Validates a password reset token.

Request Body:

json
{
  "email": "user@example.com",
  "token": "reset-token-string"
}
Response:

json
{
  "valid": true,
  "message": "Token is valid"
}
Verify User
POST /verify-user

Verifies a user's email address using a verification token.

Request Body:

json
{
  "email": "user@example.com",
  "token": "verification-token-string"
}
Response:

json
{
  "verified": true,
  "message": "User verified successfully"
}
Update User Role
PATCH /role/:id

Updates a user's role (admin-only action).

Parameters:

id (string, required): User's UUID

Request Body:

json
{
  "role": "ADMIN"
}
Available Roles:

ADMIN

STAGE_SERVICE

PROJECT_OWNER

COMMITTEE_MEMBER

JURY_MEMBER

SUPERVISOR

MEMBER

LEADER

Response:
Updated user object with new role
