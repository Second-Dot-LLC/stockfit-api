# StockFit API — Client SDKs

Official client SDKs for the [StockFit API](https://developer.stockfit.io): accurate, audit-grade US financial data sourced directly from SEC EDGAR. Company financials, SEC filings, fund and ETF data, ownership, insider transactions, executives, and earnings.

Each SDK is generated from the StockFit OpenAPI spec, so it stays in sync with the live API and ships fully typed.

## Available SDKs

| Language | Package | Location | Status |
| --- | --- | --- | --- |
| TypeScript / Node.js | [`@stockfit/api`](https://www.npmjs.com/package/@stockfit/api) | [`node/`](node/) | Available |

More languages will be added as sibling folders.

## Node.js / TypeScript

```bash
npm install @stockfit/api
```

Requires Node.js 18+ (uses the built-in `fetch`).

```ts
import {createClient, companyDetails, incomeStatement} from '@stockfit/api';

createClient({token: process.env.STOCKFIT_TOKEN!});

const profile = await companyDetails({query: {symbol: 'AAPL'}});
console.log(profile.data);

const income = await incomeStatement({query: {symbol: 'AAPL', period: 'annual'}});
console.log(income.data);
```

Tree-shakeable: import only the endpoints you use. See [`node/README.md`](node/README.md) for full usage.

## What you can query

Lookup and resolution (ticker, CIK, CUSIP, FIGI), company profiles and peers, income statement / balance sheet / cash flow (as-reported and standardized), key metrics and growth, scores, revenue and business segmentation, SEC filings and filing items, fund and ETF profiles / holdings / flows / overlap / fees, ownership and institutional holders, insider transactions, executives and compensation, earnings history and estimates, and price quotes and history.

## Authentication

Get an API token from your [StockFit developer account](https://developer.stockfit.io). All requests authenticate with a Bearer token, which the SDK attaches for you via `createClient`.

## License

MIT, Copyright Second Dot LLC. See [LICENSE](LICENSE).

The MIT license covers the SDK client code only. Use of the StockFit API itself is governed by the StockFit terms of service and your subscription.
