# GitHub Branch Protection Strategy

## 🔄 Overview

This document explains the branch protection strategy for the Family Tree Builder project, designed to balance code quality with development velocity.

## 🌿 Branch Structure

```
main (protected)
├── Core validations required: ESLint, TypeScript, Unit Tests, Build
├── Optional validations: E2E Tests (warnings only)
├── Bypass allowed: Admins can bypass PR requirements
└── Merge strategy: Squash merges only
```

## 📋 Validation Requirements

### ✅ **Core Validations** (Required for merge)
- **ESLint**: Code style and linting rules
- **TypeScript**: Type checking and compilation
- **Unit Tests**: Vitest unit test suite
- **Build**: Next.js compilation success

### ⚠️ **Optional Validations** (Warning only)
- **E2E Tests**: Playwright end-to-end tests
- **Performance**: Lighthouse performance scores (future)
- **Security**: Security vulnerability scans (future)

## 🔒 Protection Rules

### **Required for Merge**
```json
{
  "required_status_checks": [
    {
      "context": "ci/validation",
      "enforcement_mode": "strict"
    }
  ],
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "require_code_owner_reviews": true,
    "dismiss_stale_reviews": false
  },
  "allow_bypass_pull_request_allowance": true
}
```

### **Blocked Actions**
- Direct pushes to main
- Force pushes
- Branch deletion
- Merges without reviews

## 🚀 Workflow Strategy

### **1. Pull Request Validation**
```yaml
# Core checks must pass
- ESLint: Required ✅
- TypeScript: Required ✅
- Unit Tests: Required ✅
- Build: Required ✅

# Optional checks (warnings)
- E2E Tests: Warning ⚠️
```

### **2. Main Branch Protection**
```bash
# Core validations block merge
E2E failures show warnings but allow merge
Admin bypass available for emergencies
```

### **3. Development Workflows**
- **Feature branches**: Standard development workflow
- **Hotfix branches**: Direct main bypass for urgent fixes
- **Documentation updates**: Simplified process

## 📈 Rationale

### **Why Make E2E Optional?**

1. **🏃 Development Velocity**
   - E2E tests can be flaky due to timing issues
   - Allow iteration without blocking on infrastructure
   - Reduce false negatives in CI/CD

2. **🔧 Infrastructure Reliability**
   - E2E tests more sensitive to CI environment
   - Separate concerns: core logic vs user flow
   - Easier to debug failures in isolation

3. **💰 Cost Efficiency**
   - E2E tests consume more CI resources
   - Run on main branch only for production safety
   - Core validations catch most issues earlier

4. **🎯 Quality Focus**
   - Unit tests catch most logic bugs
   - ESLint/TypeScript catch code quality issues
   - E2E reserved for critical user journey validation

## 🚨 Emergency Procedures

### **Critical Bug Fixes**
```bash
# Use hotfix branch (bypasses main protection)
git checkout main
git checkout -b hotfix/critical-security-fix
# ... implement fix ...
git push origin hotfix/critical-security-fix
# Create emergency PR (admin bypass allowed)
```

### **E2E Failure Management**
1. **Review warnings**: Check if user impact is critical
2. **Run locally**: `npm run test:e2e:debug` to investigate
3. **Temporary bypass**: Admin can bypass if needed
4. **Fix in follow-up**: Create separate issue for E2E improvement

## 📊 Success Metrics

### **Quality Gates**
- **Core validation rate**: >95% pass rate
- **E2E test reliability**: >90% consistency
- **Time to merge**: Target <24 hours for PRs
- **Review turnaround**: Target <8 hours for initial review

### **Monitoring**
- **Core validation failures**: Block merge, require fix
- **E2E test failures**: Create issue, but don't block
- **Performance degradation**: Investigate and optimize
- **Recurring failures**: Re-evaluate test reliability

## 🔄 Future Improvements

### **Phase 1: Stabilization**
- Improve E2E test reliability
- Reduce false negatives
- Optimize test execution time
- Add performance metrics

### **Phase 2: Enhancement**
- Add security scanning to core validations
- Implement automated performance testing
- Add accessibility testing to E2E suite
- Enhanced reporting and analytics

### **Phase 3: Optimization**
- Parallel test execution
- Smart test selection based on changes
- Integration with feature flags
- Automated rollback capabilities

## 📝 Conclusion

This strategy provides a balanced approach:
- **High quality** through strict core validations
- **Development velocity** through flexible E2E handling
- **Reliability** through comprehensive testing strategy
- **Scalability** through bypass mechanisms for emergencies

The system maintains code quality while enabling rapid iteration and continuous delivery.