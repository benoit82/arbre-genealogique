#!/bin/bash

# Configure main branch protection
echo "🔒 Configuring main branch protection..."

# Get the branch protection configuration
CONFIG_FILE=$(cat .github/branch-protection.json)

# Apply branch protection
gh api repos/benoit82/arbre-genealogique/branches/main/protection \
  --method PUT \
  --body "$CONFIG_FILE"

echo "✅ Main branch protection configured"
echo ""
echo "📋 Protection rules applied:"
echo "  - Require PR reviews (min 1 approval)"
echo "  - Require code owner review"
echo "  - Require status checks (CI/validation, quality-gate)"
echo "  - Allow squash merges only"
echo "  - Prevent force pushes"
echo "  - Prevent deletion"
echo "  - Require conversation resolution"