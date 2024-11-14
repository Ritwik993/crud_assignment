# Assignment
## User Management REST API

This project is a Node.js and Express.js backend application for performing CRUD (Create, Read, Update, Delete) operations on a MongoDB database for a User resource. The application includes authentication and input validation and is tested using Jest.

## Features

- User CRUD operations with REST API endpoints
- Input validation and error handling
- Password hashing with bcrypt
- JWT-based authentication for securing sensitive operations (update and delete)
- Middleware for token verification

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: For password hashing
- **jsonwebtoken**: For token generation and verification
- **dotenv**: For environment variable management
- **cookie-parser**: For parsing cookies
- **Jest**: For testing

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/user-management-api.git

2. Run
   ```bash
   npm install

3. Set up .env
- MONGO_URI=mongodb://localhost:27017/userdb
- JWT_SECRET_KEY=ABCXFDJDHBFGJVND
- PORT=5000
  
4. To run
    ```bash
    node server.js


