# Your API Documentation

## Register a new user

- **Summary:** Register a new user
- **Description:** Create a new user account.
- **Method:** `POST`
- **Endpoint:** `/register`
- **Request Body:**
  - Content Type: `application/json`
  - Schema:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Responses:**
  - **201:** User created successfully
  - **400:** Bad request
  - **401:** Unauthorized

## Log in

- **Summary:** Log in
- **Method:** `POST`
- **Endpoint:** `/login`
- **Request Body:**
  - Content Type: `application/json`
  - Schema:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Responses:**
  - **200:** Access token provided
  - **401:** Unauthorized

## Update Transaction Status

- **Summary:** Update Transaction Status
- **Method:** `POST`
- **Endpoint:** `/update-transaction`
- **Request Body:**
  - Content Type: `application/json`
- **Responses:**
  - **200:** Payment success
  - **400:** Payment failed

## Reset Password Token

- **Summary:** Get Token for Password Reset
- **Method:** `POST`
- **Endpoint:** `/reset-password`
- **Request Body:**
  - Content Type: `application/json`
  - Schema:
    ```json
    {
      "email": "string"
    }
    ```
- **Responses:**
  - **201:** Reset token generated
  - **400:** Email does not exist

## Reset Password

- **Summary:** Reset Password
- **Method:** `PATCH`
- **Endpoint:** `/reset-password/:token`
- **Request Body:**
  - Content Type: `application/json`
  - Schema:
    ```json
    {
      "password": "string"
    }
    ```
- **Responses:**
  - **200:** Password changed successfully
  - **400:** Token does not exist

## Change Password

- **Summary:** Change Password
- **Method:** `PUT`
- **Endpoint:** `/change-password`
- **Request Body:**
  - Content Type: `application/json`
  - Schema:
    ```json
    {
      "oldPassword": "string",
      "newPassword": "string"
    }
    ```
- **Responses:**
  - **200:** Password has been updated
  - **401:** Old password is incorrect
  - **401:** New password cannot be the same as old password

## Get User Profile

- **Summary:** Get User Profile
- **Method:** `GET`
- **Endpoint:** `/profile`
- **Responses:**
  - **200:** User profile data
  - **401:** User not found

## Update User Profile

- **Summary:** Update User Profile
- **Method:** `PATCH`
- **Endpoint:** `/profile`
- **Request Body:**
  - Content Type: `application/json`
  - Schema:
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "address": "string",
      "postalCode": "string",
      "phoneNumber": "string",
      "imageUrl": "string"
    }
    ```
- **Responses:**
  - **201:** Profile has been created successfully
  - **400:** User not found

## Get Schedule by User

- **Summary:** Get Schedule by User
- **Method:** `GET`
- **Endpoint:** `/get-schedule-user`
- **Responses:**
  - **200:** Schedule data for the user
  - **401:** User not found

## Get All Services

- **Summary:** Get All Services
- **Method:** `GET`
- **Endpoint:** `/services`
- **Responses:**
  - **200:** List of all services

## Get Service by ID

- **Summary:** Get Service by ID
- **Method:** `GET`
- **Endpoint:** `/services/:id`
- **Responses:**
  - **200:** Service details
  - **404:** Service not found

## Add Service

- **Summary:** Add Service
- **Method:** `POST`
- **Endpoint:** `/services`
- **Request Body:**
  - Content Type: `application/json`
  - Schema:
    ```json
    {
      "formData": "object"
    }
    ```
- **Responses:**
  - **201:** Service has been added
  - **400:** Service not found

## Delete Service by ID

- **Summary:** Delete Service by ID
- **Method:** `DELETE`
- **Endpoint:** `/services/:id`
- **Responses:**
  - **200:** Service has been deleted
  - **400:** Service not found

## Get Cart

- **Summary:** Get Cart
- **Method:** `POST`
- **Endpoint:** `/cart`
- **Request Body:**
  - Content Type: `application/json`
- **Responses:**
  - **200:** List of items in the cart

## Initiate MidTrans Payment

- **Summary:** Initiate MidTrans Payment
- **Method:** `POST`
- **Endpoint:** `/midtrans-payment`
- **Request Body:**
  - Content Type: `application/json`
- **Responses:**
  - **200:** Transaction created
  - **400:** Error initiating transaction

## Get All Transactions

- **Summary:** Get All Transactions
- **Method:** `GET`
- **Endpoint:** `/all-transaction`
- **Responses:**
  - **200:** List of all transactions

## Get Transaction by ID

- **Summary:** Get Transaction by ID
- **Method:** `GET`
- **Endpoint:** `/get-transaction/:id`
- **Responses:**
  - **200:** Transaction details
  - **400:** Data not found

## Get Successful Transactions

- **Summary:** Get Successful Transactions
- **Method:** `GET`
- **Endpoint:** `/get-success-transaction`
- **Responses:**
  - **200
