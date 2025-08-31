#!/bin/bash
# Fin-Agentix India - Install Dependencies Script

echo "🚀 Installing Fin-Agentix India Dependencies..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check Python version  
if ! command -v python3 &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.11+"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Install mobile dependencies
echo "📦 Installing mobile dependencies..."
cd mobile-app && npm install && cd ..

# Install ML dependencies
echo "📦 Installing ML dependencies..."
cd ml-services && pip install -r requirements.txt && cd ..

echo "✅ All dependencies installed successfully!"
