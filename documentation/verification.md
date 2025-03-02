# API Documentation for Verification Functionality

## 1. Submit Verification Information API

**Description:** This API allows users to submit their identity verification information, including personal details and identification documents.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Request Body:**
```json
{
    "fullName": "John Doe",
    "dob": "YYYY-MM-DD",
    "gender": "male/female/other",
    "address": "123 Main St, City, State, Postcode", (city, state postal code)
    "phone": "1234567890", (number  country code)
    "email": "user@example.com",
    "documents": {
        "bankStatement": "file.pdf",
        "payslip": "file.pdf",
        "coe": "file.pdf"
    }
}
```

**Response:**
- **Success (201 Created):**
```json
{
    "success": true,
    "message": "Verification information submitted successfully."
}
```
- **Failure (400 Bad Request):**
```json
{
    "success": false,
    "message": "Error submitting verification information."
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
    "message": "User not found."
}
```

---

## 2. Get Verification Status API

**Description:** This API retrieves the current verification status of the user.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Response:**
- **Success (200 OK):**
```json
{
    "status": "verified/unverified/pending",
    "message": "Your verification status is currently verified."
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
    "message": "Verification status not found."
}
```