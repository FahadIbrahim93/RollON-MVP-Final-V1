# Kilo Task: Coverage Improvement Plan
**Project: RollON MVP**
**Task: Get coverage from 71% to 80%+**

## Current Coverage
```
databaseStore.ts:    37.5% - CRITICAL (main gap)
api.ts:            54.32% - HIGH
shop-product-card.tsx: 28.57% - CRITICAL
utils.ts:           66.66% - HIGH
authStore.ts:        68% - MEDIUM
```

## Target
- Lines: 71% → 80%+ (need +9%)
- Functions: 71% → 80%+
- Branches: 66% → 70%+

## Your Tasks

### 1. Analyze databaseStore.ts Coverage Gaps
Look at the untested functions (lines 73-178, 201-203 in databaseStore.ts):
- hashPassword function
- verifyPasswordHash function  
- hexToBytes / bytesToHex
- addUser function
- verifyPassword function

### 2. Recommend Specific Tests
For each uncovered function, recommend:
- What input to test
- What expected output
- Edge cases to cover

### 3. Report Format
```
## Recommended Tests - databaseStore.ts
1. hexToBytes: test "ff" → [255]
2. bytesToHex: roundtrip test
3. verifyPasswordHash: correct password → true
4. verifyPasswordHash: wrong password → false
5. addUser: adds user to store
6. verifyPassword: finds user by email

## Test Code Suggestions
```typescript
// Example test for hexToBytes
it('converts hex string to bytes', () => {
  const result = hexToBytes('ff');
  expect(result[0]).toBe(255);
});
```
```

## Execute now.