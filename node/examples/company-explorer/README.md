# Company Explorer

A small Next.js app: a search bar that looks up any US ticker and renders a company profile, using [`@stockfit/api`](https://www.npmjs.com/package/@stockfit/api).

It demonstrates the **token-safe pattern**: the API token lives only on the server. The browser calls a Next.js route handler ([`app/api/company/route.ts`](app/api/company/route.ts)), and that route uses the SDK to call StockFit. The token is never shipped to the client.

## Run it

```bash
npm install
cp .env.local.example .env.local      # then put your StockFit token in it
npm run dev
```

Open http://localhost:3000 and search a ticker (e.g. `AAPL`).

## How it works

- [`app/api/company/route.ts`](app/api/company/route.ts) — server-only. Configures the SDK with `STOCKFIT_TOKEN` and calls `companyDetails`, returning JSON to the browser.
- [`app/page.tsx`](app/page.tsx) — the client UI. It only ever calls `/api/company`, never StockFit directly, so it has no access to the token.

To extend it, add more route handlers that call other SDK functions (`incomeStatement`, `filings`, `fundHoldings`, …) and render them.
