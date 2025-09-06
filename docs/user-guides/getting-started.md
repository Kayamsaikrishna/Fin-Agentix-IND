# User Guides/Getting Started

Welcome to the Fin-Agentix India user guide. This guide will help you get started with using the Fin-Agentix API.

## Introduction

Fin-Agentix is a platform for managing loan applications and KYC verification. The API provides a set of endpoints for interacting with the platform.

## API Endpoints

The following are the API endpoints for the Fin-Agentix backend:

### Authentication

*   `POST /api/v1/auth/register` - Register a new user
*   `POST /api/v1/auth/login` - Login a user

### Loan Applications

*   `POST /api/v1/loans` - Apply for a loan
*   `GET /api/v1/loans/:id` - Get a loan application by ID
*   `GET /api/v1/loans/user/:userId` - Get all loan applications for a user
*   `PUT /api/v1/loans/:id/status` - Update the status of a loan application

### KYC Verification

*   `POST /api/v1/kyc` - Submit a KYC verification request
*   `GET /api/v1/kyc/:userId` - Get the KYC status for a user
*   `PUT /api/v1/kyc/:userId/status` - Update the KYC status for a user

## Example Usage

Here is an example of how to register a new user using `curl`:

```bash
curl -X POST \
  http://localhost:3000/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```
