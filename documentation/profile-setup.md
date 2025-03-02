# API Documentation for Profile Setup Functionality

## 1. Upload Profile Photo API (POST)

**Description:** This API allows users to upload their profile photo during the profile setup process.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Request Body:**
- `multipart/form-data` containing the image file.

**Response:**
- **Success (200 OK):**
```json
{
    "success": true,
    "message": "Profile photo uploaded successfully."
}
```
- **Failure (400 Bad Request):**
```json
{
    "success": false,
    "message": "Error uploading profile photo."
}
```

---

## 2. Verify Email API

**Description:** This API verifies the user's email address during the profile setup process.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Request Body:**
```json
{
    "email": "user@example.com"
}
```

**Response:**
- **Success (200 OK):**
```json
{
    "success": true,
    "message": "Email verified successfully."
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
    "message": "Email not found."
}
```

---

## 3. Verify Phone Number API

**Description:** This API verifies the user's phone number during the profile setup process.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Request Body:**
```json
{
    "phone": "1234567890"
}
```

**Response:**
- **Success (200 OK):**
```json
{
    "success": true,
    "message": "Phone number verified successfully."
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
    "message": "Phone number not found."
}
```

---

## 4. Save Profile API

**Description:** This API saves the user's profile information during the profile setup process.

**Request Headers:**
- `Authorization: Bearer <token>` // JWT or session token for authentication

**Request Body:**
```json
{
    "fullname": "John Doe",
    "email": "user@example.com",
    "phone": "1234567890"
}
```

**Response:**
- **Success (201 Created):**
```json
{
    "success": true,
    "message": "Profile saved successfully."
}
```
- **Failure (400 Bad Request):**
```json
{
    "success": false,
    "message": "Error saving profile."
}
```