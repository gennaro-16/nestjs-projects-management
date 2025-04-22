
### 1. **Create a Project**
- **Method:** `POST`
- **Route:** `/projects`
- **Description:** Create a new project. Only authenticated users can create a project.
- **Guards:** `AuthGuard`
- **Request Body:** 

```json
{
  "name": "Projedddessdddect X",
  "industry": "Tech",
  "about": "A groundbreaking project",
  "problem": "A tough challenge",
  "solution": "An innovative solution",
  "idea": "A game-changing concept",
  "targetAudience": "Young professionals",
  "competitiveAdvantage": "Unparalleled speed",
  "motivation": "To make a difference",
  "stage": "IDEA",
  "memberEmails": ["varaforskare@gmail.com"],
"encadrantEmails": ["dorianyacine@gmail.com" ]
}

```

response 

```json
   {
    "id": "9ed2b973-bf7f-4008-8304-2e65eb2afb26",
    "name": "Projedddessdddect X",
    "industry": "Tech",
    "about": "A groundbreaking project",
    "problem": "A tough challenge",
    "solution": "An innovative solution",
    "idea": "A game-changing concept",
    "targetAudience": "Young professionals",
    "competitiveAdvantage": "Unparalleled speed",
    "motivation": "To make a difference",
    "status": "PENDING",
    "stage": "IDEA",
    "createdAt": "2025-04-21T23:37:47.076Z"
}


```
eroors
```json
 {
    "message": "No token provided",
    "error": "Unauthorized",
    "statusCode": 401
}
```
```json
{
    "message": "Project with this name or industry already exists",
    "error": "Conflict",
    "statusCode": 409
}
```
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

```json
{
    "id": "331daff9-26c1-4c74-b79f-a27b38832d2f",
    "name": "Projedddesssdddect X",
    "industry": "Tech",
    "about": "A groundbreaking project",
    "problem": "A tough challenge",
    "solution": "An innovative solution",
    "idea": "A game-changing concept",
    "targetAudience": "Young professionals",
    "competitiveAdvantage": "Unparalleled speed",
    "motivation": "To make a difference",
    "status": "PENDING",
    "stage": "IDEA",
    "createdAt": "2025-04-21T23:43:08.406Z",
    "members": [
        {
            "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
            "firstName": "walid",
            "lastName": "waldoo",
            "email": "zr.nesal@esi-sba.dz"
        }
    ]
}

```

```json
{
  "projectId": "67bb0277-1804-4fdb-bb7b-e382fc79d913",
  "userIdentifier": "d413715a-2a41-42b8-b215-a55bfa3e4305"

}
```
```json
{
    "message": "You are not authorized to modify this project",
    "error": "Forbidden",
    "statusCode": 403
}

```

### 4. **Add Encadrant to a Project**
- **Method:** `POST`
- **Route:** `/projects/add-encadrant`
- **Description:** Add an encadrant to a project.
- **Request Body:** 
  - `projectId` (string)
  - `userIdentifier` (string)
```json
  {
  "projectId": "331daff9-26c1-4c74-b79f-a27b38832d2f",
  "userIdentifier": "d413715a-2a41-42b8-b215-a55bfa3e4305"
 
}

```
```json

{
    "id": "331daff9-26c1-4c74-b79f-a27b38832d2f",
    "name": "Projedddesssdddect X",
    "industry": "Tech",
    "about": "A groundbreaking project",
    "problem": "A tough challenge",
    "solution": "An innovative solution",
    "idea": "A game-changing concept",
    "targetAudience": "Young professionals",
    "competitiveAdvantage": "Unparalleled speed",
    "motivation": "To make a difference",
    "status": "PENDING",
    "stage": "IDEA",
    "createdAt": "2025-04-21T23:43:08.406Z",
    "encadrants": [
        {
            "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
            "firstName": "walid",
            "lastName": "waldoo",
            "email": "zr.nesal@esi-sba.dz"
        }
    ]
}

```
### 5. **Add Jury Member to a Project**
- **Method:** `POST`
- **Route:** `/projects/add-jury`
- **Description:** Add a jury member to a project.
- **Request Body:** 
  - `projectId` (string)
  - `userIdentifier` (string)

```json
{
  "projectId": "331daff9-26c1-4c74-b79f-a27b38832d2f",
  "userIdentifier": "d413715a-2a41-42b8-b215-a55bfa3e4305"

}
```json
{
    "id": "331daff9-26c1-4c74-b79f-a27b38832d2f",
    "name": "Projedddesssdddect X",
    "industry": "Tech",
    "about": "A groundbreaking project",
    "problem": "A tough challenge",
    "solution": "An innovative solution",
    "idea": "A game-changing concept",
    "targetAudience": "Young professionals",
    "competitiveAdvantage": "Unparalleled speed",
    "motivation": "To make a difference",
    "status": "PENDING",
    "stage": "IDEA",
    "createdAt": "2025-04-21T23:43:08.406Z",
    "juryMembers": [
        {
            "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
            "firstName": "walid",
            "lastName": "waldoo",
            "email": "zr.nesal@esi-sba.dz"
        }
    ]
}

