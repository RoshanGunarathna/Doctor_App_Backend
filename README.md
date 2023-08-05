# Doctor App

This is an Express project that uses MySQL as the database. It includes a user registration and utilizes various utilities and services for user management.

## Installation and Setup

Follow the steps below to set up the project and get it running on your system.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

1. [Node.js](https://nodejs.org) (along with npm, which comes with Node.js)
2. [XAMPP](https://www.apachefriends.org/index.html) (to set up MySQL)

### Step 1: Clone the Project

Clone the project repository to your local machine using Git:

```bash
git clone https://github.com/Thevindu-Senanayake/Doctor_App_Backend.git
```

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd Doctor_App_Backend
yarn
```

### Step 3: Database Configuration

1. Launch XAMPP and start the MySQL server.

2. Create a new MySQL database using phpMyAdmin or any MySQL client. Choose a name for your database, and note it down as `<your_database_name>`.

3. Update the `.env` file in the project root directory with your MySQL database configuration.

### Step 4: Start the Server

To start the Express server, run the following command:

```node
yarn dev
```

The server will be running on the port specified in your `.env` file or the default port 3000.

## Available Route - User Registration

This project includes a user registration route accessible at:

### Route: POST /api/v1/register

This route allows users to register with the application.

### Request body parameters

```json
{
  "name": "John Doe",
  "phoneNumber": "1234567890",
  "password": "your_password",
  "nic": "NIC123456789"
}
```

- name (string, required): User's full name.
- phoneNumber (string, required): User's phone number.
- password (string, required): User's password.
- nic (string, required): User's National Identification Card number.

### Response

```json
{
  "token": "your_generated_jwt"
}
```

- If the registration fails due to validation or any other error, the server will respond with an error message:

```json
{
  "message": "Error message here"
}
```

In the event of a registration error, fear not! The server will gracefully handle it with an informative error message.
