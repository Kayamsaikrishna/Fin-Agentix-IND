#!/bin/bash
# Deploy to Staging Environment

echo "🚀 Deploying Fin-Agentix India to Staging..."

# Build applications
npm run build

# Run tests
npm run test

# Deploy to staging
kubectl apply -f infrastructure/kubernetes/ --namespace=fin-agentix-staging

echo "✅ Staging deployment completed!"
