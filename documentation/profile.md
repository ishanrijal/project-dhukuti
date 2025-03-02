# API Documentation for Profile Functionality

## 1. Get User Profile API (Current Logged in User Session Informaiton)

**Description:** This API retrieves the user's profile information, including their name, rating, and profile picture.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "name": "Suyog Baral",
    "rating": 4.39,
    "profilePicture": "assets/images/profile-default.png"
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
    "message": "User profile not found."
}
```

---

---

## 2. Get User Notifications API

**Description:** This API retrieves the user's notifications, such as messages or alerts related to their account.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "notifications": [
        {
            "id": 1,
            "message": "Your email has been verified.",
            "timestamp": "2023-02-22T10:00:00Z"
        },
        {
            "id": 2,
            "message": "New message from support.",
            "timestamp": "2023-02-21T15:30:00Z"
        }
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
    "message": "Notifications not found."
}
```

---

## 4. Delete User Account API

**Description:** This API allows users to delete their account from the platform.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "success": true,
    "message": "Account deleted successfully."
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
    "message": "User account not found."
}
```