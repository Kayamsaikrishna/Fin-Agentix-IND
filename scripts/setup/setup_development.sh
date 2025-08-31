#!/bin/bash
# Development Environment Setup

echo "🔧 Setting up Fin-Agentix India development environment..."

# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Setup database
echo "🗄️ Setting up databases..."
docker-compose up -d postgres redis mongodb

# Run migrations
echo "📊 Running database migrations..."
cd backend && npm run db:migrate && npm run db:seed && cd ..

# Setup AWS local
echo "☁️ Setting up AWS LocalStack..."
docker-compose up -d localstack

echo "✅ Development environment ready!"
echo "🚀 Run 'npm run dev' to start development servers"
