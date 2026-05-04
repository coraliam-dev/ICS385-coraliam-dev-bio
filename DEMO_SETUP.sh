#!/bin/bash

# Two-App Setup for Tuesday Code Review Demo
# Run this 30 minutes before your presentation

echo "🚀 Setting up for Code Review Demo..."
echo ""

# Check if week12 exists
if [ ! -d "week12/term-project" ]; then
  echo "❌ week12/term-project not found"
  exit 1
fi

# Check if week14 exists
if [ ! -d "week14/term-project" ]; then
  echo "❌ week14/term-project not found"
  exit 1
fi

echo "✅ Both project directories found"
echo ""
echo "📋 Pre-Demo Setup Instructions:"
echo ""
echo "1️⃣  Open TWO terminal windows side-by-side"
echo ""
echo "2️⃣  TERMINAL 1 (Marketing Site — Port 4173):"
echo "   cd week12/term-project"
echo "   npm run preview"
echo ""
echo "3️⃣  TERMINAL 2 (Backend + Auth — Port 3000):"
echo "   cd week14/term-project"
echo "   npm start"
echo ""
echo "4️⃣  Browser Tabs to Open (in order):"
echo "   Tab 1: http://localhost:4173/  (marketing page)"
echo "   Tab 2: http://localhost:3000/login  (login page)"
echo "   Tab 3: Ready for dashboard after login"
echo ""
echo "5️⃣  Test Credentials (for local login):"
echo "   Email: (check your .env or test user in seed script)"
echo "   Password: (check your test user credentials)"
echo ""
echo "✨ Once both servers are running, your demo is ready!"
echo ""
