Triple S Backend

Overview

Triple S (Scouting Support System) is a backend service designed to connect young talents with scouts and career opportunities globally. The backend is built with TypeScript, using Node.js and Express, with MongoDB as the database.

Features

User Authentication (Signup, Login, Admin Creation)

Role-Based Access Control (Admins, Scouts, Talents)

Talent Filtering & Management

Subscription & Payment Processing

Secure API Endpoints

Installation

Prerequisites

Node.js (v16 or later)

MongoDB (local or cloud instance)

A .env file with required environment variables

Steps to Install & Run

Clone the repository:

git clone https://github.com/your-repo/triple-s-backend.git
cd triple-s-backend

Install dependencies:

npm install

Create a .env file and configure it:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start the server:

npm run dev

API Endpoints

Authentication Routes

POST /api/auth/signup – Register a new user

POST /api/auth/login – Authenticate and log in

POST /api/auth/admin – Create an admin (protected)

Talent Routes

GET /api/talent/profile – Get talent profile

PUT /api/talent/profile – Update talent profile

Scout Routes

GET /api/scouts/filter-talents – Filter talents based on criteria

Admin Routes

GET /api/admin/stats – Retrieve system statistics

GET /api/admin/users – List all users

GET /api/admin/payments – Retrieve payment details

Subscription Routes

POST /api/subscriptions/create-checkout-session – Create a checkout session

Testing

You can test API endpoints using Postman or cURL:

curl -X POST http://localhost:5000/api/auth/login -d '{"email":"user@example.com", "password":"password"}' -H "Content-Type: application/json"

Database Structure

Users: Stores all registered users with roles (Talent, Scout, Admin)

Talents: Stores talent profiles and details

Payments: Stores subscription and transaction details

Security Measures

JWT Authentication for user access control

Role-Based Access Control (RBAC) to manage permissions

Data Validation to ensure integrity

Deployment

To deploy the backend:

Build the project:

npm run build

Deploy on a server or cloud provider like Heroku, AWS, or DigitalOcean.

Ensure the .env file is properly configured in the production environment.

Contribution

Fork the repository

Create a feature branch

Commit changes and push to the branch

Open a pull request

