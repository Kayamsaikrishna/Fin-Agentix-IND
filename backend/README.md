
# Fin-Agentix India Backend

This is the backend for the Fin-Agentix India application. It is built with Node.js, Express, and TypeScript.

## Getting Started

To get started with the Fin-Agentix backend, you will need to have Node.js and npm installed on your machine.

### Prerequisites

* Node.js
* npm

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/fin-agentix-backend.git
```

2. Install the dependencies:

```
npm install
```

### Running the application

To run the application, you can use the following command:

```
npm start
```

This will start the application on port 3000.

### Running the tests

To run the tests, you can use the following command:

```
npm test
```

This will run all of the tests in the `src` directory.

## API Endpoints

The following are the API endpoints for the Fin-Agentix backend:

* `POST /api/v1/auth/register` - Register a new user
* `POST /api/v1/auth/login` - Login a user
* `POST /api/v1/loans` - Apply for a loan
* `GET /api/v1/loans/:id` - Get a loan application by ID
* `GET /api/v1/loans/user/:userId` - Get all loan applications for a user
* `PUT /api/v1/loans/:id/status` - Update the status of a loan application
* `POST /api/v1/kyc` - Submit a KYC verification request
* `GET /api/v1/kyc/:userId` - Get the KYC status for a user
* `PUT /api/v1/kyc/:userId/status` - Update the KYC status for a user
