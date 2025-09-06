# API Endpoints

This document provides a detailed list of all available API endpoints for the Fin-Agentix India platform. All endpoints are secured and require proper authentication and authorization.

## Authentication

*   `POST /api/v1/auth/register` - Register a new user.
*   `POST /api/v1/auth/login` - Login a user and receive a JWT token.

## Loan Applications

*   `POST /api/v1/loans` - Apply for a new loan.
*   `GET /api/v1/loans/:id` - Get the details of a specific loan application by its ID.
*   `GET /api/v1/loans/user/:userId` - Get all loan applications for a specific user.
*   `PUT /api/v1/loans/:id/status` - Update the status of a loan application (Admin only).

## KYC Verification

*   `POST /api/v1/kyc` - Submit KYC documents for verification.
*   `GET /api/v1/kyc/:userId` - Get the KYC status for a specific user.
*   `PUT /api/v1/kyc/:userId/status` - Update the KYC status for a user (Admin only).

## Aadhaar Verification

*   `POST /api/v1/verify/aadhaar` - Initiate Aadhaar OTP verification.
*   `POST /api/v1/verify/aadhaar/otp` - Submit OTP for Aadhaar verification.

## PAN Verification

*   `POST /api/v1/verify/pan` - Verify PAN card details against the Income Tax Department database.

## GST Verification (for Businesses)

*   `POST /api/v1/verify/gstin` - Verify GSTIN details for a business.

## Bank Account Verification

*   `POST /api/v1/verify/bank` - Verify bank account details using the penny-drop method or through a linked Account Aggregator.