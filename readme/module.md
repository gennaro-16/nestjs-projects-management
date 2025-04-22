# ModuleController API Documentation

This controller handles all operations related to **Modules** in the system.

## Base Route

/modules

yaml


---

## 🔹 POST `/modules`

**Create a new module**

### Request Body

```json
{
  "name": "Web Development",
  "description": "Covers frontend and backend technologies",
  "year": "1cs"
}
(Structure should match your CreateModuleDto)

Response
json

{
  "id": "uuid",
  "name": "Web Development",
  "description": "Covers frontend and backend technologies",
  "year": "1cs"
}
🔹 GET /modules
Retrieve all modules

Response
json

[
  {
    "id": "uuid",
    "name": "Web Development",
    "year": "1cs"
  },
  ...
]
🔹 GET /modules/:id
Get a specific module by ID

Params
id: string (UUID or database ID)

Response
json

{
  "id": "uuid",
  "name": "Web Development",
  "description": "Covers frontend and backend technologies",
  "year": "1cs"
}
🔹 PUT /modules/:id
Update an existing module

Params
id: string

Request Body
(Same structure as UpdateModuleDto, e.g.)

json

{
  "name": "Advanced Web Dev",
  "description": "Includes DevOps and deployment",
  "year": "2cs"
}
Response
json

{
  "id": "uuid",
  "name": "Advanced Web Dev",
  "description": "Includes DevOps and deployment",
  "year": "2cs"
}
🔹 DELETE /modules/:id
Delete a module by ID

Params
id: string

Response
json

{
  "message": "Module deleted successfully"
}