# Triple S Backend API

This is the backend API for the Triple S project. It provides various endpoints for managing users, reviews, and other functionalities related to the Triple S platform.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Middleware](#middleware)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/triple-s-backend.git
    cd triple-s-backend/backend_Api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create a `.env` file in the `backend_Api` directory and add the necessary environment variables:
    ```env
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/triple-s
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST /auth/login**: Login a user
- **POST /auth/register**: Register a new user

### Users

- **GET /users**: Get all users
- **GET /users/:id**: Get a user by ID
- **PUT /users/:id**: Update a user by ID
- **DELETE /users/:id**: Delete a user by ID

### Reviews

- **GET /reviews**: Get all reviews
- **POST /reviews**: Create a new review
- **GET /reviews/:id**: Get a review by ID
- **PUT /reviews/:id**: Update a review by ID
- **DELETE /reviews/:id**: Delete a review by ID

### Talent Requirements

- **GET /requirements**: Get all talent requirements
- **POST /requirements**: Create a new talent requirement
- **GET /requirements/:id**: Get a talent requirement by ID
- **PUT /requirements/:id**: Update a talent requirement by ID
- **DELETE /requirements/:id**: Delete a talent requirement by ID

## Models

- **coachUser.js**: Model for coach users
- **review.js**: Model for reviews
- **scoutUser.js**: Model for scout users
- **talentDashboard.js**: Model for talent dashboards
- **talentRequirements.js**: Model for talent requirements
- **talentUser.js**: Model for talent users

## Middleware

- **auth.js**: Middleware for authentication
- **coachAuth.js**: Middleware for coach authentication
- **scoutAuth.js**: Middleware for scout authentication

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.