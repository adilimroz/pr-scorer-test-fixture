# pr-scorer-test-fixture

A small React + TypeScript repository designed to test PR risk scoring tools. It includes an intentional dependency graph, routes, API-like modules, tests, and multiple branches representing different risk profiles.

## Stack

- Vite + React + TypeScript
- React Router
- Vitest

## Dependency graph

```
formatPrice.ts → PriceDisplay.tsx → CartItem.tsx → Checkout.tsx → /checkout
auth.ts → AuthGuard.tsx → Checkout.tsx, PaymentForm.tsx
auth.ts → users.ts
payments.ts → PaymentForm.tsx → /payment
```

## Routes

| Path | Component |
|------|-----------|
| `/checkout` | Checkout |
| `/payment` | PaymentForm |

## Scripts

```bash
npm install
npm run dev
npm test
npm run build
```

## Test branches

| Branch | Change | Expected risk |
|--------|--------|---------------|
| `low-risk-doc-change` | README only | LOW |
| `medium-component-change` | PriceDisplay formatting | MEDIUM |
| `high-risk-shared-util-change` | formatPrice behavior | HIGH |
| `high-risk-auth-change` | auth validation loosened | HIGH/CRITICAL |
| `high-risk-payment-change` | payments retry behavior | HIGH |
| `test-only-change` | test files only | LOW |

## GitHub App installation

This repository is public and contains no secrets. Install your GitHub App on this repo to analyze pull requests opened from the test branches above.

## Usage notes

Use this fixture repo to validate PR risk scoring heuristics against known change profiles.
