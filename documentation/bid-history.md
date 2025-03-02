# API Documentation for Bid History Functionality

## 1. Get Group Member Information

**Request:** `GET`

**Description:** This API retrieves the user's group details about each bid and the associated group members.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "bids": [
        {
            "id": 1,
            "total-members": 12,
            "pool-amount": "2023-02-22T10:00:00Z",
            "status": "won",
            "groupMember": {
                "name": "John Doe",
                "role": "Group Leader",
                "avatar": "https://i.pravatar.cc/150?img=1"
            }
        },
        {
            "id": 2,
            "amount": 50,
            "date": "2023-02-21T15:30:00Z",
            "status": "lost",
            "groupMember": {
                "name": "Jane Smith",
                "role": "Member",
                "avatar": "https://i.pravatar.cc/150?img=2"
            }
        }
        // More bid objects...
    ]
}
```
- **Failure (401 Unauthorized):**
```json
{
    "message": "Unauthorized access."
}
```
- **Failure (404 Not Found):**
```json
{
    "message": "Bid history not found."
}
```

---

## 2. Get Group Member Information API

**Endpoint:** `GET /api/group-members`

**Description:** This API retrieves information about group members associated with the user's bids.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "members": [
        {
            "id": 1,
            "name": "John Doe",
            "role": "Group Leader",
            "avatar": "https://i.pravatar.cc/150?img=1",
            "bids": 3,
            "wins": 1
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "role": "Member",
            "avatar": "https://i.pravatar.cc/150?img=2",
            "bids": 2,
            "wins": 0
        }
        // More member objects...
    ]
}
```
- **Failure (401 Unauthorized):**
```json
{
    "message": "Unauthorized access."
}
```
- **Failure (404 Not Found):**
```json
{
    "message": "Group members not found."
}
```

---

## 3. Get Recent Activity API

**Endpoint:** `GET /api/recent-activity`

**Description:** This API retrieves the recent activity related to the user's bids and group members.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "activities": [
        {
            "id": 1,
            "type": "bid",
            "description": "New bid placed by John Doe",
            "timestamp": "2023-02-22T10:00:00Z"
        },
        {
            "id": 2,
            "type": "member",
            "description": "New member joined: Sarah Connor",
            "timestamp": "2023-02-21T15:30:00Z"
        }
        // More activity objects...
    ]
}
```
- **Failure (401 Unauthorized):**
```json
{
    "message": "Unauthorized access."
}
```
- **Failure (404 Not Found):**
```json
{
    "message": "Recent activity not found."
}
```