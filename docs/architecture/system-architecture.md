# System Architecture - Fin-Agentix India

## Overview
Fin-Agentix India is built on a microservices architecture optimized for the Indian financial services market.

## High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │  Mobile App     │    │  Partner APIs   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼──────────────┐
                    │      API Gateway           │
                    │   (Rate Limiting, Auth)    │
                    └─────────────┬──────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
    ┌─────────▼────────┐ ┌──────▼──────┐ ┌────────▼────────┐
    │ Auth Service     │ │ Loan Service │ │  KYC Service    │
    └──────────────────┘ └─────────────┘ └─────────────────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                    ┌─────────────▼──────────────┐
                    │     AI/ML Services         │
                    │  (Credit Scoring, Risk)    │
                    └─────────────┬──────────────┘
                                 │
                    ┌─────────────▼──────────────┐
                    │    Data Layer              │
                    │ PostgreSQL + MongoDB       │
                    └────────────────────────────┘
```

## Indian Compliance Layer
- RBI guidelines implementation
- Data localization requirements
- Audit trail management
- Regulatory reporting automation
