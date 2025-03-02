# API Documentation for Play Dhukuti Functionality

## 1. Get Contribution Options API

**Description:** This API retrieves the available contribution options based on the selected frequency (weekly, fortnightly, monthly).

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "weekly": [
        { "amount": 100, "availability": "Available" },
        { "amount": 250, "availability": "Coming Soon" },
        { "amount": 500, "availability": "Coming Soon" }
    ],
    "fortnightly": [
        { "amount": 250, "availability": "Available" },
        { "amount": 500, "availability": "Available" },
        { "amount": 1000, "availability": "Coming Soon" }
    ],
    "monthly": [
        { "amount": 500, "availability": "Available" },
        { "amount": 1000, "availability": "Available" },
        { "amount": 2500, "availability": "Available" }
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
    "message": "Contribution options not found."
}
```

---

## 2. Get Group Size Options API

**Description:** This API retrieves the available group size options for the Dhukuti game.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "groupSizes": [
        { "size": 5 },
        { "size": 8 },
        { "size": 10 }
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
    "message": "Group size options not found."
}
```

---

## 3. Subscribe to Dhukuti API ( Post )

**Description:** This API allows users to subscribe to the Dhukuti game with their selected options (frequency, contribution amount, group size).

**Request Body:**
```json
{
    "frequency": "weekly",
    "memberCount": 5,
    "contributionAmount": 100,
    "timestamp": "2023-02-22T10:00:00Z"
}
```

**Response:**
- **Success (201 Created):**
```json
{
    "success": true,
    "message": "Successfully subscribed to Dhukuti."
}
```
- **Failure (400 Bad Request):**
```json
{
    "success": false,
    "message": "Error subscribing to Dhukuti."
}
```

---

## 4. Get Dhukuti Rules API

**Description:** This API retrieves the rules of the Dhukuti game based on the selected frequency and group size.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "rules": "Members will contribute the selected amount based on the chosen frequency. The total sum collected will be given to the winner member for that specific period. A dhukuti cycle is completed when all members receive their contributed amount back."
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
    "message": "Rules not found."
}
```