```


### 6. **Get Projects Without Encadrants**
- **Method:** `GET`
- **Route:** `/projects/noencadrants`

- **Description:** Get all projects that don't have any encadrants.

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


### 7. **Search Projects by Name**
- **Method:** `GET`
- **Route:** `/projects/search/name/proj...
- **Description:** Search for projects by name.
- **Request Parameters:** 
  - `name` (string)
  
```json
    {
        "id": "5d1734a7-58e0-48b5-8abd-f2489efc88c3",
        "name": "Project X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-03-22T00:49:20.224Z",
        "owners": [
            {
                "id": "976370b6-04f1-47d4-91ed-249d1faba931",
                "email": "zr.nessal@esi-sba.dz",
                "firstName": "John",
                "lastName": "Doe"
            }
        ]
    },
    {
        "id": "3c25716d-c6b3-4ba0-b7e3-c07e87a43c56",
        "name": "Projedddct X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-03-22T02:32:55.621Z",
        "owners": [
            {
                "id": "976370b6-04f1-47d4-91ed-249d1faba931",
                "email": "zr.nessal@esi-sba.dz",
                "firstName": "John",
                "lastName": "Doe"
            }
        ]
    },
    {
        "id": "decb83bd-5aca-4fb1-9772-fc48dc19110f",
        "name": "Projedddeect X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-04-08T14:36:27.656Z",
        "owners": [
            {
                "id": "976370b6-04f1-47d4-91ed-249d1faba931",
                "email": "zr.nessal@esi-sba.dz",
                "firstName": "John",
                "lastName": "Doe"
            }
        ]
    }

```

### 8. **Search Projects by Owner**
- **Method:** `GET`
- **Route:** `/projects/search/owner/walid`
- **Description:** Search for projects by owner's name.
- **Request Parameters:** 
  - `ownerName` (string)

```json
    {
        "id": "331daff9-26c1-4c74-b79f-a27b38832d2f",
        "name": "Projedddesssdddect X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-04-21T23:43:08.406Z",
        "owners": [
            {
                "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
                "email": "zr.nesal@esi-sba.dz",
                "firstName": "walid",
                "lastName": "waldoo"
            }
        ]
    },
    {
        "id": "c10f639b-4ba3-4f75-9c6a-baefed86a7f3",
        "name": "Projedddedddect X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-04-16T16:16:57.252Z",
        "owners": [
            {
                "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
                "email": "zr.nesal@esi-sba.dz",
                "firstName": "walid",
                "lastName": "waldoo"
            }
        ]
    },
    {
        "id": "9ed2b973-bf7f-4008-8304-2e65eb2afb26",
        "name": "Projedddessdddect X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-04-21T23:37:47.076Z",
        "owners": [
            {
                "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
                "email": "zr.nesal@esi-sba.dz",
                "firstName": "walid",
                "lastName": "waldoo"
            }
        ]
    },
    {
        "id": "61e08a88-9692-4723-ae99-5f037ac57f48",
        "name": "Projedddsesssdddect X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-04-21T23:50:29.873Z",
        "owners": [
            {
                "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
                "email": "zr.nesal@esi-sba.dz",
                "firstName": "walid",
                "lastName": "waldoo"
            }
        ]
    },
    {
        "id": "5ae91bb0-8ab9-4724-9c0d-be4c8b4847aa",
        "name": "Projedddedddect X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-04-16T16:16:16.674Z",
        "owners": [
            {
                "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
                "email": "zr.nesal@esi-sba.dz",
                "firstName": "walid",
                "lastName": "waldoo"
            }
        ]
    }

```

### 9. **Get All Projects**
- **Method:** `GET`
- **Route:** `/projects`
- **Description:** Get a list of all projects.
```json

  {
        "id": "67bb0277-1804-4fdb-bb7b-e382fc79d913",
        "name": "Projedddedddect X",
        "industry": "Tech",
        "about": "A groundbreaking project",
        "problem": "A tough challenge",
        "solution": "An innovative solution",
        "idea": "A game-changing concept",
        "targetAudience": "Young professionals",
        "competitiveAdvantage": "Unparalleled speed",
        "motivation": "To make a difference",
        "status": "PENDING",
        "stage": "IDEA",
        "createdAt": "2025-04-08T14:55:22.318Z",
        "owners": [
            {
                "id": "976370b6-04f1-47d4-91ed-249d1faba931",
                "firstName": "John",
                "lastName": "Doe",
                "email": "zr.nessal@esi-sba.dz"
            }
        ],
        "members": [
            {
                "id": "0d29c8b7-809b-4746-aa5a-5170a5216501",
                "firstName": "Joddhn",
                "lastName": "Dddoe",
                "email": "varaforskare@gmail.com"
            },
            {
                "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
                "firstName": "walid",
                "lastName": "waldoo",
                "email": "zr.nesal@esi-sba.dz"
            }
        ],
        "encadrants": [
            {
                "id": "8fa7a297-75d1-49a9-986e-fee3ee7da3da",
                "firstName": "walid",
                "lastName": "waldoo",
                "email": "dorianyacine@gmail.com"
            },
            {
                "id": "d413715a-2a41-42b8-b215-a55bfa3e4305",
                "firstName": "walid",
                "lastName": "waldoo",
                "email": "zr.nesal@esi-sba.dz"
            }
        ]
    }

```

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
