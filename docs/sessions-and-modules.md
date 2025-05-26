# Project Sessions and Modules API Documentation

## Sessions Management

### Create a Session
```http
POST /projects/:projectId/sessions
```

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <your-token>`

**Request Body:**
```json
{
  "date": "2024-05-26T15:00:00Z",
  "summary": "Initial project kickoff meeting. Discussed project goals and timeline."
}
```

**Response Example:**
```json
{
  "id": "64b7c532-e176-4c0d-8808-d4ff6b096efc",
  "date": "2024-05-26T15:00:00.000Z",
  "summary": "Initial project kickoff meeting. Discussed project goals and timeline.",
  "projectId": "8af6cf40-6299-4430-b0bc-bac5e7b43b61",
  "createdAt": "2025-05-26T17:04:20.514Z",
  "updatedAt": "2025-05-26T17:04:20.514Z"
}
```

### Get Project Sessions
```http
GET /projects/:projectId/sessions
```

**Headers:**
- `Authorization: Bearer <your-token>`

**Response Example:**
```json
[
  {
    "id": "64b7c532-e176-4c0d-8808-d4ff6b096efc",
    "date": "2024-05-26T15:00:00.000Z",
    "summary": "Initial project kickoff meeting. Discussed project goals and timeline.",
    "projectId": "8af6cf40-6299-4430-b0bc-bac5e7b43b61",
    "createdAt": "2025-05-26T17:04:20.514Z",
    "updatedAt": "2025-05-26T17:04:20.514Z"
  },
  {
    "id": "616e99a4-1ea5-4125-9516-f07757a9905d",
    "date": "2024-05-27T14:00:00.000Z",
    "summary": "Progress review meeting. Team presented current status and discussed challenges.",
    "projectId": "8af6cf40-6299-4430-b0bc-bac5e7b43b61",
    "createdAt": "2025-05-26T17:05:15.308Z",
    "updatedAt": "2025-05-26T17:05:15.308Z"
  }
]
```

### Get Single Session
```http
GET /projects/:projectId/sessions/:sessionId
```

**Headers:**
- `Authorization: Bearer <your-token>`

### Delete Session
```http
DELETE /projects/:projectId/sessions/:sessionId
```

**Headers:**
- `Authorization: Bearer <your-token>`

## Modules Management

### Update All Modules Progress
```http
PATCH /projects/:projectId/all-modules
```

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <your-token>`

**Request Body:**
```json
{
  "research": 30,
  "development": 20,
  "testing": 10,
  "documentation": 15
}
```

**Response Example:**
```json
[
  {
    "id": "18748bc7-2d0a-45a1-8226-5f999fb245dd",
    "name": "Research",
    "percentage": 30,
    "projectId": "8af6cf40-6299-4430-b0bc-bac5e7b43b61",
    "createdAt": "2025-05-26T16:38:21.109Z",
    "updatedAt": "2025-05-26T17:05:37.076Z"
  },
  {
    "id": "2f31908a-9be8-4c49-a0cd-a09e1597a41a",
    "name": "Development",
    "percentage": 20,
    "projectId": "8af6cf40-6299-4430-b0bc-bac5e7b43b61",
    "createdAt": "2025-05-26T16:38:21.109Z",
    "updatedAt": "2025-05-26T17:05:37.076Z"
  },
  {
    "id": "759306a9-b5d1-499a-81e7-9c296b17d569",
    "name": "Testing",
    "percentage": 10,
    "projectId": "8af6cf40-6299-4430-b0bc-bac5e7b43b61",
    "createdAt": "2025-05-26T16:38:21.109Z",
    "updatedAt": "2025-05-26T17:05:37.076Z"
  },
  {
    "id": "1375dd6e-b905-4818-95ba-fbe264d69df7",
    "name": "Documentation",
    "percentage": 15,
    "projectId": "8af6cf40-6299-4430-b0bc-bac5e7b43b61",
    "createdAt": "2025-05-26T16:38:21.109Z",
    "updatedAt": "2025-05-26T17:05:37.076Z"
  }
]
```

### Update Single Module Progress
```http
PATCH /projects/:projectId/modules
```

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <your-token>`

**Request Body:**
```json
{
  "moduleName": "Research",
  "percentage": 35
}
```

## Notes
- All endpoints require authentication via JWT token
- Percentage values must be between 0 and 100
- Dates should be in ISO 8601 format
- Session summaries should be descriptive and clear 