# Development/Setup

This guide will walk you through setting up the Fin-Agentix backend for local development.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

*   [Node.js](https://nodejs.org/) (which includes npm)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/fin-agentix-backend.git
    cd fin-agentix-backend
    ```

2.  **Install dependencies:**

    Navigate to the `backend` directory and install the necessary npm packages.

    ```bash
    cd backend
    npm install
    ```

## Running the Application

Once the dependencies are installed, you can start the local development server.

```bash
npm start
```

The application will be running on `http://localhost:3000`.

## Database Setup

This project uses Knex.js for database migrations and seeding.

*   **Run migrations:** To create the necessary tables in your database, run the following command:

    ```bash
    npm run db:migrate
    ```

*   **Seed the database:** To populate the database with initial data, run:

    ```bash
    npm run db:seed
    ```
