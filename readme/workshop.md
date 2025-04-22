📄 workshop-controller.md
markdown

# WorkshopController API Documentation

This controller handles all operations related to **Workshops** in the system.

## Base Route

/workshops

yaml


---

## 🔹 POST `/workshops`

**Create a new workshop**

### Request Body

```json
{
  "title": "NestJS Bootcamp",
  "description": "Learn NestJS basics and advanced patterns",
  "date": "2025-05-10T10:00:00Z",
  "location": "Online"
}
(Structure depends on CreateWorkshopDto)

Response
json

{
  "id": "uuid",
  "title": "NestJS Bootcamp",
  "description": "...",
  "date": "2025-05-10T10:00:00Z",
  "location": "Online"
}
🔹 GET /workshops
Get all workshops

Response
json

[
  {
    "id": "uuid",
    "title": "NestJS Bootcamp",
    "date": "2025-05-10T10:00:00Z"
  },
  ...
]
🔹 GET /workshops/:id
Get a specific workshop by ID

Params
id: string (UUID or database ID)

Response
json

{
  "id": "uuid",
  "title": "NestJS Bootcamp",
  "description": "...",
  "date": "2025-05-10T10:00:00Z",
  "location": "Online"
}
🔹 PUT /workshops/:id
Update an existing workshop

Params
id: string

Request Body
(Same structure as UpdateWorkshopDto, e.g.)

json

{
  "title": "Updated Title",
  "location": "New Location"
}
Response
json

{
  "id": "uuid",
  "title": "Updated Title",
  "location": "New Location"
}
🔹 DELETE /workshops/:id
Delete a workshop

Params
id: string

Response
json

{
  "message": "Workshop deleted successfully"
}
🔹 GET /workshops/past
Get all past workshops

Response
json

[
  {
    "id": "uuid",
    "title": "Old Workshop",
    "date": "2023-04-10T10:00:00Z"
  }
]
🔹 GET /workshops/upcoming
Get all upcoming workshops

Response
json

[
  {
    "id": "uuid",
    "title": "Future Workshop",
    "date": "2025-05-10T10:00:00Z"
  }
]
