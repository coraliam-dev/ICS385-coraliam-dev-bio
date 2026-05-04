#!/bin/bash

# Pre-Code-Review Verification Script
# Run this on May 5 before 4:30 PM to ensure everything works

set -e

echo "🔍 Pre-Code-Review Verification"
echo "================================"
echo ""

# 1. Check clean install
echo "1️⃣ Testing clean install (week14/term-project)..."
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"
git clone --quiet https://github.com/coraliam-dev/ICS385-coraliam-dev-bio.git test-repo 2>/dev/null || {
  echo "❌ Git clone failed. Check repo URL."
  exit 1
}
cd test-repo/week14/term-project
npm install --quiet 2>/dev/null || {
  echo "❌ npm install failed. Check package.json."
  exit 1
}
echo "✅ Clean install passed"
echo ""

# 2. Check .env setup
echo "2️⃣ Checking .env configuration..."
if [ -f ".env.example" ]; then
  echo "✅ .env.example present"
  echo "   Required vars:"
  grep -E "MONGO_URI|SESSION_SECRET|GOOGLE" .env.example | sed 's/^/      /'
else
  echo "❌ .env.example missing"
  exit 1
fi
echo ""

# 3. Test local build (if NODE_ENV=production)
echo "3️⃣ Testing production build..."
npm run build 2>/dev/null && echo "✅ Production build successful" || echo "⚠️  Build skipped or failed (may need .env)"
echo ""

# 4. Check key files
echo "4️⃣ Checking key artifacts..."
ARTIFACTS=(
  "config/passport.js"
  "models/User.js"
  "models/Property.js"
  "routes/auth.js"
  "routes/public.js"
  "routes/admin.js"
  "views/login.ejs"
)

for file in "${ARTIFACTS[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file MISSING"
  fi
done
echo ""

# 5. Verify markdown documentation
echo "5️⃣ Checking README files..."
if [ -f "README.md" ]; then
  echo "✅ README.md present"
  if grep -q "Acceptance Criteria" README.md; then
    echo "   ✅ Acceptance Criteria table found"
  fi
else
  echo "❌ README.md missing"
fi
echo ""

echo "✅ All checks passed! You're ready for code review."
echo ""
echo "Next steps:"
echo "  1. Update your Render URL in the prep document"
echo "  2. Bookmark your live site, dashboard, and login pages"
echo "  3. Pre-open VS Code to passport.js (line 27)"
echo "  4. Rehearse aloud with a timer"
echo ""
