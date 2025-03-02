# API Documentation for Statement Functionality

## 1. Get User Statement API

**Description:** This API retrieves the user's statement information, including contributions, winnings, and transaction history.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "statements": [
        {
            "id": 1,
            "title": "Dhukuti Contribution",
            "date": "Feb 15, 2024",
            "amount": 500.00,
            "type": "contribution"
        },
        {
            "id": 2,
            "title": "Dhukuti Winning Received",
            "date": "Feb 1, 2024",
            "amount": 5000.00,
            "type": "winning"
        }
        // More statement objects...
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
    "message": "Statements not found."
}
```

---

## 2. Get Loggedin user information.

**Description:** This API retrieves the inforamtion like their card infromation like card number, type, name on card, total money constibuted, total money won.