# API Documentation for Group Information Functionality

## 1. Get Group Information API

**Endpoint:** `GET`

**Description:** This API retrieves detailed information about the current Dhukuti round, including total rounds, contribution type, end date, total pool, member count, and next winner announcement.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "currentRound": 1,
    "totalRounds": 10,
    "contributionType": "Fortnightly Contribution",
    "endDate": "Week of 27 June",
    "duration": "5 months after starting date",
    "totalPool": 120000,
    "memberCount": 10,
    "nextWinner": {
        "date": "27th February, Thursday",
        "countdown": "2 days 14 hours"
    },
    "biddingOpens": {
        "date": "22nd February",
        "countdown": "1 day 6 hours"
    }
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
    "message": "Group information not found."
}
```

---

## 2. Get Group Members API

**Endpoint:** `GET`

**Description:** This API retrieves information about the members of the current Dhukuti group, including their status and contributions.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "members": [
        {
            "id": 1,
            "name": "Where's The New Update",
            "profile-avatar": "🏰",
            "dhukuti-status": true,
            "dhukutiBids": true
        },
        {
            "id": 2,
            "name": "Goblin Builder Fanclub",
            "profile-avatar": "👾",
            "dhukuti-status": false,
            "dhukutiBids": true
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

## 3. Update Group Information API

**Endpoint:** `PUT`

**Description:** This API updates the group's information, such as total pool amount or member count.

**Request Body:**
```json
{
    "totalPool": 120000,
    "memberCount": 10
}
```

**Response:**
- **Success (200 OK):**
```json
{
    "success": true,
    "message": "Group information updated successfully."
}
```
- **Failure (400 Bad Request):**
```json
{
    "success": false,
    "message": "Error updating group information."
}
```