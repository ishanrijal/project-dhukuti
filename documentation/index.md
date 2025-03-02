# API Documentation for Dhukuti Application

## 1. Check Eligibility API

**Endpoint:** `POST`

**Description:** This API checks the user's eligibility for participating in Dhukuti.

**Response:**
- **Success (200 OK):**
```json
{
    "eligible": true, // true if eligible, false otherwise
    "message": "Eg: You are eligible to participate in Dhukuti."
}
```
- **Failure (400 Bad Request):**
```json
{
    "eligible": false,
    "message": "Eg: You are not eligible to participate in Dhukuti."
}
```

## 2 Get User Balance API

**Endpoint:** `GET`

**Description:** This API retrieves the user's current balance.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "balance": 5000.00, // User's current balance
    "currency": ""   // Currency type
}
```
- **Failure (401 Unauthorized):**
```json
{
    "message": "Unauthorized access."
}
```

---

## 4. Get Leaderboard Data API

**Endpoint:** `GET`

**Description:** This API retrieves the leaderboard data based on the selected tab (region, national, global).

**Query Parameters:**
- `tabId`: The identifier for the leaderboard tab (e.g., `region`, `national`, `global`).

**Response:**
- **Success (200 OK):**
```json
{
    "data": [
        {
            "id": 1,
            "name": "Eiden",
            "score": 2430,
            "username": "@eiden",
            "avatar": "https://cdn-icons-png.flaticon.com/512/5998/5998953.png",
            "status": "online"
        },
    ]
}
```
- **Failure (404 Not Found):**
```json
{
    "message": "Leaderboard data not found."
}
```

---

## 5. Update User Profile API

**Endpoint:** `PUT`

**Description:** This API updates the user's profile information, including the profile picture.

**Request Body:**
```json
{
    "username": "string", // New username
    "avatar": "string"    // URL or file reference for the new avatar
}
```

**Response:**
- **Success (200 OK):**
```json
{
    "success": true,
    "message": "Profile updated successfully."
}
```
- **Failure (400 Bad Request):**
```json
{
    "success": false,
    "message": "Error updating profile."
}
```

---

Please check the following:
1. Finding YOur group
2. Place your bid on group-info.html