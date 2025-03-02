# API Documentation for Leaderboard Functionality

## 1. Get Leaderboard Data API

**Endpoint:** `GET`

**Description:** This API retrieves the leaderboard data based on the selected tab (region, national, global), including player rankings, scores, and statuses.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Query Parameters:**
- `tab`: The tab to retrieve data for (e.g., `region`, `national`, `global`).

**Response:**
- **Success (200 OK):**
```json
{
    "players": [
        {
            "id": 1,
            "name": "Eiden",
            "score": 2430,
            "username": "@eiden",
            "avatar": "https://cdn-icons-png.flaticon.com/512/5998/5998953.png",
            "type" : national // this has options for region national or global.
        }
        // More player objects...
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
    "message": "Leaderboard data not found."
}
```